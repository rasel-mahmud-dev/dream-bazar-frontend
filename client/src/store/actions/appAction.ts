import { ACTION_TYPES } from "../types"


export const toggleNotify=(status, notificationType, message)=>{ 
  return {
    type: ACTION_TYPES.TOGGLE_NOTIFY,
    payload: {message: message, isNotify: status, notificationType}  
  }
}


export const closeNotify=()=>{ 
  return {
    type: ACTION_TYPES.TOGGLE_NOTIFY,
    payload: {message: "", isNotify: false, notificationType: ""}  
  }
}


export const toggleBackdrop=(data: {isOpen: boolean, scope: "app" | "global" | "custom"})=>{
  if(data.isOpen){
    document.body.classList.add("block-page")}
  else{
    document.body.classList.remove("block-page")
  }
  return {
    type: ACTION_TYPES.TOGGLE_BACKDROP,
    payload: data
  }
}

