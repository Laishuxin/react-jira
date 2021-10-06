interface Options<Data, Context> {
  onSuccess?(data: Data): void
  onMutateAsync?(): Context
  onError?(error: Error | null, context: Context | undefined): void
}
export const mutate = <Data, Mutation extends Promise<Data>, Context = any>(
  mutate: Mutation,
  options?: Options<Data, Context>,
) => {
  const { onError, onMutateAsync, onSuccess } = options ?? {}
  const context = onMutateAsync?.()
  return mutate
    .then(data => onSuccess?.(data))
    .catch((e: Error) => {
      onError?.(e, context)
      return Promise.reject(e)
    })
}
