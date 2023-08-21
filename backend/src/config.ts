import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  PORT: process.env.PORT as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  DATABASE_NAME: process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST_NAME as string : process.env.DATABASE_NAME as string,
  JWT_SECRET: process.env.JWT_SECRET as string
}

export default config
