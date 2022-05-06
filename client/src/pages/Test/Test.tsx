import React, {useState, useRef, useEffect} from "react"
import {nonInitialEffect} from "src/reactTools"
import api from "src/apis"
import {useDispatch} from "react-redux"
import {useHistory, useParams} from "react-router-dom"
import {loginHandler} from "actions/authAction"

const TestPage = (props)=>{
  const history = useHistory()
  const dispatch = useDispatch()
  const params = useParams()
  const [click, setClick] = useState(false)
  const [size, setSize] = useState({width: 0, height: 0})
  
  const [orientation, setOrientation] = useState(0)
  
  function getOrientation(){
    if(window.innerWidth > window.innerHeight && ( window.orientation === 90 || window.orientation === -90)){ 
      return "Landscape"
    }
    return "Portail"
  }
  
  function isMobile(){
    // alert(document.documentElement.clientWidth)
    // alert(window.devicePixelRatio) 
    return "yes"
  }
  
  
  React.useEffect( function (){
    
    (async function (){
      try{
        let {data} = await api.get(`/api/auth/callback/${params.authService}${history.location.search}`)
        // console.log(data)
        loginHandler(data, dispatch, (user)=>{
          if(user && user._id){
            history.push("/")
          } else {
            history.push("/auth/login?redirect=home")
        
          }
        })
      } catch(ex){
        history.push("/auth/login?redirect=home")
    
      }
    }())
    
    // setSize({width: window.innerWidth, height: window.innerHeight})
    // setOrientation(window.orientation)
    // // Listen for orientation changes
    // window.addEventListener("orientationchange", function() {
    //   // Announce the new orientation number
    //   setOrientation(window.orientation)
    // }, false);
    
    // window.addEventListener('resize', (e)=>{
    //   setSize({width: window.innerWidth, height: window.innerHeight})
    // })
  }, [])
  
  

  return (
    <div>
      <div className="f" data-id="root" >
        <h1>width: {size.width}</h1>
        <h1>height: {size.height}</h1>
        <h1>orientation: {orientation}</h1>
        <h1>mode: {getOrientation()}</h1>
        <h1>mobile: {isMobile()}</h1>
        
      </div>
      </div>
    )
}

export default TestPage