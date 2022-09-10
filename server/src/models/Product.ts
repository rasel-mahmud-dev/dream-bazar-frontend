
import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";

export interface ProductType{
  _id?: ObjectId,
  title: string,
  price: number,
  discount?: number
  attributes?: object,
  coverPhoto: string,
  images?: string[],
  updatedAt?: Date,
  qty: number,
  sold?: number,
  views?: number,
  brandId?: string
  categoryId?: string
  sellerId?: object | string
  authorId: object | string
  createdAt?: Date,
}


class Product implements ProductType{
  public _id: ObjectId
  public title: string
  public price: number
  public discount: number
  public attributes: object
  public coverPhoto: string
  public images: string[]
  public updatedAt: Date
  public qty: number
  public sold: number
  public views: number
  public brandId: string
  public categoryId: string
  public sellerId: object | string
  public authorId: object | string
  public createdAt: Date

  static indexes: IndexType = {
    title: {},
    categoryId: {},
    sellerId: {},
    attributes: {},
    discount: {},
    views: {},
    sold: {}
  }

  constructor(data: ProductType) {
    this.title = data.title
    this.price = data.price
    this.discount = data.discount
    this.attributes = data.attributes
    this.coverPhoto = data.coverPhoto
    this.images = data.images
    this.qty = data.qty
    this.sold = data.sold
    this.views = data.views
    this.brandId = data.brandId
    this.categoryId = data.categoryId
    this.sellerId = data.sellerId
    this.authorId = data.authorId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}


export default Product






