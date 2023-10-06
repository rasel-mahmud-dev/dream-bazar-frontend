import {Request} from "express";


export interface RequestWithAuth extends Request{
    user?: {
        email: string
        _id: string,
        roles: Roles[]
    }
}

export interface TypedRequestBody<T> extends Request {
    body: T
}


export type ObjectFlags<Type> = {
    [Property in keyof Type]: any;
};




export enum Roles {
    CUSTOMER = "CUSTOMER",
    SALES_MANAGER = "SALES_MANAGER",
    PRODUCT_MANAGER = "PRODUCT_MANAGER",
    ORDER_MANAGER = "ORDER_MANAGER",
    FULFILLMENT_AGENT = "FULFILLMENT_AGENT",
    SITE_DESIGNER = "SITE_DESIGNER",
    ADMIN = "ADMIN",
    SELLER = "SELLER"
}

export enum StatusCode {
    Ok = 200,
    Created = 201,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    InternalServerError = 409,
    UnprocessableEntity = 422,
}

export enum Scope {
    SELLER_USER = "SELLER",
    ADMIN_USER = "ADMIN",
    CUSTOMER_USER = "CUSTOMER"
}



export enum ApproveStatus {
    Pending = "pending",
    Rejected = "rejected",
    Accepted = "accepted",
}