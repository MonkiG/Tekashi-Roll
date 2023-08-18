import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  PORT: process.env.PORT as string
}

export default config
