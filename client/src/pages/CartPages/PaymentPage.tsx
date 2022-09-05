import React from 'react' 
import { useParams, Link } from "react-router-dom"
import {Button, Spin, Input} from "components/UI"
import {connect, useDispatch} from "react-redux"
import { fetchProduct, toggleLoader } from "actions/productAction"


const PaymentPage = (props) => { 
    let params = useParams() 
    // let history = useHistory()
    const dispatch = useDispatch()
    
    const {loadingStates, cartState} = props
    
    const [paymentMethod, setPaymentMethod] = React.useState("")
 
 
    React.useEffect(()=> { 
        console.log(cartState.cartProducts)
    }, [])

  function handleChange(e){
    setPaymentMethod(e.target.value)
  }
  
  
  function renderPaymentInformation(){
    
    return (
      <div>
        <h2>Cash on Delivery</h2>
            <p>
              Cash on Delivery Cash on Delivery Cash on Delivery Cash on Delivery
            </p>
      </div>
    )  
    
  }

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
           && <Spin size={50} />
        }
      </div>
    )
  }
  

    return (
        <div> 
          <h1 className="t-center">Payment</h1> 
          <div>
            <h4>Choose Payment Method</h4>
              <Input 
                onChange={handleChange}
                type="radio"
                label="Bkash"
                value="bkash" 
                name="payment_method" 
                />
              <Input 
                onChange={handleChange}
                label="Nagod"
                type="radio" 
                value="nagod" 
                name="payment_method" 
                />
              <Input
                onChange={handleChange}
                label="Cash on Delivery"
                type="radio" 
                value="cash-on-delivery" 
                name="payment_method" 
              />
              
          </div> 
          
          <div> 
            { paymentMethod === "cash-on-delivery" && renderPaymentInformation() }
          </div>
          
          
          <div className="row justify-space-between">
            <Button onClick={handlePushBack}>Back to Checkout </Button>
            <Link to="/cart/payment">
              <Button className="right" >
              {paymentMethod === "cash-on-delivery" ? "Order Now" : "Pay"}
              
              </Button>
            </Link>
          </div>
        </div>
    )
}

function mapStateToProps(state){
  return {
    cartState: state.cartState,
    loadingStates: state.productState.loadingStates
  }
}

export default connect(mapStateToProps, {
  fetchProduct,
  toggleLoader
})(PaymentPage)