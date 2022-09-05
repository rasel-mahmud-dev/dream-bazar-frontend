import React, {FC} from 'react'
import {useParams, Link, useLocation, useNavigate} from "react-router-dom"
import qs from "query-string"
import apis, {backend} from "src/apis" 
import {
  Button,
  Spin,
  Tooltip,
  Form,
  Checkbox,

  Popup,

  Input,
  Password
} from "components/UI"
import {connect, useDispatch} from "react-redux"
import { login } from "actions/authAction"

import {toggleLoader} from "actions/productAction";
import {toggleAppMask} from "actions/appAction";

interface LoginPageProps {
  toggleLoader?: any
  toggleAppMask?: any
  loadingStates:any,
  cartState: any
  login: any
}

const LoginPage: FC<LoginPageProps> = (props) => {
    let params = useParams()
  
  const location = useLocation();
  
    // let history = useHistory()
    const dispatch = useDispatch()
    const navigate = useNavigate()


  const [loadings, setLoading] = React.useState([])
    
  const { loadingStates, cartState } = props
  const [userData, setUserData] = React.useState({
   phone: "",
   email: "rasel@gmail.com",
   password: "123",
    remember: false
  })
  

  const [errorMessage, setErrorMessage] = React.useState({
    message: "",
    phone: ""
  })

function getQs(){
  return qs.parse(location.search)
}
 
 
  function handlePushBack(){
    // history.back() 
    // history.goBack()
  }
  
  function handleProductAction(type, prod){
    
  }
  
  function handleChange(e){

    let {name, type, value, checked} = e.target
    if(type === "checkbox") {
      setUserData({
        ...userData,
        [name]: checked
      })
    } else {
      setUserData({
        ...userData,
        [name]: value
      })
    }
    
  }
  
  
  
  function handleSave(e){ 
    e.preventDefault()
    let isNumber = Number(userData.email)
    let state: any = {...userData}
    let passDataBase = {}
    if(isNumber){
      state = {
        ...state,
        isNumber: true
      }
      passDataBase = {phone: state.email, password: state.password }
    } else {
      state = {
        ...state,
        isNumber: false
      }
      passDataBase = { email: state.email, password: state.password }
    }
    
  
    setUserData({...state})

    props.toggleLoader("login-user", true)
    props.toggleAppMask()
  
    props.login && props.login(passDataBase, (auth, error)=>{
      if(auth && auth._id){
        props.toggleLoader("login-user", false)
        props.toggleAppMask(false)
        
        let redirectQs = getQs().redirect;
        
        if(redirectQs === "dashboard") {
          let toPath = auth.role === "customer"
            ? `/customer/${auth.username}`
            : `/auth/admin/dashboard`
          navigate(toPath)
        }
      }
      
      // if(auth){
      //   redirect(history, (redirectQs, done)=>{
      //     // history.push(redirectQs)
      //     // console.log(redirectQs, done)
      //     // if(redirectQs === "dashboard"){
      //     //   let toPath = auth.role === "customer"
      //     //     ? `/customer/${auth.username}`
      //     //     : `/auth/admin/dashboard`
      //     //
      //     //   done(toPath)
      //     // } else if(redirectQs === "checkout"){
      //     //   done(`/cart/checkout`)
      //     // } else {
      //     //   done(redirectQs)
      //     // }
      //   })
      // } else {
      //   console.log(error)
      //   setErrorMessage({...error})
      // }
    })
  }
  
  // function loadigHandler(){
  //   setLoading([true, true])
  //   setTimeout(()=>{
  //     setLoading([false, false])
  //   }, 2000)
  // }
  
  
  function renderLoginForm(){
    
    function onFinish(){}
    function onFinishFailed(){}
    
    return <form
      
        onSubmit={handleSave}
        style={{maxWidth: '800px', margin: "50px auto"}}
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
  
 
      <Input 
        name="email"
        type="text"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email Or Phone"
        prefix={<i className="fa fa-user" />}
        suffix={
          <div title="Extra information">
            <i className="far fa-info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
          </div>
        }
      />
   
      <Password
        name="password"
        value={userData.password}
        onChange={handleChange}
        placeholder="input password"
        prefix={<i className="fa fa-key" />}
        iconRender={visible => (visible ? <i className="fal fa-eye-slash"/> : <i className="fal fa-eye" />)} 
      />
      
      <Checkbox  
        label="Remember me"
        name="remember"
        checked={userData.remember}
        onChange={handleChange}
       />
        <h4 className="my-5">New User? <Link to="/auth/registration">Registration</Link> </h4>
        <Button
          className="ml-0"
          htmlType="submit" 
          // loading={false}
          type="primary">
          Login
        </Button>
       
    {
      /*
       <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */ }
    </form>
  }
  
  function renderLoader(where){
    let loadingState = loadingStates.find(ls=>ls.where === where)
    return (
      <div className="spin-fixed" style={{top:'20vh'}}>
        { loadingState && loadingState.isLoading 
           && <Spin size={20} borderWidth={4} theme="primary" />
        }
      </div>
    )
  }
  

    return (
        <div  >
          <h1 className="text-gray-dark-gray-8 mt-5 text-2xl font-bold">Login Here</h1>
          {renderLoader("login-user")}
          {errorMessage.message && (
            <Popup className="error_popup p-5" style={{width: "max-content"}} inProp={true} >
              <div className="d-flex">
                <Button onClick={()=>setErrorMessage({phone: "", message:""})} type="text" icon="fa fa-times"/>
              <h4>{errorMessage.message}</h4>
              </div>
            </Popup>
            )}
          { renderLoginForm() }
          
          {/*<Divider lineColor="#dddcdcab" text="or" />*/}
          
          <Button 
            type="default"
            href={`${backend}/api/auth/google`}
            icon="fab fa-google">
            Login With Google
          </Button>
          
          <Button 
            href={`${backend}/api/auth/facebook`}
            icon="fab fa-facebook" 
            type="primary">
            Login With Facebook
          </Button>


          <div className="row justify-space-between">
            <Button icon="fa fa-angle-left" ghost type="link" to="/cart/checkout" >
              Back to checkout
            </Button>
          </div>
        </div>
    )
}

function mapStateToProps(state){
  return {
    authState: state.authState,
    loadingStates: state.productState.loadingStates
  }
}

export default connect(mapStateToProps, {
  login, toggleLoader, toggleAppMask
})(LoginPage)