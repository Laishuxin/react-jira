import { ROUTER_PREFIX } from 'config'

// TODO(rushui 2021-08-21): add test
export const isVoid = (val: unknown): boolean =>
  val === null || val === undefined || val === ''

export const cleanObject = (object?: { [key in string]: any }) => {
  if (!object) return {}
  const result = { ...object }

  Object.keys(result).forEach(key => {
    if (isVoid(result[key])) {
      delete result[key]
    }
  })

  return result
}

export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O,
>(
  obj: O,
  keys: K[],
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K),
  )
  return Object.fromEntries(filteredEntries) as Pick<O, K>
}

export const resetRoute = () =>
  (window.location.href = window.location.origin + ROUTER_PREFIX)

type Option = {
  wait?: number
  immediate?: boolean
}
const defaultOption: Option = {
  wait: 1000,
  immediate: false,
}
export const debounce = <Fn extends (...args: any[]) => any>(
  fn: Fn,
  option?: Option,
) => {
  const { wait, immediate } = {
    ...defaultOption,
    ...option,
  } as Required<Option>

  let time: any = undefined

  return function (...args: Parameters<Fn>): ReturnType<Fn> | undefined {
    let result: ReturnType<Fn> | undefined
    const callNow = Boolean(time)
    if (time) {
      clearTimeout(time)
      time = null
    }

    if (immediate) {
      // @ts-ignore
      if (callNow) result = fn.apply(this, args)
      time = setTimeout(() => {
        time = null
      }, wait)
    } else {
      time = setTimeout(() => {
        // @ts-ignore
        result = fn.apply(this, args)
      }, wait)
    }
    return result
  }
}
