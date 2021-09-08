import { useHttp } from 'api/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { IEpic } from 'types/epic'
import { useAddConfig, useDeleteConfig } from './use-config'

export const useEpics = (param?: Partial<IEpic>) => {
  const client = useHttp()
  return useQuery<IEpic[]>(['epics', param], () =>
    client('/epics', {
      data: param,
    }),
  )
}

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<IEpic>) =>
      client(`/epics`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey),
  )
}

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`/epics/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey),
  )
}
