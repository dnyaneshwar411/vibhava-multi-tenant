import { useCallback, useEffect, useRef } from "react"

export function useKeyPressCallback(
  targetKey: string,
  callback: (event: KeyboardEvent) => void,
  options?: {
    ctrlKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
    metaKey?: boolean
    preventDefault?: boolean
    stopPropagation?: boolean
    debounce?: number
    throttle?: number
    enabled?: boolean
  }
): void {
  const callbackRef = useRef(callback)
  const lastCallTime = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (options?.enabled === false) return

      if (event.key !== targetKey) return

      const { ctrlKey, shiftKey, altKey, metaKey, preventDefault, stopPropagation, debounce, throttle } = options || {}

      if (ctrlKey !== undefined && event.ctrlKey !== ctrlKey) return
      if (shiftKey !== undefined && event.shiftKey !== shiftKey) return
      if (altKey !== undefined && event.altKey !== altKey) return
      if (metaKey !== undefined && event.metaKey !== metaKey) return

      if (preventDefault) event.preventDefault()
      if (stopPropagation) event.stopPropagation()

      if (throttle) {
        const now = Date.now()
        if (now - lastCallTime.current < throttle) return
        lastCallTime.current = now
      }

      if (debounce) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          callbackRef.current(event)
          timeoutRef.current = null
        }, debounce)
        return
      }

      callbackRef.current(event)
    },
    [targetKey, options]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleKeyDown])
}
