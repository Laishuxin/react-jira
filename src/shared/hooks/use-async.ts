import { useCallback, useState } from 'react'
import { useMountedRef } from 'shared/hooks/use-mounted-ref'

interface IState<D> {
  error: null | Error
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

interface IConfig {
  throwError?: boolean
}

const defaultState: IState<null> = {
  error: null,
  data: null,
  stat: 'idle',
}
const defaultConfig: IConfig = {
  throwError: true,
}

export const useAsync = <D>(initialState?: IState<D>, config?: IConfig) => {
  const [state, setState] = useState<IState<D>>({
    ...defaultState,
    ...initialState,
  })
  const { throwError } = {
    ...defaultConfig,
    ...config,
  }
  const [retry, setRetry] = useState<(...args: any[]) => Promise<D>>(
    () => () => Promise.resolve() as any,
  )
  const mountedRef = useMountedRef()

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: 'success',
        error: null,
      }),
    [],
  )

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        stat: 'error',
        data: null,
      }),
    [],
  )

  const run = useCallback(
    (
      promise: Promise<D>,
      config?: { retry: (...args: any[]) => Promise<D> },
    ) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 类型数据')
      }
      setState(state => ({ ...state, stat: 'loading' }))
      if (config) {
        setRetry(() => () => run(config.retry()))
      }
      return promise
        .then(data => {
          if (mountedRef.current) setData(data)
          return data
        })
        .catch(error => {
          if (mountedRef.current) setError(error)
          return throwError ? Promise.reject(error) : error
        })
    },
    [mountedRef, setData, setError, throwError],
  )

  return {
    setData,
    setError,
    run,
    retry,
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    isIdle: state.stat === 'idle',
    ...state,
  }
}
