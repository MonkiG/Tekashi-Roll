import express, { json } from 'express'
import AuthRoutes from './routes/AuthRoutes'
import ProductsRoutes from './routes/ProductsRoutes'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(json())
app.use(AuthRoutes.auth, AuthRoutes.router())
app.use(ProductsRoutes.products, ProductsRoutes.router())

app.get('/', (_req, res) => {
  res.json({ message: 'Hello, world!' })
})

export default app
