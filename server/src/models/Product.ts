
import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";
import Base from "./Base";

export interface ProductType{
  _id?: ObjectId | string,
  title: string,
  price: number,
  discount?: number
  attributes?: object,
  coverPhoto: string,
  images?: string[],
  qty: number,
  sold?: number,
  views?: number,
  brandId?: string | ObjectId
  categoryId?: string | ObjectId
  sellerId?: ObjectId | string
  authorId: ObjectId | string
  createdAt?: Date,
  updatedAt?: Date,
  isApproved: boolean
}


class Product extends Base implements ProductType {
    public _id?: ObjectId | string
    public title: string
    public price: number
    public discount?: number
    public attributes?: object
    public coverPhoto: string
    public images?: string[]
    public qty: number
    public sold?: number
    public views?: number
    public brandId?: string | ObjectId
    public categoryId?: string | ObjectId
    public sellerId?: ObjectId | string
    public authorId: ObjectId | string
    public createdAt?: Date
    public updatedAt?: Date
    public isApproved: boolean

  static indexes: IndexType = {
    title: {},
    categoryId: {},
    sellerId: {},
    attributes: {},
    discount: {},
    views: {},
    sold: {}
  }
  static collectionName = "products"
  
  

  constructor(data: ProductType) {
    super(Product.collectionName)
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
    this.isApproved = data.isApproved
  }
}


export default Product






