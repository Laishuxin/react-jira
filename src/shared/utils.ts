import dayjs from 'dayjs'
export interface DebounceOptions {
  immediate?: boolean
  wait?: number
}
const DEBOUNCE_DEFAULT_WAIT = 200

export function isDef(v: unknown) {
  return v !== undefined && v !== null
}

export function isUnDef(v: unknown): v is any {
  return v === undefined || v === null
}

export function isVoid(v: unknown) {
  return v === undefined || v === null || v === ''
}

export const navigateOrigin = () =>
  (window.location.href = window.location.origin)

export function debounce<Fn extends (...args: any[]) => any>(
  fn: Fn,
  options: DebounceOptions = {},
) {
  const { immediate = false, wait = DEBOUNCE_DEFAULT_WAIT } = options
  let timer: number | undefined
  const clear = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  const debounceFn = function (...args: Parameters<Fn>) {
    let callNow = timer === undefined
    clear()
    if (immediate) {
      if (callNow) fn(...args)
      // @ts-ignore
      timer = setTimeout(() => (timer = undefined), wait)
    } else {
      // @ts-ignore
      timer = setTimeout(fn, wait, ...args)
    }
  }

  debounceFn.cancel = clear
  return debounceFn
}

export const format = (date: number | Date, template = 'YYYY-MM-DD') => {
  return dayjs(date).format(template)
}

export const clearObject = (obj: object | undefined) => {
  if (isUnDef(obj)) {
    return {}
  }
  const result = Object.assign({}, obj)

  Object.keys(result).forEach(key => {
    if (isVoid(result[key])) {
      delete result[key]
    }
  })
  return result
}
