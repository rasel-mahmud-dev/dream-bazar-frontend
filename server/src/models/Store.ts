import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";
import Base from "./Base";


// interface StoreType {
//     _id?: ObjectId | string
//     authorId: ObjectId
//     shopName: string
//     shopAddress: string
//     shopLogo: string
//     shopBanner?: string,
//     phone: string
//     isActive: boolean
//     isSuspense?: boolean
//     createdAt?: Date
//     updatedAt?: Date
// }


class Store extends Base{
    public _id?: ObjectId | string
    public authorId: ObjectId
    public shopName: string
    public shopAddress: string
    public shopLogo: string
    public shopBanner?: string
    public phone: string
    public isActive: boolean
    public isSuspense?: boolean
    public createdAt?: Date
    public updatedAt?: Date
    
    static collectionName = "stores"
    
    static indexes: IndexType = {
        shopName: {
            unique: true,
        },
        authorId: {
            unique: true,
        }
    }
    
    constructor(data: Store) {
        super(Store.collectionName)
        this.authorId = data.authorId
        this.shopName = data.shopName
        this.shopLogo = data.shopLogo
        this.shopBanner =  data.shopBanner
        this.shopAddress = data.shopAddress
        this.phone = data.phone
        this.isActive = data.isActive
        this.isSuspense = data.isSuspense
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }
}

module.exports = Store
export default Store
