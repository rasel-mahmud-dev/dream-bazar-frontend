import BaseSQLite from "./BaseSQLite";

export interface CategoryJsonType {
    rootId: string
    arr: string
}

class CategoryJson extends BaseSQLite implements CategoryJsonType {
    rootId: string
    arr: string
    
    static tableName = "categories_cache"
    
    
    constructor(data: CategoryJsonType) {
        super(CategoryJson.tableName)
        this.rootId = data.rootId
        this.arr = data.arr ?? ""
    }
}

export default CategoryJson
