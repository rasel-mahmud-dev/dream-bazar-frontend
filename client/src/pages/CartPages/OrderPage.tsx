import React from 'react' 
import { useParams, useHistory, Link } from "react-router-dom"
import {Button, Spin, Input} from "components/UI"
import {connect, useDispatch} from "react-redux"
import { fetchProduct, toggleLoader } from "actions/productAction"


const OrderPage = (props) => { 
    let params = useParams() 
    let history = useHistory() 
    const dispatch = useDispatch()
    
    const {loadingStates, cartState, _id} = props
    const [paymentMethod, setPaymentMethod] = React.useState("")
    const [allOrders, setOrders] = React.useState([])
    
    // React.useEffect(async ()=> {
    //   let {data} = await api.get("/api/orders")
    //   setOrders(data.orders)
    // }, [authState._id])
    //

  function handleChange(e){
  //  setPaymentMethod(e.target.value)
  }
  

  function handlePushBack(){
    // history.back() 
    history.goBack()
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
  
  function renderOrders(){
    return (
        <div>
          { allOrders.map((order: any)=>(
            <div>
              <h3>{order.order_id}</h3>
            </div>
          )) }
        </div>
      )
    
  }
  

    return (
        <div> 
          <h1 className="t-center">Order</h1> 
          
          {renderOrders()}

          <div className="row justify-space-between">
            <Button onClick={handlePushBack}>Back to Shop</Button>
          </div>
          
        </div>
    )
}

function mapStateToProps(state){
  return {
    authState: state.authState,
    cartState: state.cartState,
    loadingStates: state.productState.loadingStates
  }
}

export default connect(mapStateToProps, {
  fetchProduct,
  toggleLoader
})(OrderPage)