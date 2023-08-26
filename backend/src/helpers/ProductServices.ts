import { type ObjectId } from 'mongoose'
import { ProductSchema } from '../Models/Product.model'
import { type ProductDto } from '../Models/dto/Product.dto'

export default class ProductServices {
  public static async findAllProducts (): Promise<ProductDto[]> {
    const products = ProductServices.convertToDto(await ProductSchema.find({}).exec())
    return products as ProductDto[]
  }

  public static async findById (id: string | ObjectId): Promise<ProductDto | null> {
    const document = await ProductSchema.findOne({ _id: id }).exec()
    if (document !== undefined && document !== null) {
      const product = ProductServices.convertToDto(document)

      return product as ProductDto
    }

    return document
  }

  public static async findByIdAnddelete (id: string | ObjectId): Promise<boolean> {
    const data = await ProductSchema.findOneAndDelete({ _id: id }).exec()

    return data !== null
  }

  public static async deleteAllProducts (): Promise<void> {
    await ProductSchema.deleteMany({})
  }

  public static convertToDto (products: any): ProductDto[] | ProductDto | null {
    if (products === null) {
      return null
    }

    if (Array.isArray(products)) {
      return products.map((product: any) => (
        {
          _id: product._id,
          name: product.name,
          description: product.description,
          category: product.category,
          subcategory: product.subcategory ?? undefined,
          price: product.price,
          imgUrl: product.imgUrl
        }
      ))
    }

    return (
      {
        _id: products._id,
        name: products.name,
        description: products.description,
        category: products.category,
        subcategory: products.subcategory ?? undefined,
        price: products.price,
        imgUrl: products.imgUrl
      }
    )
  }
}
