export const isFalsy = (val: unknown): boolean => (val === 0 ? false : !val)

export const cleanObject = (object: { [key: string]: any }) => {
  const result = { ...object }

  Object.keys(result).forEach(key => {
    if (isFalsy(result[key])) {
      delete result[key]
    }
  })

  return result
}
