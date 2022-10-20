import Base from "./Base";
import {IndexType} from "../services/mongodb/models.index.types";
import {ObjectId} from "mongodb";

export interface BrandType {
    _id?: string
    name?: string
    logo?: string
    forCategory?:  string[] | ObjectId[]
    createdAt?: Date | string
    updatedAt?: Date | string
}

class Brand extends Base implements BrandType {
    _id?:  string
    name?: string
    logo?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    forCategory?: string[] | ObjectId[]
    
    static indexes: IndexType = {
        name: {}
    }
    
    static collectionName = "brands"
    
    constructor(data: BrandType) {
        let dateString =  new Date()
        super(Brand.collectionName)
        this.name = data.name
        this.logo =  data.logo
        this.createdAt = dateString
        this.updatedAt = dateString
        this.forCategory = data.forCategory
    }
}

export default Brand
