import { type ObjectId } from 'mongoose'

export type role = 'admin' | 'client'
export interface OrderDetail {
  readonly orderI: string | ObjectId
}
export interface Address {
  street: string
  number: number | string
  neighborhood: string
  city: string
  state: string
  country: string
  postalColde: string | number
}
