import mongoose, { isValidObjectId } from 'mongoose'
import config from '../config'
import { ParseErrors } from './Errors'

/* eslint-disable-next-line */

export class Mongoose {
  public static async connect (): Promise<void> {
    const { DATABASE_TEST_NAME, DATABASE_NAME, NODE_ENV } = process.env
    await mongoose.connect(config.DATABASE_URL, {
      dbName: NODE_ENV === 'test' ? DATABASE_TEST_NAME : DATABASE_NAME
    })
  }

  public static isValidObjectIdParser (data: any[] | string): void {
    if (typeof data === 'string') {
      if (!isValidObjectId(data)) throw new ParseErrors('Invalid id, should be ObjectId')
      return
    }

    if (Array.isArray(data)) {
      if (data.length <= 0) return
      data.forEach(id => {
        if (!isValidObjectId(id)) throw new ParseErrors('Invalid id, should be ObjectId')
      })
    }
  }

  public static async disconnect (): Promise<void> {
    await mongoose.disconnect()
  }
}
