import { isVoid, cleanObject, subset } from '../shared/utils'

describe('utils', () => {
  it('isVoid', () => {
    expect(isVoid('')).toBe(true)
    expect(isVoid(null)).toBe(true)
    expect(isVoid(undefined)).toBe(true)
    expect(isVoid(false)).toBe(false)
  })

  it('cleanObject', () => {
    const mock = { a: 1, b: 2, c: true }
    expect(cleanObject()).toEqual({})
    expect(cleanObject({ ...mock, d: undefined, e: null })).toEqual(mock)
    expect(cleanObject({ ...mock, d: { a: undefined } })).toEqual({
      ...mock,
      d: { a: undefined },
    })
  })

  it('subset', () => {
    const mock = { a: 1, b: 2, c: 3 }
    expect(subset(mock, [])).toEqual({})
    expect(subset(mock, ['a'])).toEqual({ a: mock.a })
    expect(subset(mock, ['a', 'b'])).toEqual({ a: mock.a, b: mock.b })
    expect(subset(mock, ['a', 'b', 'c'])).toEqual(mock)
  })
})
