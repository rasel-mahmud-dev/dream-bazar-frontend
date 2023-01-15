export enum ACTION_TYPES {
    FETCH_FILTER_PRODUCTS = "fetch_filter_products",
    SET_FILTER_PAGINATION = "SET_FILTER_PAGINATION",
    FETCH_PRODUCTS_APPEND = "FETCH_PRODUCTS_APPEND",
    ONE_TYPE_PRODUCTS_FETCH = "ONE_TYPE_PRODUCTS_FETCH",
    COUNT_TOTAL_FILTERABLE_PRODUCT = "COUNT_TOTAL_FILTERABLE_PRODUCT",
    ONE_TYPE_PRODUCTS_LENGTH = "ONE_TYPE_PRODUCTS_LENGTH",
    FETCH_PRODUCT = "fetch_product",
    CLEAR_PRODUCT_DETAIL = "CLEAR_PRODUCT_DETAIL",
    FETCH_HOMEPAGE_SECTION_PRODUCTS = "FETCH_HOMEPAGE_SECTION_PRODUCTS",
    LOADER_CIRCLE = "LOADER_CIRCLE",
    CHANGE_PAGINATION = "CHANGE_PAGINATION",
    UNLOCK_FETCHED_DATA = "UNLOCK_FETCHED_DATA",
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
    INCREASE_CART_ITEM = "INCREASE_CART_ITEM",
    DECREASE_CART_ITEM = "DECREASE_CART_ITEM",
    FETCH_ADMIN_PRODUCTS = "FETCH_ADMIN_PRODUCTS",
    FETCH_ADMIN_CATEGORIES = "FETCH_ADMIN_CATEGORIES",
    FETCH_ADMIN_BRANDS = "FETCH_ADMIN_BRANDS",
    FETCH_STATIC_FILES = "FETCH_STATIC_FILES",
    UPDATE_PRODUCT = "UPDATE_PRODUCT",
    ADD_NESTED_CATEGORY_CACHE = "ADD_NESTED_CATEGORY_CACHE",
    FETCH_FLAT_CATEGORIES = "FETCH_FLAT_CATEGORIES",
    CHANGE_CATEGORY = "CHANGE_CATEGORY",
    FETCH_CATEGORY_BRANDS = "FETCH_CATEGORY_BRANDS",
    FETCH_CATEGORY_DETAILS = "FETCH_CATEGORY_DETAILS",
    REMOVE_CATEGORY_DETAIL = "REMOVE_CATEGORY_DETAIL",
    FETCH_PRODUCT_ATTRIBUTES = "FETCH_PRODUCT_ATTRIBUTES",
    RESET_AUTH_LOADING = "RESET_AUTH_LOADING",
    UPDATE_BRAND_CACHE = "UPDATE_BRAND_CACHE",
    TOGGLE_ATTRIBUTE_SECTION = "TOGGLE_ATTRIBUTE_SECTION",
    CHANGE_ATTRIBUTE_VALUES = "CHANGE_ATTRIBUTE_VALUES",
    FETCH_FILTER_ATTRIBUTES = "FETCH_FILTER_ATTRIBUTES",
    FETCH_PRODUCT_SHOP_INFO = "FETCH_PRODUCT_SHOP_INFO",


    SELECT_FILTER_BRAND = "SELECT_FILTER_BRAND",
    CLEAR_FILTER_BRAND = "CLEAR_FILTER_BRAND",
    FETCH_STORES = "FETCH_STORES",


    LOGIN = "LOGIN",

    FETCH_CURRENT_AUTH = "FETCH_CURRENT_AUTH",
    LOGOUT = "LOGOUT",
    
    CHOOSE_LANGUAGE = "CHOOSE_LANGUAGE",
    TOGGLE_LEFT_BAR = "TOGGLE_LEFT_BAR",
    TOGGLE_NOTIFY = "TOGGLE_NOTIFY",
    ADD_FILTER = "ADD_FILTER",
    SET_filtered_Attributes = "SET_filtered_Attributes",
    SET_currentCategorySelected = "SET_currentCategorySelected",
    
    SET_UI_CATEGORIES = "SET_UI_CATEGORIES",
    SET_UI_CATEGORY_INFO = "SET_UI_CATEGORY_INFO",
    
    SET_BRAND_FOR_CATEGORY = "SET_BRAND_FOR_CATEGORY",
    
    SET_UI_FILTER_ITEM = "SET_UI_FILTER_ITEM",
    
    FETCH_CATEGORIES = "FETCH_CATEGORIES",
    
    SET_SELECT_CATEGORY = "SET_SELECT_CATEGORY",
    
    FETCH_BRANDS = "FETCH_BRANDS",
    UPDATE_SHOP_INFO = "UPDATE_SHOP_INFO",

    SET_THEME = "SET_THEME",
    SET_LANGUAGE = "SET_LANGUAGE",
    SET_WINDOW_WIDTH = "SET_WINDOW_WIDTH",
    SET_DEVICE_TYPE = "SET_DEVICE_TYPE",
    TOGGLE_BACKDROP = "TOGGLE_BACKDROP",
    
    ADD_FLAT_CATEGORY = "ADD_FLAT_CATEGORY",
    UPDATE_FLAT_CATEGORY = "UPDATE_FLAT_CATEGORY",
    DELETE_FLAT_CATEGORY = "DELETE_FLAT_CATEGORY",
    
    DELETE_BRAND = "DELETE_BRAND",
    FETCH_ORDERS = "FETCH_ORDERS",

    FETCH_SELLER_SHOP = "FETCH_SELLER_SHOP",
}

export enum Roles {
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER",
    SALES_MANAGER = "SALES_MANAGER",
    ORDER_MANAGER = "ORDER_MANAGER",
    FULFILLMENT_AGENT = "FULFILLMENT_AGENT",
    SITE_DESIGNER = "SITE_DESIGNER",
    ADMIN = "ADMIN"
}

export enum Scope {
    SELLER_USER = "SELLER",
    ADMIN_USER = "ADMIN",
    CUSTOMER_USER = "CUSTOMER"
}


export interface CategoryType {
    name: string,
    _id: string,
    parentId: string,
    isProductLevel?: boolean
    sub?: CategoryType[],
    expand?: boolean
    active?: boolean
    
    // other field
    last?: boolean
}


export interface Brand {
    _id: string,
    name: string,
    logo?: string
    forCategory?: string[]
}

export interface OrderType {
    _id: string,
    name: string,
    logo?: string
    forCategory?: string[]
}


export interface AuthType {
    _id?: string
    avatar?: string
    email: string
    firstName: string
    lastName?: string
    roles?: Roles[]
    createdAt?: Date
    updatedAt: Date
    username?: string
}

export interface AdminType {
    _id?: string
    avatar?: string
    email: string
    firstName: string
    lastName?: string
    roles?: Roles[]
    createdAt?: Date
    updatedAt: Date
    username?: string
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
