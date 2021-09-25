import { useCallback, useState, useReducer } from 'react'
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const isMountedRef = useMountedRef()
  return useCallback(
    (...args: T[]) => (isMountedRef.current ? dispatch(...args) : void 0),
    [dispatch, isMountedRef],
  )
}

export const useAsync = <D>(initialState?: IState<D>, config?: IConfig) => {
  const { throwError } = {
    ...defaultConfig,
    ...config,
  }

  const [state, dispatch] = useReducer(
    (state: IState<D>, action: Partial<IState<D>>) => ({ ...state, ...action }),
    {
      ...defaultState,
      ...initialState,
    },
  )

  const safeDispatch = useSafeDispatch(dispatch)

  const [retry, setRetry] = useState<(...args: any[]) => Promise<D>>(
    () => () => Promise.resolve() as any,
  )
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null,
      }),
    [safeDispatch],
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: 'error',
        data: null,
      }),
    [safeDispatch],
  )

  const onSuccess = useCallback((cb: (...args: any[]) => any) => {
    cb()
  }, [])
  const onError = useCallback((cb: (...args: any[]) => any) => {}, [])

  const run = useCallback(
    (
      promise: Promise<D>,
      config?: { retry: (...args: any[]) => Promise<D> },
    ) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 类型数据')
      }
      safeDispatch({ stat: 'loading' })
      if (config) {
        setRetry(() => () => run(config.retry()))
      }
      return promise
        .then(data => {
          setData(data)
          return data
        })
        .catch(error => {
          setError(error)
          return throwError ? Promise.reject(error) : error
        })
    },
    [safeDispatch, setData, setError, throwError],
  )

  return {
    setData,
    setError,
    run,
    retry,
    onError,
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    isIdle: state.stat === 'idle',
    ...state,
  }
}
