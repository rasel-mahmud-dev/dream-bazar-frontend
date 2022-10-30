import Base from "./Base";
import {IndexType} from "../services/mongodb/models.index.types";

export interface CategoryDetailType {
    _id?: string
    catId: string
    catName: string
    filterAttributes: string[]
    defaultExpand: string[]
    renderProductAttr: string[]
}

class CategoryDetail extends Base implements CategoryDetailType {
    _id?: string
    catId: string
    catName: string
    filterAttributes: string[]
    defaultExpand: string[]
    renderProductAttr: string[]
    
    static indexes: IndexType = {
        catId: {unique: true}
    }
    
    static collectionName = "category_details"
    
    constructor(data: CategoryDetailType) {
        super(CategoryDetail.collectionName)
        this.catId = data.catId
        this.catName = data.catName
        this.filterAttributes = data.filterAttributes
        this.defaultExpand = data.defaultExpand ?? []
        this.renderProductAttr = data.renderProductAttr ?? []
    }
}


module.exports = CategoryDetail
export default CategoryDetail
