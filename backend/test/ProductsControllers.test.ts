import { test, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from './../src/app'
import './../src/index'
import ProductsRoutes from '../src/routes/ProductsRoutes'
import { User } from '../src/Models/dto/User.dto'
import path from 'node:path'
import { UserSchema } from '../src/Models/User.model'

describe('Products Controllers tests', () => {
  let userToken: string
  beforeAll(async () => {
    await new User({
      name: 'Ramón',
      email: 'some.email@gmail.com',
      password: 'somerandompassword',
      phone: '123 456 78 90',
      role: 'admin'
    }).saveUser()

    const { token } = await new User({
      email: 'some.email@gmail.com',
      password: 'somerandompassword'
    }).logUser()

    if (token !== null) {
      console.log(token)

      userToken = token
    }
  })

  describe(`POST ${ProductsRoutes.products}`, () => {
    console.log(`${ProductsRoutes.products}`)

    describe('Correct responses', () => {
      test('Should response with status 201', async () => {
        const imagePath = path.join(__dirname, 'testFile.jpg')
        console.log(__dirname)
        console.log(imagePath)

        const response = await request(app)
          .post(`${ProductsRoutes.products}`)
          .attach('image', imagePath)
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'multipart/form-data')
        expect(response.statusCode).toBe(201)
      })
    })
  })

  describe.todo(`GET ${ProductsRoutes.products}`, () => {

  })

  describe.todo(`GET ${ProductsRoutes.products}${ProductsRoutes.getProduct}`, () => {

  })

  describe.todo(`PATCH ${ProductsRoutes.products}${ProductsRoutes.editProduct}`, () => {

  })

  describe.todo(`DELETE ${ProductsRoutes.products}${ProductsRoutes.deleteProduct}`, () => {

  })

  afterAll(async () => {
    await UserSchema.findOneAndDelete({ email: 'some.email@gmail.com' })
  })
})
