import { useCallback } from 'react'
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
    isProjectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    isEditingProject: Boolean(editingProjectId),
    isLoading,
    open,
    startEdit,
    close,
    editingProject,
  }
}
