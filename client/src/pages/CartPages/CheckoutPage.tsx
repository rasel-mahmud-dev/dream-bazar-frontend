import React from 'react' 
import { useParams, useHistory, Link } from "react-router-dom"

import {Button, Spin, Input, Modal} from "components/UI"
import {connect, useDispatch} from "react-redux"
import { fetchProduct, toggleLoader } from "actions/productAction"
import {ACTION_TYPES} from "store/types"
import api from "src/apis"


const CheckoutPage = (props) => { 
    let params = useParams() 
    let history = useHistory() 
    const dispatch = useDispatch()
    
  const {loadingStates, cartState, authState} = props
  
  const [isShowAddShippingForm, setShowAddShippingForm] = React.useState(false)
  
  const [recentShippingAddress, setRecentShippingAddress] = React.useState([
    { label: "", shippingAddress: {}}
    ])
  
  const [shippingAddress, setShippingAddress] = React.useState({
   name: "",
   phone: "",
   postCode: "",
   thana: "",
   distric: "",
   address: ""
  })
 
  
  React.useEffect(()=> {
    (async function (){
      let s = window.localStorage.getItem("shipper")
  
      if(s){
        setShippingAddress({...JSON.parse(s)})
        setRecentShippingAddress([{label: s.replace("}", "").replace("{", ""), shippingAddress: JSON.parse(s)}])
      }
    }())
    

  }, []) 
  
  React.useEffect(()=>{
    // if(authState._id){
    //  let {data} = await api.get(`/api/shipping-addresses/${authState._id}`)
    //
    //  let updateRenderShippingAddress = []
    //  data.shippingAddresses && data.shippingAddresses.forEach(spAdd=>{
    //     let {_id, user_id, ...attributes } = spAdd
    //     let labelString = JSON.stringify(attributes).replace("}", "").replace("{", "")
    //
    //     updateRenderShippingAddress.push({
    //       label: labelString,
    //       shippingAddress: spAdd
    //     })
    //  })
    //  setRecentShippingAddress(updateRenderShippingAddress)
    // } else {
    //   history.push(`/auth/login/?redirect=/shopping/cart/checkout`)
    // }
  }, [authState._id])

  function handlePushBack(){
    // history.back() 
    history.goBack()
  }
  
  function handleProductAction(type, prod){
    
  }
  
  function handleChange(e){
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    })
  }
  async function handleSave(e){  
    // alert(JSON.stringify(shippingAddress))
    if(!authState._id){
      window.localStorage.setItem("shipper", JSON.stringify(shippingAddress)) 
      history.push("/auth/login/?redirect=/shopping/cart/shipping")
    } else{
      let {data} = await api.post("/api/shipping-address", {
        ...shippingAddress, 
        user_id: authState._id
      }) 
      console.log(data)
    }
  }
  
  function renderShippingAddress(){
    return (
      <div> 
        <Input 
          name="name" 
          label="Your Name" 
          value={shippingAddress.name}
          onChange={handleChange}
          />    
        <Input 
          name="phone" 
          value={shippingAddress.phone}
          label="Your Mobile Number" 
          type="number"
          onChange={handleChange}
          />  
        <Input 
        
          name="distric" 
          value={shippingAddress.distric}
          label="Distric" 
          type="text"
          onChange={handleChange}
          />  
        <Input 
          name="thana" 
          value={shippingAddress.thana}
          label="Thana" 
          type="text"
          onChange={handleChange}
          />  
        <Input 
          name="postCode" 
          value={shippingAddress.postCode}
          label="Post Code" 
          type="number"
          onChange={handleChange}
          />  
        <Input 
          type="textarea"
          value={shippingAddress.address}
          name="address" 
          label="Address" 
          onChange={handleChange}
          />  
        
        <Button onClick={handleSave}>Save Shipping Address</Button> 
         
        </div> 
    )
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
        <div className="container"> 
          <h1 className="t-center">Checkout</h1> 
          
          <h3>Shipping Address</h3>  
          
          { recentShippingAddress && recentShippingAddress.map((recentShipAddr, i)=>(
            <Input 
              type="radio" 
              name="shipping-address"
              value={i}
              checked={true}
              label={recentShipAddr.label}
              />
          ))
          }
          <Button onClick={()=> setShowAddShippingForm(!isShowAddShippingForm) }>Add Another shipping address </Button>
          { isShowAddShippingForm && <Modal>{renderShippingAddress()} </Modal> }
          
          <div className="row justify-space-between">
            <Button onClick={handlePushBack}>Back to Cart </Button>
            <Link to="/shopping/cart/payment">
              <Button className="right" >Go to Payment</Button>
            </Link>
          </div>
        </div>
    )
}

function mapStateToProps(state){
  return {
    cartState: state.cartState,
    loadingStates: state.productState.loadingStates,
    authState: state.authState
  }
}

export default connect(mapStateToProps, {
  fetchProduct,
  toggleLoader
})(CheckoutPage)