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

export const resetRoute = () => (window.location.href = window.location.origin)
