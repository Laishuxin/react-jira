import { useCallback } from 'react'
import { useCleanSearchParams } from './use-clean-search-params'
import { useProject } from './use-projects'
import { useSetUrlSearchParam, useUrlQueryParam } from './use-query-param'

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

  const open = useCallback(() => {
    setProjectCreate({ projectCreate: true })
  }, [setProjectCreate])

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id })

  const setUrlParams = useSetUrlSearchParam()

  const close = useCallback(() => {
    setUrlParams({ projectCreate: '', editingProjectId: '' })
  }, [setUrlParams])

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
