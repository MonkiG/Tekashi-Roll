import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orderPrice: Number,
  customer: { type: Schema.Types.ObjectId, ref: 'User' },
  address: { type: Object, default: null },
  deliveryStatus: { type: String, enum: ['preparation', 'inTransit', 'delivered'], default: 'preparation' },
  payment: { type: String, enum: ['card', 'cash'] },
  notes: { type: String, default: null },
  currency: { type: String, enum: ['MXN', 'USD', 'EUR', 'CAD'], default: 'MX' },
  orderDetail: { type: Object }
}, {
  timestamps: true
})

orderSchema.pre('save', function () {
  console.log(this.id)
  /* almacenar direcciones en db */
  this.address = {
    street: 'asd'
  }
  /* relacionar ordenes */
  this.orderDetail = {
    id: this.id
  }
})
export const Order = model('Order', orderSchema)
