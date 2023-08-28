import { Schema, model } from 'mongoose'
import Utils from '../helpers/Utils'
import { Mongoose } from '../helpers/Mongoose'

export const categorySchema = new Schema({
  name: { type: String, required: true },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
  description: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
})

categorySchema.pre('save', function (next) {
  Utils.parseBasicData(this.name)
  Utils.parseBasicData(this.description)

  Mongoose.isValidObjectIdParser(this.subcategories)
  Mongoose.isValidObjectIdParser(this.products)
  next()
})
export const Category = model('Category', categorySchema)
