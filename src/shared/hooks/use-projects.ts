import { IProject } from '../../types/project-types'
import { useHttp } from '../../api/http'
import { cleanObject } from '../utils'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const USE_PROJECTS_BASE_QUERY_KEY = 'projects'
export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp()
  const data = cleanObject(param)
  return useQuery<IProject[], Error>([USE_PROJECTS_BASE_QUERY_KEY, data], () =>
    client('/projects', { data }),
  )
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation<IProject, Error, any>(
    (param?: Partial<IProject>) =>
      client(`/projects/${param?.id}`, { data: param, method: 'PATCH' }),
    {
      onSuccess() {
        queryClient.invalidateQueries(USE_PROJECTS_BASE_QUERY_KEY)
      },
      onMutate() {},
      onError() {},
    },
  )
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation<IProject, Error, any>(
    (params?: Partial<IProject>) =>
      client(`/projects`, {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries(USE_PROJECTS_BASE_QUERY_KEY)
      },
    },
  )
}

const USE_PROJECT_BASE_QUERY_KEY = 'project'
export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<IProject, Error>(
    [USE_PROJECT_BASE_QUERY_KEY, id],
    () => client(`/projects/${id}`),
    { enabled: Boolean(id) },
  )
}
