import express, { json } from 'express'
import AuthRoutes from './routes/AuthRoutes'

const app = express()

app.use(json())
app.use(AuthRoutes.Auth, AuthRoutes.router())

app.get('/', (_req, res) => {
  res.json({ message: 'Hello, world!' })
})

export default app
