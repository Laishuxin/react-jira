import { useHttp } from 'api/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { IKanban } from 'types/kanban'
import { useAddConfig, useDeleteConfig } from './use-config'

export const useKanbans = (param?: Partial<IKanban>) => {
  const client = useHttp()
  return useQuery<IKanban[]>(['kanbans', param], () =>
    client('/kanbans', {
      data: param,
    }),
  )
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<IKanban>) =>
      client(`/kanbans`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey),
  )
}

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`/kanbans/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey),
  )
}
