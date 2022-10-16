import BaseSQLite from "./BaseSQLite";

export interface CategoryType {
    id?: number | string
    name?: string
    parentId?: string
    isProductLevel?: number
    ideals?: string | []
    logo?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    forCategory?: string[] | string
    
}

class Category extends BaseSQLite implements CategoryType {
    id?: number | string
    name?: string
    parentId?: string
    isProductLevel?: number
    ideals?: string | []
    logo?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    forCategory?: string[] | string
    
    static tableName = "categories"
    
    
    constructor(data: CategoryType) {
        let dateString =  new Date().toISOString();
        super(Category.tableName)
        this.id = data.id ?? ""
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
