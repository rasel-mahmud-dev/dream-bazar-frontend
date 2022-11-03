import {ACTION_TYPES, AdminType, AuthType} from "src/store/types"


export interface StoreType {
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


interface AuthStateType {
  authChecked: boolean,
  auth: AuthType | null
}

const initialState: AuthStateType = {
  authChecked: false,
  auth: null
}


const authReducer = (state=initialState, action)=>{
  let updatedState = {...state}
  
  switch(action.type){
    case ACTION_TYPES.LOGIN:
        updatedState.auth = action.payload
        updatedState.authChecked = true
      return updatedState
      
      
    case ACTION_TYPES.RESET_AUTH_LOADING:
        updatedState.authChecked = false
      return updatedState
      
    default: 
       return state
  }
}

export default authReducer