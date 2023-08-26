import { test, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from './../src/app'
import { Mongoose } from '../src/helpers/Mongoose'
import ProductsRoutes from '../src/routes/ProductsRoutes'
import { User } from '../src/Models/dto/User.dto'
import path from 'node:path'
import { UserSchema } from '../src/Models/User.model'
import Files from '../src/helpers/Files'
import ProductServices from '../src/helpers/ProductServices'
import { Product } from '../src/Models/dto/Product.dto'

describe('Products Controllers tests', () => {
  let userToken: string
  beforeAll(async () => {
    await Mongoose.connect()
    const { token } = await new User({
      name: 'Ramón',
      email: 'some.email@gmail.com',
      password: 'somerandompassword',
      phone: '123 456 78 90',
      role: 'admin'
    }).saveUser()

    // const { token } = await new User({
    //   email: 'some.email@gmail.com',
    //   password: 'somerandompassword'
    // }).logUser()

    if (token !== null) {
      userToken = token
    }
  })

  describe(`POST ${ProductsRoutes.products}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 201', async () => {
        const imagePath = path.join(__dirname, 'testFile.jpg')

        const response = await request(app)
          .post(`${ProductsRoutes.products}`)
          .field('name', 'Test')
          .field('description', 'Some description about the product')
          .field('price', 144)
          .field('category', 'Rolls')
          .field('subcategory', 'Natural')
          .attach('image', imagePath)
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'multipart/form-data')

        expect(response.statusCode).toBe(201)
      })
    })

    describe('Wrong responses', () => {
      test('Should respond with status 400', async () => {
        const response = await request(app)
          .post(`${ProductsRoutes.products}`)
          .field('name', 'Test')
          .field('description', 'Some description about the product')
          .field('price', 144)
          .field('category', 'Rolls')
          .field('subcategory', 'Natural')
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'multipart/form-data')
        expect(response.statusCode).toBe(400)

        const response2 = await request(app)
          .post(`${ProductsRoutes.products}`)

          .field('description', 'Some description about the product')
          .field('price', 144)

          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'multipart/form-data')
        expect(response2.statusCode).toBe(400)
      })
    })
  })

  describe(`GET ${ProductsRoutes.products}`, () => {
    test('Should respond with an array', async () => {
      const response = await request(app)
        .get(`${ProductsRoutes.products}`)
      expect(Array.isArray(response.body)).toBe(true)

      await ProductServices.deleteAllProducts()
      const response2 = await request(app)
        .get(`${ProductsRoutes.products}`)
      expect(Array.isArray(response2.body)).toBe(true)
    })

    test('Should respond with status 200', async () => {
      const response = await request(app)
        .get(`${ProductsRoutes.products}`)
      expect(Array.isArray(response.body)).toBe(true)
    })
  })

  describe(`GET ${ProductsRoutes.products}${ProductsRoutes.getProduct}`, () => {
    test('Should respond with status 200', async () => {
      const productTest = await new Product({
        name: 'Test product',
        description: 'Some product description',
        category: 'Rolls',
        price: 200,
        imgUrl: '/public/products/testFile.jpg'
      }).saveProduct()

      /* eslint-disable-next-line */
      const productId = productTest._id.toString()

      const response = await request(app)
        .get(`${ProductsRoutes.products}/${productId}`)

      expect(response.statusCode).toBe(200)
    })

    test('Should respond with an object', async () => {
      const productTest = await new Product({
        name: 'Test product',
        description: 'Some product description',
        category: 'Rolls',
        price: 200,
        imgUrl: '/public/products/testFile.jpg'
      }).saveProduct()

      /* eslint-disable-next-line */
      const productId = productTest._id.toString()

      const response = await request(app)
        .get(`${ProductsRoutes.products}/${productId}`)

      expect(typeof response.body).toBe('object')
    })

    test('Should respond with status 400', async () => {
      const response = await request(app)
        .get(`${ProductsRoutes.products}/1234`)
      expect(response.statusCode).toBe(400)
    })

    test('should repond with status 404', async () => {
      const response = await request(app)
        .get(`${ProductsRoutes.products}/64e926479bc000c63ae59d05`)
      expect(response.statusCode).toBe(404)
    })
  })

  describe(`PATCH ${ProductsRoutes.products}${ProductsRoutes.editProduct}`, () => {
    describe('Correct responses', () => {
      test('Should respond with status 200', async () => {
        const productTest = await new Product({
          name: 'Test product2',
          description: 'Some product description',
          category: 'Rolls',
          price: 200,
          imgUrl: '/public/products/testFile.jpg'
        }).saveProduct()

        /* eslint-disable-next-line */
      const productId = productTest._id.toString()
        const imagePath = path.join(__dirname, 'testFile2.jpg')
        const response = await request(app)
          .patch(`${ProductsRoutes.products}${ProductsRoutes.editProduct}`)
          .field('id', productId)
          .field('description', 'Some description about the product')
          .field('price', 144)
          .attach('image', imagePath)
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'multipart/form-data')
        expect(response.statusCode).toBe(200)

        const response2 = await request(app)
          .patch(`${ProductsRoutes.products}${ProductsRoutes.editProduct}`)
          .field('id', productId)
          .field('description', 'Some description about the product')
          .field('price', 400)
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'multipart/form-data')
        expect(response2.statusCode).toBe(200)
      })

      test('Should respond with an object', async () => {
        const productTest = await new Product({
          name: 'Test product2',
          description: 'Some product description',
          category: 'Rolls',
          price: 200,
          imgUrl: '/public/products/testFile2.jpg'
        }).saveProduct()

        /* eslint-disable-next-line */
      const productId = productTest._id.toString()
        const imagePath = path.join(__dirname, 'testFile3.jpg')
        const response = await request(app)
          .patch(`${ProductsRoutes.products}${ProductsRoutes.editProduct}`)
          .field('id', productId)
          .field('description', 'Some description about the product')
          .attach('image', imagePath)
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'multipart/form-data')
        expect(typeof response.body).toBe('object')
      })
    })
    describe('Wrong responses', () => {
      test('should respond with status 404', async () => {
        const imagePath = path.join(__dirname, 'testFile3.jpg')
        const response = await request(app)
          .patch(`${ProductsRoutes.products}${ProductsRoutes.editProduct}`)
          .field('id', '6140b9c63e5b073da4aef875')
          .field('description', 'Some description about the product')
          .attach('image', imagePath)
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'multipart/form-data')
        expect(response.statusCode).toBe(404)
      })

      test('Should respond with status 400', async () => {
        const imagePath = path.join(__dirname, 'testFile3.jpg')
        const response = await request(app)
          .patch(`${ProductsRoutes.products}${ProductsRoutes.editProduct}`)
          .field('id', '6140b9c63e5b073da4aef875a')
          .field('description', 'Some description about the product')
          .attach('image', imagePath)
          .set('Authorization', `Bearer ${userToken}`)
          .set('Content-Type', 'multipart/form-data')
        expect(response.statusCode).toBe(400)
      })
    })
  })

  describe(`DELETE ${ProductsRoutes.products}${ProductsRoutes.deleteProduct}`, () => {
    test('Should respond with status 204', async () => {
      const productTest = await new Product({
        name: 'Test product2',
        description: 'Some product description',
        category: 'Rolls',
        price: 200,
        imgUrl: '/public/products/testFile2.jpg'
      }).saveProduct()
      const response = await request(app)
        .delete(`${ProductsRoutes.products}`)
        .send({
          id: productTest._id
        })
        .set('Authorization', `Bearer ${userToken}`)
        .set('Content-Type', 'application/json')

      expect(response.statusCode).toBe(204)
    })

    test('Should respond with status 400', async () => {
      const response = await request(app)
        .delete(`${ProductsRoutes.products}`)
        .send()
        .set('Authorization', `Bearer ${userToken}`)
        .set('Content-Type', 'application/json')
      expect(response.statusCode).toBe(400)

      const response2 = await request(app)
        .delete(`${ProductsRoutes.products}`)
        .send({ id: 'asdfs' })
        .set('Authorization', `Bearer ${userToken}`)
        .set('Content-Type', 'application/json')
      expect(response2.statusCode).toBe(400)
    })
  })

  afterAll(async () => {
    await UserSchema.findOneAndDelete({ email: 'some.email@gmail.com' })
    if (await Files.fileExist('/public/products/testFile3.jpg')) {
      // await Files.deleteFile(Files.joinRoutes(process.cwd(), '/public/products/testFile.jpg'))
      await Files.deleteFile(Files.joinRoutes(process.cwd(), '/public/products/testFile3.jpg'))
    }
    await ProductServices.deleteAllProducts()
    await Mongoose.disconnect()
  })
})
