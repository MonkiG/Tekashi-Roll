import { describe, expect, test } from 'vitest'
import Jwt from '../src/helpers/Jwt'

describe('Jwt class test', () => {
  test('Should return a token', () => {
    const token = new Jwt('some.mail@gmail.com').sign()

    expect(token).toBeTruthy()
  })
})
