import React from 'react' 
import { useParams,  Link } from "react-router-dom"
import {Button , Image} from "components/UI"
import {connect, useDispatch} from "react-redux"
import { fetchProduct, toggleLoader } from "actions/productAction"
import {ACTION_TYPES} from "store/types"

import Title from 'src/components/UI/typography/Title';

import "./CartPage.scss"
import fullLink from "src/utills/fullLink";
import Spin from "UI/Spin/Spin";

const CartPage = (props) => { 
    let params = useParams() 
    // let history = useHistory()
    const dispatch = useDispatch()

    const {loadingStates, cartState, appState: { selectedLang, lang } } = props
 
    React.useEffect(()=> { 
        console.log(lang)
    }, [])

  function handlePushBack(){
    // history.back() 
    // history.goBack()
  }
  
  function handleProductAction(type, prod){
    
  }
  
  
  function renderLoader(where){
    let loadingState = loadingStates.find(ls=>ls.where === where)
    return (
      <div style={{textAlign: "center"}}>
        { loadingState && loadingState.isLoading 
           && <Spin  />
        }
      </div>
    )
  }
  
  function calculateTotalPrice(items){
    let totalPrice = 0; 
    for(let i=0; i<items.length; i++){
      totalPrice += (items[i].unitPrice * items[i].quantity)
    }
    return totalPrice.toFixed(2) || 0.00
  }
  
  
  function renderCartItems(){
    
    return (
      <div>
        <table className="cart_table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
          </thead>
          <tbody>
          { cartState.cartProducts.map(item=>(
            <tr>
              <td className="d-flex">
                <div className="cart_image_root">
                  <Image className="cart-image" src={fullLink(item.image)} maxWidth={20} />
                </div>
                <Title level={4} className="title">{item.title}</Title>
              </td>
              <td>{item.unitPrice}</td>
              <td>
                <div className="d-flex align-center">
                  <Button onClick={()=>dispatch({type: ACTION_TYPES.DECREASE_CART_ITEM, payload: item._id})}><i className="fa fa-minus"/></Button>
                  <span>{item.quantity}</span>
                  <Button onClick={()=>dispatch({type: ACTION_TYPES.INCREASE_CART_ITEM, payload: item._id})}><i className="fa fa-plus"/></Button>
                </div>
              </td>
              <td className="t-center">
                <i
                  onClick={()=>dispatch({type: ACTION_TYPES.REMOVE_CART_ITEM, payload: item._id})}
                  className="fa fa-trash" />
              </td>
            </tr>
          )) }
          
          </tbody>
        
        </table>
        
        
        <h4 className="t-end">Total Price {calculateTotalPrice(cartState.cartProducts)}</h4>
      
      </div>
    )
  }
  
  
  return (
    <div>
      
      <div>
        
        <div  >
          <div className="cart_items">
            <h3 className="t-center"> Your Cart</h3>
            
            { cartState.cartProducts && cartState.cartProducts.length > 0
            && renderCartItems()}
            
            <div >
              <Button onClick={handlePushBack}>{"Back to Shop"}  </Button>
              <Link to="/shopping/cart/checkout">
                <Button className="right" >Go to Checkout</Button>
              </Link>
            </div>
          </div>
        
        </div>
        <div  >
          <div className="remm_product">
            <Title level={3} className="section_title">Recommend Products</Title>
          </div>
        </div>
      
      </div>
    
    
    
    </div>
  )
};

function mapStateToProps(state){
  return {
    cartState: state.cartState,
    appState: state.appState
  }
}


export default connect(mapStateToProps, {
  fetchProduct,
  toggleLoader
})(CartPage)