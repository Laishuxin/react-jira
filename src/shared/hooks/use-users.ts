import { IUser } from '../../types/user-types'
import { useAsync } from './use-async'
import { IProject } from '../../types/project-types'
import { useHttp } from '../../api/http'
import { useEffect } from 'react'
import { cleanObject } from '../utils'

export const useUsers = (param?: Partial<IUser>) => {
  const { run, ...result } = useAsync<IUser[]>()
  const client = useHttp()
  useEffect(() => {
    run(client('/users', { data: cleanObject(param) }))
  }, [param])

  return result
}
