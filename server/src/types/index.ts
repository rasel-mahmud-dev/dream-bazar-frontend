import {Request} from "express";
import { IncomingMessage, ServerResponse} from "http";



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


declare type Send<T> = (body: T) => void;

export declare type ApiResponse<T = any> = ServerResponse & {
    /**
     * Send data `any` data in response
     */
    send: Send<T>;
    /**
     * Send data `json` data in response
     */
    json: Send<T>;
    status: (statusCode: number) => ApiResponse<T>;
    redirect(url: string): ApiResponse<T>;
    redirect(status: number, url: string): ApiResponse<T>;
}



// export interface ApiRequest <T = any>  extends Request{
//     /**
//      * Object of `query` values from url
//      */
//     query: {
//         [key: string]: string | string[];
//     };
//     params: {
//         [key: string]: string | string[];
//     };
//
//     /**
//      * Object of `cookies` from header
//      */
//     cookies: {
//         [key: string]: string;
//     };
//     body: T
// }

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
    SELLER_DASHBOARD = "SELLER_DASHBOARD",
    ADMIN_DASHBOARD = "ADMIN_DASHBOARD",
    USER = "USER"
}
