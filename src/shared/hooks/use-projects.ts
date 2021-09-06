import { IProject } from '../../types/project-types'
import { useAsync } from './use-async'
import { useCallback, useEffect } from 'react'
import { useHttp } from '../../api/http'
import { cleanObject } from '../utils'

export const useProjects = (param?: Partial<IProject>) => {
  const { run, ...result } = useAsync<IProject[]>()
  const client = useHttp()

  // todo: param ? fix
  const fetchProjects = useCallback(
    () => client('/projects', { data: cleanObject(param) }),
    [client, param],
  )

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects })
  }, [fetchProjects, run])

  return result
}

export const useEditProject = () => {
  const { run, ...rest } = useAsync()
  const client = useHttp()
  const mutate = (params?: Partial<IProject>) => {
    return run(
      client(`/projects/${params?.id}`, {
        data: params,
        method: 'PATCH',
      }),
    )
  }
  return {
    mutate,
    ...rest,
  }
}
export const useAddProject = () => {
  const { run, ...rest } = useAsync()
  const client = useHttp()
  const mutate = (params?: Partial<IProject>) => {
    return run(
      client(`/projects/${params?.id}`, {
        data: params,
        method: 'POST',
      }),
    )
  }
  return {
    mutate,
    ...rest,
  }
}
