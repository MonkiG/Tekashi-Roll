import { test, describe, expect, beforeAll } from 'vitest'
import request from 'supertest'
import app from '../src/app'
import '../src/index'
import AuthRoutes from '../src/routes/AuthRoutes'
import { User } from '../src/Models/User.model'

describe('Auth Controllers test', () => {
  beforeAll(async () => {
    await User.deleteMany({ email: 'raan.heam@gmail.com' })
  })

  describe(`POST ${AuthRoutes.Signup}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 201 and an auth token', async () => {
        const response = await request(app)
          .post(`${AuthRoutes.Auth}${AuthRoutes.Signup}`)
          .send({
            name: 'Ramón Hernández',
            phone: '322 146 37 29',
            email: 'raan.heam@gmail.com',
            password: 'somerandompassword'
          })
          .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(201)
        expect(response.body.token).toBeTruthy()
      })
    })

    describe('Wrong responses', () => {
      test('Should respond with status 409', async () => {
        const response = await request(app)
          .post(`${AuthRoutes.Auth}${AuthRoutes.Signup}`)
          .send({
            name: 'Ramón Hernández',
            phone: '322 146 37 29',
            email: 'raan.heam@gmail.com',
            password: 'somerandompassword'
          })
          .set('Content-Type', 'application/json')
        expect(response.statusCode).toBe(409)
      })

      test('Should respond with status 500', async () => {
        const response = await request(app)
          .post(`${AuthRoutes.Auth}${AuthRoutes.Signup}`)
          .send({
            name: 'Ramón Hernández',
            phone: '322 146 37 29',
            email: 'raan.heamgmail.com',
            password: 'somerandompassword'
          })
          .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(500)
      })
    })
  })

  describe(`POST ${AuthRoutes.Login}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 200 and an auth token', async () => {
        const response = await request(app)
          .post(`${AuthRoutes.Auth}${AuthRoutes.Login}`)
          .send({
            email: 'raan.heam@gmail.com',
            password: 'somerandompassword'
          })
          .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(200)
        expect(response.body.token).toBeTruthy()
      })
    })
  })

  describe('Wrong responses', () => {
    test('Should respond with status 404', async () => {
      const response = await request(app)
        .post(`${AuthRoutes.Auth}${AuthRoutes.Login}`)
        .send({
          email: 'some.email@gmail.com',
          password: 'somerandompassword'
        })
        .set('Content-Type', 'application/json')

      expect(response.statusCode).toBe(404)
    })
  })
  test('Should respond with status 401', async () => {
    const response = await request(app)
      .post(`${AuthRoutes.Auth}${AuthRoutes.Login}`)
      .send({
        email: 'raan.heam@gmail.com',
        password: 'somerandompasswordd'
      })
      .set('Content-Type', 'application/json')

    expect(response.statusCode).toBe(401)
    expect(response.body.token).toBeFalsy()
  })
})
