import express, { json } from 'express'
import AuthRoutes from './routes/AuthRoutes'
import ProductsRoutes from './routes/ProductsRoutes'
import CategoriesRoutes from './routes/CategoriesRoutes'
import cors from 'cors'
import SubcategoriesRoutes from './routes/SubcategoriesRoutes'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import SocketConnection from './helpers/Socket'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(cors())
app.use(json())
app.use('/public', express.static('public'))
app.use(AuthRoutes.auth, AuthRoutes.router())
app.use(SubcategoriesRoutes.subcategories, SubcategoriesRoutes.router())
app.use(CategoriesRoutes.categories, CategoriesRoutes.router())
app.use(ProductsRoutes.products, ProductsRoutes.router())

app.get('/', (_req, res) => {
  res.json({ message: 'Hello, world!' })
})

io.on('conneciton', new SocketConnection(io).onConnection)
export default httpServer
