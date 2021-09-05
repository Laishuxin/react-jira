import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { cleanObject } from '../utils'

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useMemo(
    () =>
      keys.reduce((prev, curr) => {
        return { ...prev, [curr]: searchParams.get(curr) || '' }
      }, {} as { [key in K]: string }),
    // eslint-disable-next-line
    [searchParams],
  )

  const setParams = (params?: Partial<{ [key in K]: unknown }>) => {
    const o = cleanObject({ ...Object.fromEntries(searchParams), ...params })
    return setSearchParams(o as URLSearchParamsInit)
  }

  return [params, setParams] as const
}
