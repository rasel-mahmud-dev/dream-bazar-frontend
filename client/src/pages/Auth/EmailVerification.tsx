import React from 'react' 
import { useParams, useHistory, Link } from "react-router-dom"
import qs from "query-string"  

import {Button, Spin, Input} from "components/UI"
import {connect, useDispatch} from "react-redux"

import redirect from "src/redirects"

import "./EmailVerification.scss"

const EmailVerification = (props) => { 
  
  let params = useParams() 
  let history = useHistory() 
  const dispatch = useDispatch()
    
  const {loadingStates, cartState} = props

  const [state, setState] = React.useState({
    method: "", 
    phone: "", 
    email: ""
  })
  
  const totalSecond = 60 * 10
  const [timeOut, setTimeOut] = React.useState(false)
  const [consumeSecond, setConsumeSecond] = React.useState(0)
  
  let id;
  React.useEffect(()=>{
    if(history.location.search){
      let q: any = qs.parse(history.location.search)
      if(q){
        setState(q)
      }
    }
  }, [history.location.search])

  React.useEffect(()=>{
    clearInterval(id)
    if(state.method === "email"){
        id = setInterval(()=>{
          setConsumeSecond((consumeSecond)=>consumeSecond + 1)
        }, 1000)
      }
      return ()=> clearInterval(id)
  }, [state])



  function getQs(){
    return qs.parse(history.location.search)  
  }
 
  function handlePushBack(){
    // history.back() 
    history.goBack()
  }
  
  function handleProductAction(type, prod){
    
  }
  
  function handleChange(e){
    // setUserData({
    //   ...userData,
    //   [e.target.name]: e.target.value
    // })
  }
  
  function handleSave(e){ 
    e.preventDefault()
    // props.login(userData, (auth)=>{
    //   redirect(history, (redirectQs, done)=>{
    //     if(redirectQs === "dashboard"){
    //       let toPath = auth.role === "customer"
    //         ? `/customer/${auth.username}`
    //         : `/auth/admin/dashboard`
    //
    //       done(toPath)
    //     } else if(redirectQs === "checkout"){
    //       done(`/cart/checkout`)
    //     }
    //   })
    // })
  }
  
  function renderPhoneVerification(){
    return (
      <form onSubmit={handleSave}>
        <Input 
          name="code" 
          label="Enter CODE" 
          type="number"
          onChange={handleChange}
        />
        <Button type="submit">Verify Phone</Button>
      </form> 
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
  
  function humanReadAbleTime(){
    let time = totalSecond - consumeSecond 
    let min = 0;
    let sec = 0;
    if(time >= 60){
      min = Math.floor(time / 60)
      sec = time % 60
    }
    return " "+  min + "min" + " "+ sec + "sec"
  }

    return (
        <div className="container"> 
          <h1 className="t-center">Verify Your {state.method}</h1>
          
          { state.method === "email" && (
            <div className="row d-flex align-center">
              <h3>Your Session End: </h3>
              <h2> {" " + humanReadAbleTime()}</h2>
            </div>
          )}
          { state.method === "email1" && (
            <div className="">
              <div className="clock_circle">
                
              </div>
              
            </div>
          )}
          
          { state.method === "phone" && renderPhoneVerification() }
          
          <p>We send a mail to your given email, 
            to verify you account please check your email and click verification link</p>  
          <div className="row d-flex">
            <h2>Don't see any email</h2>
            <Button>Send again</Button>
          </div>
        </div>
    )
}

function mapStateToProps(state){
  return {
    authState: state.authState
  }
}

export default connect(mapStateToProps, {})(EmailVerification)