import { useHttp } from 'api/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { ITask } from 'types/task'
import { useAddConfig, useEditConfig } from './use-config'

export const useTasks = (param?: Partial<ITask>) => {
  const client = useHttp()
  return useQuery<ITask[]>(['tasks', param], () =>
    client('/tasks', {
      data: param,
    }),
  )
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params?: Partial<ITask>) =>
      client(`/tasks`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey),
  )
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  const editConfig = useEditConfig(queryKey)

  return useMutation(
    (param: Partial<ITask>) =>
      client(`/tasks/${param?.id}`, { data: param, method: 'PATCH' }),
    editConfig,
  )
}

export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<ITask, Error>(['task', id], () => client(`/tasks/${id}`), {
    enabled: Boolean(id),
  })
}
