import app from './app'
import config from './config'

const server = app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`)
})

export default server
