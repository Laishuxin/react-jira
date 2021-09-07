import { useHttp } from 'api/http'
import { useQuery } from 'react-query'
import { ITaskType } from 'types/task-type'

export const useTaskTypes = () => {
  const client = useHttp()
  return useQuery<ITaskType[]>(['taskTypes'], () => client('/taskTypes'))
}
