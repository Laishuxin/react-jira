import { useHttp } from 'api/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { IKanban } from 'types/kanban'
import { useAddConfig } from './use-config'

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
