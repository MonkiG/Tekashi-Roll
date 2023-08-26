import app from './app'
import config from './config'
import { Mongoose } from './helpers/Mongoose'

const server = app.listen(config.PORT, async () => {
  try {
    await Mongoose.connect()
    console.log(`Server started on port ${config.PORT}`)
  } catch (e) {
    console.error('Error connecting database', e)
  }
})

export default server
