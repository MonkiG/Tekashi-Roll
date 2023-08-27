import { Schema, model } from 'mongoose'
import Utils from '../helpers/Utils'

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
})

subcategorySchema.pre('save', function () {
  this.name = Utils.parseBasicData(this.name)
  this.description = this.description !== undefined ? Utils.parseBasicData(this.description) : undefined

  // this.categories = this.categories.map((category: string) => {
  //   return new Types.ObjectId(category)
  // })
})
export const Subcategory = model('Subcategory', subcategorySchema)
