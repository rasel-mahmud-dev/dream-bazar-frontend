import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";
import Base from "./Base";


interface ShopType {
    _id?: ObjectId | string
    sellerId: ObjectId
    shopName: string
    shopAddress: string
    shopLogo: string
    shopBanner?: string
}


class Shop extends Base implements ShopType{
    _id?: ObjectId | string
    sellerId: ObjectId
    shopName: string
    shopAddress: string
    shopLogo: string
    shopBanner?: string
    
    static collectionName = "shops"
    
    static indexes: IndexType = {
        shopName: {
            unique: true,
        }
    }
    
    
    constructor(data: ShopType) {
        super(Shop.collectionName)
        this.sellerId = data.sellerId
        this.shopName = data.shopName
        this.shopAddress = data.shopAddress
        this.shopLogo = data.shopLogo
        this.shopBanner =  data.shopBanner
    }
}

export default Shop
