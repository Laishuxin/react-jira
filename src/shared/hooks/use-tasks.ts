import { useHttp } from 'api/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { ITask } from 'types/task'
import { useAddConfig } from './use-config'

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
