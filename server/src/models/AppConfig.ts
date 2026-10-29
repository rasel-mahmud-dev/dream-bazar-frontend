import Base from "./Base";
import {IndexType} from "../services/mongodb/models.index.types";

export interface AppConfigType {
    _id?: string
    key: string
    label?: string
    description?: string
    isActive?: boolean
    data: any
    createdAt?: Date | string
    updatedAt?: Date | string
}

class AppConfig extends Base implements AppConfigType {
    _id?: string
    key: string
    label?: string
    description?: string
    isActive?: boolean = true
    data: any
    createdAt?: Date | string = new Date()
    updatedAt?: Date | string = new Date()

    static indexes: IndexType = {
        key: {
            unique: true
        }
    }
    static collectionName = "app_configs"

    constructor(doc: AppConfigType) {
        super(AppConfig.collectionName)
        this._id = doc._id
        this.key = doc.key
        this.label = doc.label
        this.description = doc.description
        this.isActive = doc.isActive ?? true
        this.data = doc.data
        this.createdAt = doc.createdAt ?? new Date()
        this.updatedAt = doc.updatedAt ?? new Date()
    }
}

module.exports = AppConfig
export default AppConfig
