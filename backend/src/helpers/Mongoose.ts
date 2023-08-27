import mongoose from 'mongoose'
import config from '../config'
import { categorySchema } from '../Models/Category.model'
/* eslint-disable-next-line */

export class Mongoose {
  public static async connect (): Promise<void> {
    const { DATABASE_TEST_NAME, DATABASE_NAME, NODE_ENV } = process.env
    await mongoose.connect(config.DATABASE_URL, {
      dbName: NODE_ENV === 'test' ? DATABASE_TEST_NAME : DATABASE_NAME
    })
    // await new categorySchema({
    //   name: 'test',
    //   description: 'test'
    // }).save()
    mongoose.model('Category', categorySchema)
  }

  public static async disconnect (): Promise<void> {
    await mongoose.disconnect()
  }
}
