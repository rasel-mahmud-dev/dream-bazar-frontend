import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";
import Base from "./Base";


interface ReviewType {
    _id?: ObjectId
    productId: ObjectId
    customerId: ObjectId
    rate: number
    title: string
    description?: string
    customer_uploads?: string[]
    createdAt?: Date
    updatedAt?: Date
}


class Review extends Base implements ReviewType{
    public _id?: ObjectId
    public productId: ObjectId
    public customerId: ObjectId
    public rate: number
    public title: string
    public description?: string
    public customer_uploads?: string[]
    public createdAt?: Date
    public updatedAt?: Date
    
    static collectionName = "reviews"
    
    static indexes: IndexType = {
        productId: {},
        customerId: {},
        rate: {},
    }
    
    constructor(data: ReviewType) {
        super(Review.collectionName)
        this.productId = data.productId
        this.customerId = data.customerId
        this.rate = data.rate
        this.title = data.title
        this.description = data.description
        this.customer_uploads = data.customer_uploads
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}

module.exports = Review
export default Review
