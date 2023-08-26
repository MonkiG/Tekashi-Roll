import mongoose from 'mongoose'
import config from '../config'

export class Mongoose {
  public static async connect (): Promise<void> {
    const { DATABASE_TEST_NAME, DATABASE_NAME, NODE_ENV } = process.env
    await mongoose.connect(config.DATABASE_URL, {
      dbName: NODE_ENV === 'test' ? DATABASE_TEST_NAME : DATABASE_NAME
    })
  }

  public static async disconnect (): Promise<void> {
    await mongoose.disconnect()
  }
}
