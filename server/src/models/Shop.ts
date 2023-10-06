import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";
import Base from "./Base";


export interface ShopType {
    _id?: ObjectId | string
    sellerId?: ObjectId| string
    shopName: string
    shopEmail: string
    shopAddress: string
    shopLogo: string
    shopBanner?: string
    shopPhone: string
    isActive?: boolean
    isSuspense?: boolean
    featuresProducts?: string[]
    isApproved: boolean
    createdAt?: Date
    updatedAt?: Date
}


class Shop extends Base implements ShopType{
    public _id?: ObjectId | string
    public sellerId?: ObjectId | string
    public shopName: string
    public shopEmail: string
    public shopAddress: string
    public shopLogo: string
    public shopBanner?: string
    public shopPhone: string
    public isActive?: boolean
    public isApproved: boolean
    public isSuspense?: boolean
    public featuresProducts?: string[]
    public createdAt?: Date = new Date()
    public updatedAt?: Date = new Date()
    
    static collectionName = "shops"
    
    static indexes: IndexType = {
        shopName: {
            unique: true,
        },
        sellerId: {
            unique: true,
        }
    }
    
    constructor(data?: ShopType) {
        super(Shop.collectionName)
        if(!data) return
        this.sellerId = data.sellerId
        this.shopName = data.shopName
        this.shopEmail = data.shopEmail
        this.shopPhone = data.shopPhone
        this.shopLogo = data.shopLogo
        this.shopBanner =  data.shopBanner
        this.shopAddress = data.shopAddress
        this.isActive = data.isActive !== undefined ? data.isActive :  false
        this.isSuspense = false
        this.isApproved = data.isApproved !== undefined ? data.isApproved :  false
    }
}

module.exports = Shop
export default Shop
