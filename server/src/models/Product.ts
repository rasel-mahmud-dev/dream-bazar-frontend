import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";
import Base from "./Base";
import {ApproveStatus} from "../types";


export interface ProductType {
    _id?: ObjectId | string,
    title: string,
    slug: string,
    price: number,
    discount?: number
    attributes?: object,
    coverPhoto: string,
    qty: number,
    sold?: number,
    views?: number,
    brandId?: string | ObjectId
    categoryId?: string | ObjectId
    sellerId?: ObjectId | string
    createdAt?: Date,
    updatedAt?: Date,
    approveStatus: ApproveStatus
    isActive: boolean
    sku: number
    isMall: boolean
    productType: "Digital" | "Physical"
}


class Product extends Base implements ProductType {
    public _id?: ObjectId | string
    public title: string
    public slug: string
    public price: number
    public discount?: number
    public attributes?: object
    public coverPhoto: string
    public qty: number
    public sold?: number
    public views?: number
    public brandId?: string | ObjectId
    public categoryId?: string | ObjectId
    public sellerId?: ObjectId | string
    public createdAt?: Date
    public updatedAt?: Date
    public approveStatus: ApproveStatus
    public isActive: boolean
    public sku: number
    public productType: "Digital" | "Physical"
    public isMall: boolean


    static indexes: IndexType = {
        title: {},
        slug: {unique: true},
        categoryId: {},
        sellerId: {},
        attributes: {},
        discount: {},
        views: {},
        sold: {}
    }
    static collectionName = "products"

    constructor(data?: ProductType) {
        super(Product.collectionName)
        if (!data) return
        this.title = data.title
        this.slug = data.slug
        this.price = data.price
        this.discount = data.discount
        this.attributes = data.attributes
        this.coverPhoto = data.coverPhoto
        this.qty = data.qty
        this.sold = data.sold
        this.views = data.views
        this.brandId = data.brandId
        this.categoryId = data.categoryId
        this.sellerId = data.sellerId
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.approveStatus = data.approveStatus
        this.isActive = data.isActive
        this.sku = data.sku
        this.productType = data.productType
        this.isMall = data.isMall
        this.sellerId = data.sellerId
    }
}

module.exports = Product;
export default Product;





