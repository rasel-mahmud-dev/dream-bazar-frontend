import {ACTION_TYPES, AdminType} from "src/store/types"


export interface Attributes {
    _id: string
    attributeLabel: string
    attributeName: string
    options: any[]
}




export interface AdminStateType {
    categoryDetails: any[]
    productAttributes: Attributes[]
}


const initialState: AdminStateType = {
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
        
        
        default :
            return updatedState
    }
}

export default adminReducer
