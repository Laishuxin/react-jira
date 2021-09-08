import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
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
  // TODO(rushui 2021-09-08): 修改 Debounce方式
  // const debounceName = useDebounce(params.name, 100)
  const debounceName = params.name

  return useMemo(
    () => ({
      projectId: Number(projectId) || undefined,
      tagId: Number(params.tagId) || undefined,
      processorId: Number(params.processorId) || undefined,
      typeId: Number(params.typeId) || undefined,
      name: debounceName,
    }),
    [params, projectId, debounceName],
  )
}
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

// 匹配 路由。
// 例如：`/projects/12/epic/`，提取出其中的 epic
//      `/projects/12/epic?`，提取出其中的 epic
//      `/projects/12/epic`，提取出其中的 epic
const pattern = /\d+\/(\w*)/

export const useSelectedKeys = () => {
  const { pathname } = useLocation()
  const selectedKeys = useMemo(() => {
    const result = pathname.match(pattern)
    return result && result[1] ? [result[1]] : []
  }, [pathname])

  return selectedKeys
}
