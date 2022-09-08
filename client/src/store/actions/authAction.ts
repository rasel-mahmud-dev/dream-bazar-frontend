
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




export const loginAction = async (userData, dispatch, cb) => {
  try{
    const response = await apis.post("/api/auth/login", userData)
    if(response.status === 201){
      loginHandler(response.data.user, response.data.token, dispatch)
    } else{
      return cb(false, {message: "unable to connect with server"})
    }
  } catch(ex) {
    console.log(errorMessageCatch(ex))
  }
}


export const registrationAction = async (userData, dispatch, cb) => {

  const { data, status } = await apis.post("/api/auth/registration", userData)
  if(status === 201){
    loginHandler(data.user, data.token, dispatch)
  }
}

export const currentAuthAction = async(dispatch) =>{
  try{
    const { data } = await getApi().get("/api/auth/current-auth")
    console.log(data)
    dispatch({
      type: ACTION_TYPES.LOGIN,
      payload: data
    })
  } catch(ex){
  
  }
  
}

export const logout = () =>{ 
  window.localStorage.removeItem("token")
  return {
    type: ACTION_TYPES.LOGIN,
    payload: null
  }
}
