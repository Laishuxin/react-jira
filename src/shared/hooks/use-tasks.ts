import { useHttp } from 'api/http'
import { useQuery } from 'react-query'
import { ITask } from 'types/task'

export const useTasks = (param?: Partial<ITask>) => {
  const client = useHttp()
  return useQuery<ITask[]>(['tasks', param], () =>
    client('/tasks', {
      data: param,
    }),
  )
}
