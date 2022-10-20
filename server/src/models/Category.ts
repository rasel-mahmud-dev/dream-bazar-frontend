import Base from "./Base";
import {IndexType} from "../services/mongodb/models.index.types";

export interface CategoryType {
    _id?: string
    name?: string
    parentId?: string
    isProductLevel?: boolean
    ideals?: string | []
    logo?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    forCategory?: string[] | string
}

class Category extends Base implements CategoryType {
    _id?: string
    name?: string
    parentId?: string
    isProductLevel?: boolean
    ideals?: string | []
    logo?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    forCategory?: string[] | string
    
    static indexes: IndexType = {
        name: {},
        isProductLevel: {}
    }
    static collectionName = "categories"
    
    
    constructor(data: CategoryType) {
        let dateString =  new Date();
        super(Category.collectionName)
        this.parentId = data.parentId ?? ""
        this.name = data.name
        this.logo =  data.logo
        this.isProductLevel =  data.isProductLevel
        this.ideals =  data.ideals
        this.createdAt = dateString
        this.updatedAt = dateString
    }
}


export default Category
