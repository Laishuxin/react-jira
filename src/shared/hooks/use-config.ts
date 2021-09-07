// 生成乐观更新的 config

import { QueryKey, useQueryClient } from 'react-query'
import { IProject } from 'types/project-types'
type Callback = (target: any, old: any[]) => any
export const useConfig = (queryKey: QueryKey, callback: Callback) => {
  const queryClient = useQueryClient()

  return {
    onSuccess() {
      queryClient.invalidateQueries(queryKey)
    },
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: any[] = []) =>
        callback(target, old),
      )

      return { previousItems }
    },
    onError(error: any, variables: any, context: any) {
      queryClient.setQueryData(
        queryKey,
        (context as { previousItems: any[] }).previousItems,
      )
    },
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target: IProject, old: IProject[]) => {
    return old.filter(item => item.id !== target.id)
  })

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target: IProject, old: IProject[]) => {
    return old.map(item =>
      item.id === target.id ? { ...item, ...target } : item,
    )
  })

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target: IProject, old: IProject[]) => [...old, target])
