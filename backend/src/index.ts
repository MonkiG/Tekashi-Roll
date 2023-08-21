import app from './app'
import config from './config'
import mongoose from 'mongoose'

const { DATABASE_TEST_NAME, DATABASE_NAME, NODE_ENV } = process.env

mongoose.connect(config.DATABASE_URL, {
  dbName: NODE_ENV === 'test' ? DATABASE_TEST_NAME : DATABASE_NAME
}).then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`)
  })
}).catch(e => {
  console.error('Error connecting database', e)
})
