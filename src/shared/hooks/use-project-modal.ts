import { useCallback } from 'react'
import { useCleanSearchParams } from './use-clean-search-params'
import { useUrlQueryParam } from './use-query-param'

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate',
  ])
  const cleanSearchParams = useCleanSearchParams()

  const open = useCallback(() => {
    setProjectCreate({ projectCreate: true })
  }, [setProjectCreate])
  const close = useCallback(() => {
    // todo: 寻找更优雅的解决方案。
    cleanSearchParams()
  }, [cleanSearchParams])

  return {
    open,
    close,
    isProjectModalOpen: projectCreate === 'true',
  }
}
