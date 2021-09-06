import { IProject } from '../../types/project-types'
import { useAsync } from './use-async'
import { useEffect } from 'react'
import { useHttp } from '../../api/http'
import { cleanObject } from '../utils'

export const useProjects = (param?: Partial<IProject>) => {
  const { run, ...result } = useAsync<IProject[]>()
  const client = useHttp()

  useEffect(() => {
    run(client('/projects', { data: cleanObject(param) }))
  }, [param])

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
