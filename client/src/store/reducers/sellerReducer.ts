import {ACTION_TYPES } from "src/store/types"


export interface SellerType {
    _id?:  string
    firstName: string
    lastName?: string
    email: string
    phone: string
    password?: string
    avatar?: string
    isActive?: boolean
    isSuspense?: boolean
    createdAt?: Date
    updatedAt?: Date
}


export interface ShopType {
    _id?: string
    sellerId: string
    shopName: string
    shopAddress: string
    shopLogo: string
    shopBanner?: string
}



export interface SellerStateType {
    shop: ShopType,
    seller: SellerType
}


const initialState: SellerStateType = {
    shop: null,
    seller: null
}


const sellerReducer = (state: SellerStateType = initialState, action) => {
    let updatedState: SellerStateType = {...state}
    switch (action.type) {
        
        case ACTION_TYPES.FETCH_SELLER_SHOP:
            updatedState.shop = action.payload
            return updatedState
        
        case ACTION_TYPES.SELLER_LOGIN:
            updatedState.seller  = action.payload;
            return updatedState
        
        default :
            return updatedState
    }
}

export default sellerReducer
