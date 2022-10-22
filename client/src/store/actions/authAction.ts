
import { ACTION_TYPES } from "store/types"
import apis, {getApi} from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";



export const loginHandler = (user, token, dispatch) => {
  window.localStorage.setItem("token", token)
  dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: user
  })
}


export const loginAction = async (userData, dispatch, cb:(data: object, errorMessage?: string)=>void) => {
  try{
    const response = await apis.post("/api/auth/login", userData)
    if(response.status === 201){
      loginHandler(response.data.user, response.data.token, dispatch)
      cb && cb(response.data.user, "")
    } else{
      cb && cb({}, "unable to connect with server")
    }
  } catch(ex) {
    cb && cb({}, errorMessageCatch(ex))
  }
}


export const registrationAction = async (userData, dispatch, cb:(data: object, errorMessage?: string)=>void) => {

  try{
    const { data, status } = await apis.post("/api/auth/registration", userData)
    if(status === 201){
      loginHandler(data.user, data.token, dispatch)
      cb && cb(data.user, "")
    } else {
      cb && cb({}, "Error")
    }
  } catch (ex){
    cb && cb({}, errorMessageCatch(ex))
  }
  
}

export const currentAuthAction = async(dispatch) =>{
  try{
    const { data } = await getApi().get("/api/auth/current-auth")
    dispatch({
      type: ACTION_TYPES.LOGIN,
      payload: data
    })
  } catch(ex){
      dispatch({
          type: ACTION_TYPES.LOGIN,
          payload: null
      })
  }
  
}

export const logoutAction = () =>{
  window.localStorage.removeItem("token")
  return {
    type: ACTION_TYPES.LOGOUT
  }
}
