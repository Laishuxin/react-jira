import { useCallback } from 'react'
import { isVoid } from 'shared/utils'
import { useSetUrlSearchParam, useUrlQueryParam } from './use-query-param'
import { useTask } from './use-tasks'

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    'editingTaskId',
  ])
  const {
    data: editingTask,
    isLoading,
    isError,
    error,
  } = useTask(Number(editingTaskId))
  const setUrlParams = useSetUrlSearchParam()

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id })
    },
    [setEditingTaskId],
  )

  const close = useCallback(() => {
    setUrlParams({ editingTaskId: undefined })
  }, [setUrlParams])

  return {
    isTasksModalOpen: !isVoid(editingTaskId),
    close,
    startEdit,
    editingTask,
    editingTaskId,
    isLoading,
    isError,
    error,
  }
}
