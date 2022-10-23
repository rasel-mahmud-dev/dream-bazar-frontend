import {ObjectId} from "mongodb";
import {IndexType} from "../services/mongodb/models.index.types";
import Base from "./Base";

interface SellerType {
    _id?: ObjectId
    userId?: ObjectId
}


class Seller extends Base implements SellerType{
    public _id?: ObjectId
    public userId?: ObjectId
    
    static collectionName = "sellers"
    
    static indexes: IndexType = {
        userId: {
            unique: true,
        }
    }
    
    
    constructor(data: SellerType) {
        super(Seller.collectionName)
        this.userId = data.userId
    }
}

export default Seller
