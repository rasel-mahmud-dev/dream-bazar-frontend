
import React from 'react' 
import { useParams,  Link } from "react-router-dom"
import {Button, Spin, Input} from "components/UI"
import {connect, useDispatch} from "react-redux"
import { registration } from "actions/authAction"
import {ACTION_TYPES} from "store/types"

const RegistrationPage = (props) => { 
    let params = useParams() 
    // let history = useHistory()
    const dispatch = useDispatch()

    
  const {loadingStates, cartState} = props
  const [userData, setUserData] = React.useState({
   password: "",
   phone: "",
   email: ""
  })
 

  function handlePushBack(){
    // history.back() 
    // history.goBack()
  }
  
  function handleProductAction(type, prod){
    
  }
  
  function handleChange(e){
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  function handleSave(e){ 
    // props.registration(userData) 
    let isNumber = Number(userData.email) 
    let state: any = {...userData}
    if(isNumber){
      state = {
        ...state,
        isNumber: true
      }
    } else {
      state = {
        ...state,
        isNumber: false
      }
    }
    
    setUserData({...state})
    // if(!state.isNumber){
    //   history.push(`${history.location.pathname}/email-verification?email=${state.email}&method=email`)
    // } else {
    //   history.push(`${history.location.pathname}/phone-verification?phone=${state.email}&method=phone`)
    // }
  }
  
  function renderRegistrationForm(){
    return (
      <div>
        <Input 
          name="email" 
          label="Email Or Phone" 
          type="text"
          onChange={handleChange}
          />
         { /* <Input 
          name="password" 
          label="Password" 
          onChange={handleChange}
          /> */ } 
          <h4>Already Have An Account? <Link to="/auth/login">Login</Link> </h4>
        <Button htmlType="submit" type="primary" onClick={handleSave}>Continue</Button> 
         
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
          <h1 className="t-center">Create an Account</h1> 
          
          { renderRegistrationForm() }
          
          <div className="row justify-space-between">
            <Link to="/cart/checkout">
              <Button className="right" >Go to Checkout</Button>
            </Link>
          </div>
        </div>
    )
}

function mapStateToProps(state){
  return {
    authState: state.authState
  }
}

export default connect(mapStateToProps, {
  registration
})(RegistrationPage)