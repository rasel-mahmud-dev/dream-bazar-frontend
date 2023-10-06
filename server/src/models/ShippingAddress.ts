import Base from "./Base"

import {IndexType} from "../services/mongodb/models.index.types"
import { ObjectId } from "mongodb"


export type ShippingAddressType = {
    _id?: string
    customerId: string | ObjectId
    firstName: string,
    lastName: string,
    phone: number
    zipCode: number
    city: string
    state: string
    address: string
    apartmentSuit: string
    country?: string
    email: string
    createdAt?: Date
    isDefault: boolean
}

class ShippingAddress extends Base implements ShippingAddressType {
    customerId: string | ObjectId
    address: string
    apartmentSuit: string
    city: string
    country?: string
    firstName: string
    lastName: string
    isDefault: boolean
    phone: number
    zipCode: number
    state: string
    email: string
    createdAt?: Date
    
    static indexes: IndexType = {
        name: {},
        customerId: {}
    }
    
    static collectionName = "shippingAddress"
    
    constructor(data: ShippingAddressType) {
        super(ShippingAddress.collectionName)
        this.address = data.address
        this.apartmentSuit = data.apartmentSuit
        this.city = data.city
        this.country = data.country
        this.createdAt = data.createdAt
        this.customerId = data.customerId
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.isDefault = data.isDefault
        this.phone = data.phone
        this.zipCode = data.zipCode
        this.state = data.state
        this.email = data.email
        
    }
}

module.exports = ShippingAddress
export default ShippingAddress
