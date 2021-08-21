// TODO(rushui 2021-08-21): add test
export const isFalsy = (val: unknown): boolean => (val === 0 ? false : !val)
export const isVoid = (val: unknown): boolean =>
  val === null || val === undefined || val === ''

export const cleanObject = (object: { [key: string]: any }) => {
  const result = { ...object }

  Object.keys(result).forEach(key => {
    if (isVoid(result[key])) {
      delete result[key]
    }
  })

  return result
}
