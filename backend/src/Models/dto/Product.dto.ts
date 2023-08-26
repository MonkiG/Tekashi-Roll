import type { ObjectId } from 'mongoose'
import Utils from '../../helpers/Utils'
import { ProductSchema } from '../Product.model'
import ProductServices from '../../helpers/ProductServices'
export interface ProductDto {
  _id: ObjectId
  name: string
  description: string
  category: string
  subcategory?: string
  price: string | number
  imgUrl: string
}

export class Product {
  name: string
  description: string
  category: string
  subcategory?: string
  price: string | number
  imgUrl: string
  constructor (product: any) {
    this.name = product.name
    this.description = product.description
    this.category = product.category
    this.price = product.price
    this.subcategory = product.subcategory
    this.imgUrl = product.imgUrl
  }

  public async saveProduct (): Promise<ProductDto> {
    Utils.parseBasicData(this.name)
    Utils.parseBasicData(this.description)
    Utils.parseBasicData(this.category)
    if (this.subcategory !== undefined) Utils.parseBasicData(this.subcategory)
    if (!Utils.isNumber(this.price)) Utils.parseBasicData(this.price)

    const product = ProductServices.convertToDto(await new ProductSchema(this).save())

    return product as ProductDto
  }
}
