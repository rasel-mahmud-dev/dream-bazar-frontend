import {ObjectId} from "mongodb";
import {collections} from "../services/mongodb/database.service";
import {IndexType} from "../services/mongodb/models.index.types";


interface UserType {
    _id?: ObjectId
    username: string
    firstName: string
    lastName?: string
    email: string,
    password?: string
    createdAt?: Date
    updatedAt?: Date
    roles: Roles[]
    avatar?: string
}

export enum Roles {
    CUSTOMER = "CUSTOMER",
    SALES_MANAGER = "SALES_MANAGER",
    PRODUCT_MANAGER = "PRODUCT_MANAGER",
    ORDER_MANAGER = "ORDER_MANAGER",
    FULFILLMENT_AGENT = "FULFILLMENT_AGENT",
    SITE_DESIGNER = "SITE_DESIGNER",
    ADMIN = "ADMIN"
}

class User implements UserType{
    public _id: ObjectId
    public username: string
    public firstName: string
    public lastName:  string
    public email: string
    public password: string
    public createdAt: Date
    public updatedAt: Date
    public avatar: string
    public roles: Roles[]

    static indexes: IndexType = {
        email: {
            unique: true,
        },
        username: {
            unique: true,
        }
    }

    constructor(data: UserType) {
        this.username = data.username
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.email = data.email
        this.password = data.password
        this.avatar = ""
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.roles = data.roles;

    }
}

export default User
