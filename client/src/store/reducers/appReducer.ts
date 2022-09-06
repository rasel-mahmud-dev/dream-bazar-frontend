import { ACTION_TYPES } from "src/store/types"


import langData from "src/lang/i18n"

export interface CategoryType{
  name: string,
  _id?: string,
  parent_id?: string,
  is_product_level?: boolean
}
export interface UICategoryType{
  name: string,
  id: string,
  _id?: string,
  parent_id?: string,
  sub_menu?: UICategoryType[]
}


interface AppStateType {
  selectedLang?: string,
  notificationMsg?: string,
  lang?: string,
  isNotify?: false,
  notificationType: string,
  // ui_categories: UICategoryType[]
  // ui_filterItems: {name: string, id: string, _id?: string, sub_menu: {}[]}[]
  // ui_category_info: {
  //   _id?: string,
  //   id?: string,
  //   renderProduct_attr?: [],
  //   filter_items?: string[],
  //   filter_items_exclude?: string[],
  //   default_expand: string[]
  // }[]
  isOpenAppMask: boolean
}

let lang = localStorage.getItem("lang") 

const initialState = {
  selectedLang: lang || "en",
  lang: lang === "bn" ? langData.bangla : {},
  isNotify: false,
  notificationType: "",
  notificationMsg: "",
  
  isOpenAppMask: false

}


const appReducer = (state: any=initialState, action)=>{
  
  let updatedState = {
    notificationMsg: undefined,
    selectedLang: undefined,
    lang: undefined,
    isNotify: undefined,
    ...state
  }
  
  switch(action.type){
    
    case ACTION_TYPES.CHOOSE_LANGUAGE : 
      updatedState.selectedLang = action.payload 
      localStorage.setItem("lang", action.payload)
      if(action.payload === "bn"){
        // @ts-ignore
        updatedState.lang = langData.bangla
      }
      return updatedState
      
    case ACTION_TYPES.TOGGLE_NOTIFY :
      updatedState.isNotify = action.payload.isNotify
      updatedState.notificationMsg = action.payload.message 
      updatedState.notificationType = action.payload.notificationType 
  
      return updatedState
    
   
    case "TOGGLE_APP_MASK":
      if(typeof action.payload === "undefined"){
        updatedState.isOpenAppMask = !action.payload
      } else if(typeof action.payload === "boolean") {
        updatedState.isOpenAppMask = action.payload
      }
    
    
      
      return updatedState
      
    default: 
       return state
  }
}

export default appReducer
