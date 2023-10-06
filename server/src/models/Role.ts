import Base from "./Base";
import {IndexType} from "../services/mongodb/models.index.types";

class Role extends Base {
    collectionName = "roles"
    name: string
    description: string
    createdAt?: Date
    updatedAt?: Date
    lastModifiedUser?: string
    permissions: {
        "product": {
            "read": boolean,
            "create": boolean,
            "update": boolean,
            "delete": boolean
        },
        "brand": {
            "read": boolean,
            "create": boolean,
            "update": boolean,
            "delete": boolean
        },
        "category": {
            "read": boolean,
            "create": boolean,
            "update": boolean,
            "delete": boolean
        }
    }

    indexes: IndexType = {
        name: {
            unique: true
        },
    }

    constructor(roleData: Role) {
        super(Role.collectionName);

        this.name = roleData.name
        this.description = roleData.description
        this.createdAt = new Date()
        this.createdAt = new Date()
        this.permissions = {
            product: {
                read: true,
                create: false,
                update: false,
                delete: false
            },
            brand: {
                read: true,
                create: false,
                update: false,
                delete: false
            },
            category: {
                read: true,
                create: false,
                update: false,
                delete: false
            }
        }
    }
}

export default Role
module.exports = Role