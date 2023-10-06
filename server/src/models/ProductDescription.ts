import Base from "./Base";
import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";

export interface ProductDescriptionType {
    _id?: string | ObjectId,
    productId?: string | ObjectId
    summary?: string
    videoLink?: string
    specification?: {}
    highlight?: string[],
    sellerRules?: string[],
    shippingCost?: number
    tax?: number
    minOrder?: number
    images?: string[]
}


class ProductDescription extends Base implements ProductDescriptionType {
    
    _id?: string | ObjectId
    productId?: string | ObjectId
    summary?: string
    videoLink?: string
    specification?: {}
    highlight?: string[]
    sellerRules?: string[]
    shippingCost?: number
    tax?: number
    minOrder?: number
    images?: string[]
    
    static collectionName = "product_descriptions"
    
    static indexes: IndexType = {
        productId: {}
    }
    constructor(data?: ProductDescriptionType) {
        super(ProductDescription.collectionName)
        if(!data) return
        this.productId = data.productId
        this.summary = data.summary
        this.specification = data.specification
        this.highlight = data.highlight
        this.sellerRules = data.sellerRules
        this.shippingCost = data.shippingCost
        this.tax = data.tax
        this.videoLink = data.videoLink
        this.minOrder = data.minOrder
        this.images = data.images
    }
}

export default ProductDescription
module.exports = ProductDescription