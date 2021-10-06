import { useHttp } from 'api/http'
import { useAsync } from 'hooks/use-async'
import { useEffect } from 'react'
import { clearObject } from 'shared/utils'
import { User } from 'typings/user'

export const useUserList = (params?: Partial<User>) => {
  const http = useHttp()
  const { run, ...restData } = useAsync<User[]>()
  useEffect(() => {
    run(http<User[]>('/users', { data: clearObject(params) }))
  }, [http, params, run])
  return {
    ...restData,
  }
}
