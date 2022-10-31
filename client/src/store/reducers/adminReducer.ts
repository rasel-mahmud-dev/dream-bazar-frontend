import {ACTION_TYPES, AdminType} from "src/store/types"

export interface AdminStateType {
    admin: AdminType
    categoryDetails: any[]
    productAttributes: any[]
}


const initialState: AdminStateType = {
    admin: null,
    categoryDetails: [],
    productAttributes: []
}


const adminReducer = (state: AdminStateType = initialState, action) => {
    let updatedState: AdminStateType = {...state}
    switch (action.type) {
        
        case ACTION_TYPES.FETCH_CATEGORY_DETAILS:
            updatedState.categoryDetails = action.payload
            return updatedState
        case ACTION_TYPES.REMOVE_CATEGORY_DETAIL:
            updatedState.categoryDetails = [...updatedState.categoryDetails.filter(cd=>cd._id !== action.payload)]
            return updatedState
        
        case ACTION_TYPES.FETCH_PRODUCT_ATTRIBUTES:
            updatedState.productAttributes = action.payload
            return updatedState
        
        case ACTION_TYPES.ADMIN_LOGIN:
            updatedState.admin = action.payload
            return updatedState
        
        default :
            return updatedState
    }
}

export default adminReducer
