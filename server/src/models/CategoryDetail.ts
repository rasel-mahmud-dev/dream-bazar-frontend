import Base from "./Base";
import {IndexType} from "../services/mongodb/models.index.types";
import {ObjectId} from "mongodb";

export interface CategoryDetailType {
    _id?: string
    catId: string | ObjectId
    catName: string
    filterAttributes: string[]
    defaultExpand: string[]
    renderProductAttr: string[]
}

class CategoryDetail extends Base implements CategoryDetailType {
    _id?: string
    catId: string | ObjectId
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

/*
 * Example data
 *
let categoryDetail = {
    "_id": "635ebf1d54ef70741f6572d8",
    "catName": "",
    "filterAttributes": [
        "ram",
        "internalStorage",
        "screen_size",
        "generation",
        "customer_rate",
        "cpu_core",
        "clock_speed",
        "os_version",
        "processor_brand",
        "network_type",
        "sim_type",
        "primary_camera",
        "os"
    ],
    "defaultExpand": [],
    "renderProductAttr": [],
    "catId": "60df5e546419f56b97610602",

    // populated field from product attributes collections
    "filterAttributesValues": [
        {
            "_id": "635ec33ee771dd6bc815a9c9",
            "attributeName": "customer_rate",
            "attributeLabel": "Customer Ratings",
            "options": [
                {
                    "name": "4★ & above",
                    "value": "4"
                },
                {
                    "name": "3★ & above",
                    "value": "3"
                },
                {
                    "name": "2★ & above",
                    "value": "2"
                },
                {
                    "name": "1★ & above",
                    "value": "1"
                }
            ]
        },
        {
            "_id": "635ec33ee771dd6bc815a9bc",
            "attributeName": "generation",
            "attributeLabel": "Generation",
            "options": [
                {
                    "name": "1st Generation",
                    "value": 1
                },
                {
                    "name": "2nd Generation",
                    "value": 2
                },
                {
                    "name": "3th Generation",
                    "value": 3
                },
                {
                    "name": "4th Generation",
                    "value": 4
                },
                {
                    "name": "5th Generation",
                    "value": 5
                },
                {
                    "name": "6th Generation",
                    "value": 6
                },
                {
                    "name": "7th Generation",
                    "value": 7
                },
                {
                    "name": "8th Generation",
                    "value": 8
                },
                {
                    "name": "9th Generation",
                    "value": 9
                },
                {
                    "name": "10th Generation",
                    "value": 10
                },
                {
                    "name": "11th Generation",
                    "value": 11
                }
            ]
        },
        {
            "_id": "635ec33ee771dd6bc815a9bb",
            "attributeName": "ram",
            "attributeLabel": "Ram",
            "options": [
                {
                    "name": "1GB",
                    "value": 1
                },
                {
                    "name": "2GB",
                    "value": 2
                },
                {
                    "name": "3GB",
                    "value": 3
                },
                {
                    "name": "4GB",
                    "value": 4
                },
                {
                    "name": "5GB",
                    "value": 5
                },
                {
                    "name": "6GB",
                    "value": 6
                }
            ]
        }
    ]
}
 */