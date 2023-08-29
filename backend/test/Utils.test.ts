import { describe, expect, test } from 'vitest'
import Utils from '../src/helpers/Utils'

describe('isEmail function test', () => {
  test('Should return true', () => {
    const emailExample = 'usuario123@example.com'
    expect(Utils.isEmail(emailExample)).toBe(true)
  })

  test('Should return false', () => {
    const wrongEmailExample = 'correo.invalido'
    expect(Utils.isEmail(wrongEmailExample)).toBe(false)
  })
})

describe('parsePassword function test', () => {
  test('Should return a string', () => {
    const passwordExample = 'some1234'
    expect(typeof Utils.parsePassword(passwordExample)).toBe('string')
  })

  test('Should to be truthy', () => {
    const passwordExample = 'some1234'
    const passwordExample2 = 'someabc1'
    expect(Utils.parsePassword(passwordExample)).toBeTruthy()
    expect(Utils.parsePassword(passwordExample)).toBe(passwordExample)
    expect(Utils.parsePassword(passwordExample2)).toBeTruthy()
  })

  test('Should throw error', () => {
    const passwordExample = 'som1234'
    const passwordExample2 = '1234'
    const passwordExample3 = 'someabcd'

    expect(() => Utils.parsePassword(passwordExample)).toThrow('Invalid password format')
    expect(() => Utils.parsePassword(passwordExample2)).toThrow('Invalid password format')
    expect(() => Utils.parsePassword(passwordExample3)).toThrow('Invalid password format')
  })
})
