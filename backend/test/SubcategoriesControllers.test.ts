import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../src/app'
import { Mongoose } from '../src/helpers/Mongoose'
import { User } from '../src/Models/dto/User.dto'
import SubcategoriesRoutes from '../src/routes/SubcategoriesRoutes'
import { Subcategory } from '../src/Models/Subcategory.model'
import { UserSchema } from '../src/Models/User.model'

describe('Subcategories Controllers tests', () => {
  let userToken: string
  beforeAll(async () => {
    await Mongoose.connect()
    const { token } = await new User({
      name: 'Ramón Hernández',
      phone: '322 146 37 29',
      email: 'raan.heam@gmail.com',
      password: 'somerandompassword1',
      role: 'admin'
    }).saveUser()
    /* eslint-disable-next-line */
    userToken = token!
  })

  afterAll(async () => {
    await Subcategory.deleteMany({ name: 'Natural' })
    await UserSchema.deleteMany({ email: 'raan.heam@gmail.com' })
    await Mongoose.disconnect()
  })

  describe(`POST ${SubcategoriesRoutes.subcategories}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 201', async () => {
        const response = await request(app)
          .post(SubcategoriesRoutes.subcategories)
          .send({
            name: 'Natural',
            categories: ['64ea2a2702b6dd2159d84746']
          })
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'application/json')
        expect(response.statusCode).toBe(201)
      })

      test('Should respond with an object', async () => {
        const response = await request(app)
          .post(SubcategoriesRoutes.subcategories)
          .send({
            name: 'Natural',
            categories: ['64ea2a2702b6dd2159d84746']
          })
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'application/json')

        expect(typeof response.body).toBe('object')
      })
    })
    describe('Wrong responses', () => {
      test('Should respond with status 500', async () => {
        const response = await request(app)
          .post(SubcategoriesRoutes.subcategories)
          .send({
            categories: ['64ea2a2702b6dd2159d84746']
          })
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'application/json')
        expect(response.statusCode).toBe(500)
      })
    })
  })

  describe(`GET ${SubcategoriesRoutes.subcategories}`, () => {
    describe('Correct responses', () => {
      test('Should respond with a status 200', async () => {
        const response = await request(app)
          .get(SubcategoriesRoutes.subcategories)

        expect(response.statusCode).toBe(200)
      })

      test('should respond with an array', async () => {
        const response = await request(app)
          .get(SubcategoriesRoutes.subcategories)
        expect(Array.isArray(response.body)).toBe(true)
      })
    })
  })

  describe(`GET ${SubcategoriesRoutes.subcategories}${SubcategoriesRoutes.getSubcategory}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 200', async () => {
        const response = await request(app)
          .get(`${SubcategoriesRoutes.subcategories}/64eaac010bebe0262f599fff`)

        expect(response.statusCode).toBe(200)
      })
    })

    describe('Wrong responses', () => {
      test('Should return with status 404', async () => {
        const response = await request(app)
          .get(`${SubcategoriesRoutes.subcategories}/61280d4c091543001f8956a5`)

        expect(response.statusCode).toBe(404)
      })
    })
  })

  describe(`PATCH ${SubcategoriesRoutes.subcategories}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 200', async () => {
        const response = await request(app)
          .patch(SubcategoriesRoutes.subcategories)
          .send({
            id: '64eaac010bebe0262f599fff',
            name: 'Empanizado',
            categories: []
          })
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(200)
      })

      test('Should respond with an object', async () => {
        const response = await request(app)
          .patch(SubcategoriesRoutes.subcategories)
          .send({
            id: '64eaac010bebe0262f599fff',
            name: 'Mixto',
            categories: ['64ea2a2702b6dd2159d84746']
          })
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'application/json')
        expect(typeof response.body).toBe('object')
      })
    })

    describe('Wrong responses', () => {
      test('Should respond with status 404', async () => {
        const response = await request(app)
          .patch(SubcategoriesRoutes.subcategories)
          .send({
            id: '61280d4c091543001f8956a5',
            name: 'Empanizado',
            categories: ['64ea2a2702b6dd2159d84746']
          })
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(404)
      })
    })
  })

  describe(`DELETE ${SubcategoriesRoutes.subcategories}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 204', async () => {
        const testSubcategory = await new Subcategory({
          name: 'Empanizado',
          categories: ['64ea2a2702b6dd2159d84746']
        }).save()

        const testSubcategoryId = testSubcategory._id.toString()

        const response = await request(app)
          .delete(SubcategoriesRoutes.subcategories)
          .send({
            id: testSubcategoryId
          })
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(204)
      })
    })

    describe('Wrong responses', () => {
      test('Should respond with status 404', async () => {
        const response = await request(app)
          .delete(SubcategoriesRoutes.subcategories)
          .send({
            id: '61280d4c091543001f8956a5'
          })
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(404)
      })

      test('Should respond with status 400', async () => {
        const response = await request(app)
          .delete(SubcategoriesRoutes.subcategories)
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(400)
      })
    })
  })
})
