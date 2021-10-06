import { MD5 as hash } from 'object-hash'
import { debounce, DebounceOptions as Options } from 'shared/utils'
export type DebounceOptions = Options

const debounceFns = new Map<string, Function>()
export function useDebounce<Fn extends (...args: any[]) => any>(
  fn: Fn,
  options: DebounceOptions = {},
) {
  const key = hash(fn)
  let result = debounceFns.get(key)
  if (result === undefined) {
    result = debounce(fn, options)
    debounceFns.set(key, result)
  }
  return result
}
