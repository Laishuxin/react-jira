import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useProject } from 'shared/hooks/use-projects'
import { useUrlQueryParam } from 'shared/hooks/use-query-param'
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })
export const useKanbanQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
  const [params] = useUrlQueryParam(['name', 'processorId', 'typeId', 'tagId'])
  const projectId = useProjectIdInUrl()

  return useMemo(
    () => ({
      projectId: Number(projectId) || undefined,
      tagId: Number(params.tagId) || undefined,
      processorId: Number(params.processorId) || undefined,
      typeId: Number(params.typeId) || undefined,
      name: params.name,
    }),
    [params, projectId],
  )
}
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
