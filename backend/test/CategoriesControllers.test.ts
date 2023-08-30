import { test, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../src/app'
import { Mongoose } from '../src/helpers/Mongoose'
import CategoriesRoutes from '../src/routes/CategoriesRoutes'
import { User } from '../src/Models/dto/User.dto'
import { UserSchema } from '../src/Models/User.model'
import { Category } from '../src/Models/Category.model'
// import { Product } from '../src/Models/dto/Product.dto'
// import ProductServices from '../src/helpers/ProductServices'

describe('Categories controllers tests', () => {
  let userToken: string
  beforeAll(async () => {
    await Mongoose.connect()
    // await ProductServices.deleteAllProducts()
    const { token } = await new User({
      name: 'Ramón Hernández',
      phone: '322 146 37 29',
      email: 'raan.heam@gmail.com',
      password: 'somerandompassword1',
      role: 'admin'
    }).saveUser()

    userToken = token

    //     await new Product({
    //       name: 'California Roll',
    //       description: 'Por dentro: Philadelphia, pepino y camarón.Por fuera: Natural',
    //       category: '64ea2a2702b6dd2159d84746',
    //       subcategory: '64eaac010bebe0262f599fff',
    //       price: 90,
    //       imgUrl: '/public/products/CaliforniaRoll.jpg'
    //     }).saveProduct()
  })

  afterAll(async () => {
    await UserSchema.deleteMany({ email: 'raan.heam@gmail.com' })
    await Category.deleteMany({ name: 'Yakimeshi' })
    await Mongoose.disconnect()
  })

  describe(`POST ${CategoriesRoutes.categories}`, () => {
    describe('Correct responess', () => {
      test('Should respond with status 201', async () => {
        const response = await request(app)
          .post(CategoriesRoutes.categories)
          .send({
            name: 'Yakimeshi',
            description: 'Some category description',
            subcategories: ['64eaac010bebe0262f599fff'],
            products: ['64ebef307c78b930ec7e61cf']
          })
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${userToken}`)

        expect(response.statusCode).toBe(201)
      })

      describe('Wrong responses', () => {
        test('Should respond with status 400', async () => {
          const response = await request(app)
            .post(CategoriesRoutes.categories)
            .send({
              name: 'Yakimeshi',
              description: 'Some category description',
              subcategories: ['64eaac010bebe0262g599fff'],
              products: ['64ebef307c78b930ec7e6acf']
            })

          expect(response.statusCode).toBe(400)
        })
      })
    })
  })

  describe(`GET ${CategoriesRoutes.categories}`, () => {
    describe('Correct responses', () => {
      test('Should repond with status 200', async () => {
        const response = await request(app)
          .get(CategoriesRoutes.categories)

        expect(response.statusCode).toBe(200)
      })

      test('Should respond with an array', async () => {
        const response = await request(app)
          .get(CategoriesRoutes.categories)

        expect(Array.isArray(response.body)).toBe(true)
      })
    })
  })

  describe(`GET ${CategoriesRoutes.categories}${CategoriesRoutes.getCategory}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 200', async () => {
        const response = await request(app)
          .get(`${CategoriesRoutes.categories}/64ebfa379b809be0d10ac29e`)

        expect(response.statusCode).toBe(200)
      })

      test('Should respond with an object', async () => {
        const response = await request(app)
          .get(`${CategoriesRoutes.categories}/64ebfa379b809be0d10ac29e`)

        expect(typeof response.body).toBe('object')
      })
    })

    describe('Wrong responses', () => {
      test('Should respond with status 404', async () => {
        const response = await request(app)
          .get(`${CategoriesRoutes.categories}/613db3a4e4b0bb001f8e02af`)
        expect(response.statusCode).toBe(404)
      })

      test('Should respond with status 400', async () => {
        const response = await request(app)
          .get(`${CategoriesRoutes.categories}/613db3a44b0bb001f8e02af`)
        expect(response.statusCode).toBe(400)
      })
    })
  })

  describe(`PATCH ${CategoriesRoutes.categories}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 200', async () => {
        const response = await request(app)
          .patch(CategoriesRoutes.categories)
          .send({
            id: '64ebfa379b809be0d10ac29e',
            products: [],
            subcategories: []
          })
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${userToken}`)

        expect(response.statusCode).toBe(200)
      })

      test('Should respond with an object', async () => {
        const response = await request(app)
          .patch(CategoriesRoutes.categories)
          .send({
            id: '64ebfa379b809be0d10ac29e',
            products: [],
            subcategories: []
          })
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${userToken}`)

        expect(typeof response.body).toBe('object')
      })
    })

    describe('Wrong responses', () => {
      test('Should respond with status 404', async () => {
        const response = await request(app)
          .patch(CategoriesRoutes.categories)
          .send({
            id: '613db3a4e4b0bb001f8e02af',
            products: [],
            subcategories: []
          })
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${userToken}`)

        expect(response.statusCode).toBe(404)
      })

      test('Should respond with status 400', async () => {
        const response = await request(app)
          .patch(CategoriesRoutes.categories)
          .send({
            id: '613db34e4b0bb001f8e02af',
            products: [],
            subcategories: []
          })
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${userToken}`)

        expect(response.statusCode).toBe(400)
      })
    })
  })

  describe(`DELETE ${CategoriesRoutes.categories}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 204', async () => {
        const { _id: id } = await new Category({
          name: 'Aguas',
          description: 'Some category description',
          subcategories: ['64eaac010bebe0262f599fff'],
          products: ['64ebef307c78b930ec7e61cf']
        }).save()
        const response = await request(app)
          .delete(CategoriesRoutes.categories)
          .send({
            id
          })
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${userToken}`)

        expect(response.statusCode).toBe(204)
      })
    })

    describe('Wrong responses', () => {
      test('Should respond with status 404', async () => {
        const response = await request(app)
          .delete(CategoriesRoutes.categories)
          .send({
            id: '613db3a4e4b0bb001f8e02af'
          })
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${userToken}`)

        expect(response.statusCode).toBe(404)
      })
    })
  })
})
