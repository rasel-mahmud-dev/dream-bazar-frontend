

import { ACTION_TYPES } from "store/types"
import {toggleNotify} from "actions/appAction"

let id;
export const addToCart = (product) => dispatch=> {  
  dispatch(toggleNotify(false, "", ""))
  dispatch({
    type: ACTION_TYPES.ADD_TO_CART,
    payload: product
  })
  if(id){
    clearTimeout(id)
  } 
  dispatch(toggleNotify(true, "add_to_cart", "Product added to cart successfully"))
  // const { data } = await api.get("/api/products") 
  id = setTimeout(()=>{
    dispatch(toggleNotify(false, "", ""))
  }, 3000)
  // console.log(data)
}
