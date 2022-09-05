import React from 'react' 
import { useParams, } from "react-router-dom"

import {Button, Spin, Input, } from "components/UI"
import {connect, useDispatch} from "react-redux"


const SellerHub = (props) => { 
    let params = useParams() 
    // let history = useHistory()
    const dispatch = useDispatch()


  function handlePushBack(){
    // history.back() 
    // history.goBack()
  }
  

    return (
        <div>  
          <h1>You Can Sell via Our Ecommerce website</h1>       
          <h1>Join Us Now!</h1>
          <Input placeholder="Enter 11 digit phone number here" />
          <Button onClick={handlePushBack}>Registration Now</Button>
    
          <h1>Why Sell Here</h1>
        </div>
    )
}

function mapStateToProps(state){
  return {
     
  }
}

export default SellerHub