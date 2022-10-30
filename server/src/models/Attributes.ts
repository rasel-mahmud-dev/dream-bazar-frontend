import Base from "./Base";
import {IndexType} from "../services/mongodb/models.index.types";

export interface AttributesType {
    _id?: string
    attributeName: string
    attributeLabel: string
    isMultiple?: boolean
    options: {name: string, value: any}[]
}

class Attributes extends Base implements AttributesType {
    _id?: string
    attributeName: string
    attributeLabel: string
    isMultiple?: boolean
    options: {name: string, value: any}[]
    
    static indexes: IndexType = {
        attributeName: {unique: true}
    }
    
    static collectionName = "product_attributes"
    
    constructor(data: AttributesType) {
        super(Attributes.collectionName)
        this.attributeName = data.attributeName
        this.attributeLabel = data.attributeLabel
        this.isMultiple = data.isMultiple
        this.options = data.options ?? []
    }
}


module.exports = Attributes
export default Attributes
