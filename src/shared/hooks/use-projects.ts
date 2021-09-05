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
