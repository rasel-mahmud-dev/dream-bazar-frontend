import { ACTION_TYPES } from "src/store/types"

import {toggleNotify} from "actions/appAction"

interface CartStateType {
  cartProducts: {
    _id: string,
    title: string,
    quantity: number,
    unitPrice: number,
    image: string
  }[]
}

const initialState = {
  cartProducts: [
    {
      _id: "34",
      title: "Samsung j2",
      quantity: 2,
      unitPrice: 20,
      image: "images/products_images/c20-rmx3063-realme-original-imagfxfzjrkqtbhe.jpeg"
    }
  ]
}


const cartReducer = (state: CartStateType = initialState, action)=>{
  let updatedState = {...state}
  
  switch(action.type){
    case ACTION_TYPES.FETCH_PRODUCT : 
      return updatedState
      
    case ACTION_TYPES.ADD_TO_CART : 
     
      let p = action.payload
      let index = updatedState.cartProducts.findIndex(cp=>cp._id === p._id) 
      // log2(updatedState.cartProducts)
      if(index !== -1){
        updatedState.cartProducts[index].quantity += 1 
      } else{
        updatedState.cartProducts = [
          ...updatedState.cartProducts, 
          {_id: p._id, title: p.title, unitPrice: p.price, quantity: 1, image: p.cover_photo }
        ] 
      }
      return updatedState
    
    case ACTION_TYPES.INCREASE_CART_ITEM: 
      let i = updatedState.cartProducts.findIndex(cp=>cp._id === action.payload) 
      updatedState.cartProducts[i].quantity++  
      return updatedState
    
    case ACTION_TYPES.DECREASE_CART_ITEM:
      let deindex = updatedState.cartProducts.findIndex(cp=>cp._id === action.payload) 
      if(updatedState.cartProducts[deindex].quantity > 1){
        updatedState.cartProducts[deindex].quantity-- 
      }
      return updatedState
      
    case ACTION_TYPES.REMOVE_CART_ITEM :
      let f =  updatedState.cartProducts.filter(cp=>cp._id !== action.payload) 
      updatedState.cartProducts = f
      return updatedState
      
      
    default: 
       return state
  }
}

export default cartReducer