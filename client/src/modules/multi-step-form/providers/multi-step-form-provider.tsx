import { useContext } from 'react'
import { MultiStepFormContext } from '../components';

// const MultiStepFormContext = createContext<MultiStepFormContextProps | null>(null);

export function useMultiStepForm() {
  const context = useContext(MultiStepFormContext)
  if (!context) {
    throw new Error(
      'useMultiStepForm must be used within MultiStepForm.Provider'
    )
  }
  return context
}
