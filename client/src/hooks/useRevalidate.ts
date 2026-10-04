"use client";
import { useCallback } from "react";
import { useSWRConfig } from "swr";

type RevalidateOptions = {
  focus?: string[];
  instant?: string[];
  groupedFocus?: string[];
  groupedInstant?: string[];
}

export default function useRevalidate({
  focus = [],
  instant = [],
  groupedFocus = [],
  groupedInstant = [],
}: RevalidateOptions) {
  const { mutate, cache } = useSWRConfig();

  const update = useCallback(function () {
    for (const key of focus) {
      cache.delete(key);
    }

    for (const key of instant) {
      mutate(key);
    }

    for (const searchKey of groupedFocus) {
      for (const cacheKey of cache.keys()) {
        if (cacheKey.startsWith(searchKey)) {
          cache.delete(cacheKey);
        }
      }
    }

    for (const searchKey of groupedInstant) {
      for (const cacheKey of cache.keys()) {
        if (cacheKey.startsWith(searchKey)) {
          mutate(cacheKey);
        }
      }
    }
  }, [focus, instant, groupedFocus, groupedInstant, mutate, cache]);

  return { update }
}