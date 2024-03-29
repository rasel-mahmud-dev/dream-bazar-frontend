import {ACTION_TYPES } from "store/types"

export interface ShopType {
    _id?: string
    sellerId: string
    shopName: string
    shopAddress: string
    shopLogo: string
    shopPhone: string
    shopBanner?: string,
    featuresProducts?: string[]
}

export interface SellerStateType {
    shop: ShopType
}


const initialState: SellerStateType = {
    shop: null as unknown as ShopType
}


const sellerReducer = (state: SellerStateType = initialState, action) => {
    let updatedState: SellerStateType = {...state}
    switch (action.type) {
        
        case ACTION_TYPES.FETCH_SELLER_SHOP:
            updatedState.shop = action.payload
            return updatedState
        
        default :
            return updatedState
    }
}

export default sellerReducer
