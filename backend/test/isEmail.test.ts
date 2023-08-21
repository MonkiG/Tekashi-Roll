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
