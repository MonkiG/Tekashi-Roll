import { Schema, model } from 'mongoose'
import { type Product } from './dto/Product.dto'

/* Change category and subcategory to Object id schema */

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Schema.Types.Mixed, required: true },
  description: { type: String, default: 'No description supplied' },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory' },
  imgUrl: { type: String, required: true }
}, {
  timestamps: true
})

export const ProductSchema = model('Product', productSchema)
