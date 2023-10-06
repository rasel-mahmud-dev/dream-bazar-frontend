
import {IndexType} from "../services/mongodb/models.index.types";
import {ObjectId} from "mongodb";
import Base from "./Base";


export interface OrderType {
    _id?: string
    productId?: string
    customerId: string
    shipperId: string
    shippingId: string
    orderStatus: string
    description: string
    orderId: number,
    name: string
    products?: any[]
    price: number
    quantity: number
    deliveryDate: Date
    createdAt?: string
    transactionId: string,
    paymentType: PaymentType
}

export enum PaymentType {
    Bkash = "Bkash",
    Nagod = "Nagod",
    COD = "COD",
    Card = "card"
}

export enum OrderStatusType {
    pending = "processing",
    delivered = "delivered",
}


class Order extends Base implements OrderType {

    productId?: string
    customerId: string
    shipperId: string
    shippingId: string
    orderStatus: string
    description: string
    orderId: number
    name: string
    products?: any[]
    price: number
    quantity: number
    deliveryDate: Date
    createdAt?: string
    transactionId: string
    paymentType: PaymentType

    static indexes: IndexType = {
        name: {},
        customerId: {}
    }

    static collectionName = "orders"

    constructor(data: OrderType) {
        super(Order.collectionName)
    }
}

module.exports = Order
export default Order
