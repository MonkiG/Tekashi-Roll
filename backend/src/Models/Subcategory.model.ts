import { Schema, model } from 'mongoose'
import Utils from '../helpers/Utils'
import { Mongoose } from '../helpers/Mongoose'

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
})

subcategorySchema.pre('save', function (next) {
  this.name = Utils.parseBasicData(this.name)
  this.description = this.description !== undefined ? Utils.parseBasicData(this.description) : undefined

  Mongoose.isValidObjectIdParser(this.categories)
  Mongoose.isValidObjectIdParser(this.products)

  next()
})
export const Subcategory = model('Subcategory', subcategorySchema)
