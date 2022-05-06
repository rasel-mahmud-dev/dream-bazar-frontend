
import { ACTION_TYPES } from "store/types"
import apis from "src/apis";


export const loginHandler = (data, dispatch, cb) => {
  window.localStorage.setItem("token", data.token)
  cb && cb(data.user, false)
  dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: data.user
  })
}

export const login = (userData, cb) => async(dispatch, getState, api) => { 

  try{
    const response = await api.post("/api/auth/login", userData)  
    if(response.data){
      loginHandler(response.data, dispatch, cb)
    } else{
      return cb(false, {message: "unable to connect with server"})
    }
  } catch(ex){ 
    if(ex.response.data){
      if(ex.response.data){
        cb(false, {...ex.response.data})
      }
    } else{
      cb(false, {})
    }
  }
}

export const registration = (userData) => async(dispatch, getState, api) => { 

  const { data } = await api.post("/api/auth/registration", userData) 
  
  // dispatch({
  //   type: ACTION_TYPES.ADD_TO_CART,
  //   payload: product
  // })
  
  
  console.log(data)
}

export const currentAuth = async(cb) =>{ 


  const { data } = await apis.post("/api/auth/current-auth")
//  window.localStorage.setItem("token", data.token)
  cb(data.user)
  console.log(data)

}
export const logout = () =>{ 
  window.localStorage.setItem("token", "")
  return {
    type: ACTION_TYPES.LOGIN,
    payload: {_id: null}
  }
}
