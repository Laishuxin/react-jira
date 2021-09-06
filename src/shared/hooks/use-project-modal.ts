import { useCallback } from 'react'
import { useCleanSearchParams } from './use-clean-search-params'
import { useProject } from './use-projects'
import { useUrlQueryParam } from './use-query-param'

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate',
  ])

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId',
  ])

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId),
  )

  const cleanSearchParams = useCleanSearchParams()

  const open = useCallback(() => {
    setProjectCreate({ projectCreate: true })
  }, [setProjectCreate])

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id })

  const close = useCallback(() => {
    // todo: 寻找更优雅的解决方案。
    cleanSearchParams()
  }, [cleanSearchParams])

  return {
    // two ways to open modal: open and startEdit
    open,
    startEdit,
    close,
    editingProject,
    isProjectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    isEditingProject: Boolean(editingProjectId),
    isLoading,
  }
}
