import { useCallback, useState } from 'react'

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
    (promise: Promise<D>) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 类型数据')
      }
      setState(state => ({ ...state, stat: 'loading' }))
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
    [setData],
  )

  return {
    setData,
    setError,
    run,
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    isIdle: state.stat === 'idle',
    ...state,
  }
}
