import { Schema } from 'mongoose'

export const categorySchema = new Schema({
  name: { type: String, required: true },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
  description: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
})

// export const CategorySchema = model('Category', categorySchema)
