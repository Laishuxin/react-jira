import { useEffect, useState } from 'react'
import { IFunction } from 'types'

export const useMount = <T extends IFunction = () => void>(callback: T) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export const useUnmount = <T extends IFunction = () => void>(callback: T) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback, [])
}
