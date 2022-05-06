import { ACTION_TYPES } from "src/store/types"


interface AuthStateType {
  
}

const initialState = {
  _id: null,
  username: "",
  email: ""
}


const authReducer = (state: AuthStateType=initialState, action)=>{
  let updatedState = {...state}
  
  switch(action.type){
    case ACTION_TYPES.LOGIN : 
      if(action.payload){
        return action.payload
      }
      return state
      
    case ACTION_TYPES.REGISTRATION: 
      return updatedState
    
    case ACTION_TYPES.FETCH_CURRENT_AUTH: 
      return updatedState
    
    case ACTION_TYPES.LOGOUT:
      return updatedState
      
    default: 
       return state
  }
}

export default authReducer