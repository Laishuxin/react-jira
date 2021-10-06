import { useHttp } from 'api/http'
import { useAsync } from 'hooks/use-async'
import { useCallback, useEffect, useMemo } from 'react'
import { clearObject, isVoid } from 'shared/utils'
import { Project } from 'typings/project'
import { useSearchParams } from 'react-router-dom'
import { stringify } from 'qs'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectProjectList,
  selectProjectPartialList,
  setList,
  setPartialList,
  updateList,
  updatePartialList,
} from 'store/slice/project-list'

export const useProjectList = (params?: Partial<Project>) => {
  const http = useHttp()
  const dispatch = useDispatch()
  const {
    run,
    setData: _setData,
    setError: _setError,
    ...restData
  } = useAsync<Project[]>()
  // @ts-ignore
  params = stringify(clearObject(params))
  const setter = isVoid(params) ? setList : setPartialList
  useEffect(() => {
    run(http<Project[]>(`/projects?${params}`)).then(data => {
      dispatch(setter(data))
    })
  }, [dispatch, http, params, run, setter])
  const setData = (data: Project[]) => {
    _setData(data)
    dispatch(setter(data))
  }
  const setError = (e: Error) => {
    _setError(e)
    dispatch(setter([]))
  }
  const updateData = (payload: Partial<Project>) => {
    if (payload.id === undefined) {
      return
    }
    dispatch(updateList(payload))
    dispatch(updatePartialList(payload))
  }

  return {
    ...restData,
    data: useSelector(
      isVoid(params) ? selectProjectList : selectProjectPartialList,
    ),
    setData,
    setError,
    updateData,
  }
}

export type ProjectSearchParams = Partial<Project>

// TODO(rushui 2021-10-05): 逻辑抽离？
export const useProjectParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params: ProjectSearchParams = useMemo(
    () =>
      clearObject({
        name: searchParams.get('name'),
        personId: searchParams.get('personId'),
      }),
    [searchParams],
  )

  const setParams = (params: ProjectSearchParams) => {
    Object.keys(params).forEach(key => {
      const value = (params as any)[key]
      if (isVoid(value)) {
        searchParams.delete(key)
      } else {
        searchParams.set(key, value)
      }
    })
    setSearchParams(searchParams)
  }
  return [params, setParams] as const
}

export const useEditProject = () => {
  const http = useHttp()
  return useCallback(
    (params: Partial<Project> = {}) =>
      http<Project>(`/projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    [http],
  )
}
