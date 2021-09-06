import { IUser } from '../../types/user-types'
import { useHttp } from '../../api/http'
import { cleanObject } from '../utils'
import { useQuery } from 'react-query'

const USE_USERS_BASE_QUERY_KEY = 'users'
export const useUsers = (param?: Partial<IUser>) => {
  const client = useHttp()

  return useQuery<IUser[]>([USE_USERS_BASE_QUERY_KEY, param], () =>
    client('/users', { data: cleanObject(param) }),
  )
}
