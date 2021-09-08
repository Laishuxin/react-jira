import { IProject } from '../../types/project'
import { useHttp } from '../../api/http'
import { cleanObject } from '../utils'
import { QueryKey, useMutation, useQuery } from 'react-query'
import {
  useAddConfig,
  useEditConfig,
  useDeleteConfig,
} from 'shared/hooks/use-config'

const USE_PROJECTS_BASE_QUERY_KEY = 'projects'
export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp()
  const data = cleanObject(param)
  return useQuery<IProject[], Error>([USE_PROJECTS_BASE_QUERY_KEY, data], () =>
    client('/projects', { data }),
  )
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  const editConfig = useEditConfig(queryKey)

  return useMutation(
    (param: Partial<IProject>) =>
      client(`/projects/${param?.id}`, { data: param, method: 'PATCH' }),
    editConfig,
  )
}

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  const addConfig = useAddConfig(queryKey)
  return useMutation(
    (params?: Partial<IProject>) =>
      client(`/projects`, {
        data: params,
        method: 'POST',
      }),
    addConfig,
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  const deleteConfig = useDeleteConfig(queryKey)
  return useMutation(
    ({ id }: { id: number }) =>
      client(`/projects/${id}`, {
        method: 'DELETE',
      }),
    deleteConfig,
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<IProject, Error>(
    ['project', id],
    () => client(`/projects/${id}`),
    { enabled: Boolean(id) },
  )
}
