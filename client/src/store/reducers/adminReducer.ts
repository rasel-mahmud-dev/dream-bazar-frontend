import {ACTION_TYPES, AdminType} from "src/store/types"

export interface AdminStateType {
    admin: AdminType
}


const initialState: AdminStateType = {
    admin: null
}


const adminReducer = (state: AdminStateType = initialState, action) => {
    let updatedState: AdminStateType = {...state}
    switch (action.type) {
        
        case ACTION_TYPES.FETCH_SELLER_SHOP:
            return updatedState
        
        case ACTION_TYPES.ADMIN_LOGIN:
            updatedState.admin = action.payload
            return updatedState
        
        default :
            return updatedState
    }
}

export default adminReducer
