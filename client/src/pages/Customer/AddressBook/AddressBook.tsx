import React from 'react' 
import { useParams,  Link } from "react-router-dom"


import {Button, 
Menu,  Badge} from "components/UI"
import {connect, useDispatch} from "react-redux"


import "./AddressBook.scss"
import apis from "src/apis";

const {SubMenu} = Menu

const AddressBook = (props) => { 
  let params = useParams() 
  // let history = useHistory()
  const dispatch = useDispatch()
  const {_id} = props  
  const [shippingAddresses, setShippingAddresses] = React.useState([])
  const [isShowAddShippingForm, setShowAddShippingForm] = React.useState(false)
  
  const [shippingAddress, setShippingAddress] = React.useState({
   name: "",
   phone: "",
   zip_code: "",
   region: "",
   city: "",
   area: "",
   address: "",
   is_default: false
  })
  
    
  React.useEffect(()=>{
    (async function (){
      if(_id){
        let {data} = await apis.get(`/api/shipping-addresses/${_id}`)
        setShippingAddresses(data.shippingAddresses)
      }
    }())
    
  }, [_id])

  function handleChange(e){
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    })
  }
  async function handleSave(e){  
    // alert(JSON.stringify(shippingAddress))
    // if(!authState._id){
    //   window.localStorage.setItem("shipper", JSON.stringify(shippingAddress)) 
    //   history.push("/auth/login/?redirect=shipping") 
    // } else{
    //   let {data} = await api.post("/api/shipping-address", {
    //     ...shippingAddress, 
    //     user_id: authState._id
    //   }) 
    //   console.log(data)
    // }
  }
  
  function updateShippingFormHandle(id){
     setShowAddShippingForm(id)  
    let s: any =  shippingAddresses.find((sp: any) => sp._id === id)
    setShippingAddress(s) 
    // console.log(shippingAddresses)
    
  }
  
  // function renderShippingAddress(){
  //   return (
  //     <div>
  //       <h2>{typeof isShowAddShippingForm === "boolean" ? "Add New Shipping Address" : "Update Shipping Address" }</h2>
  //       <Input
  //         name="name"
  //         label="Your Full Name"
  //         value={shippingAddress.name}
  //         onChange={handleChange}
  //         />
  //       <Input
  //         name="phone"
  //         value={shippingAddress.phone}
  //         label="Your Mobile Number"
  //         type="number"
  //         onChange={handleChange}
  //         />
  //       <Input
  //
  //         name="region"
  //         value={shippingAddress.region}
  //         label="Region"
  //         type="text"
  //         onChange={handleChange}
  //         />
  //       <Input
  //         name="city"
  //         value={shippingAddress.city}
  //         label="City"
  //         type="text"
  //         onChange={handleChange}
  //         />
  //       <Input
  //         name="area"
  //         value={shippingAddress.area}
  //         label="Area"
  //         type="text"
  //         onChange={handleChange}
  //         />
  //       <Input
  //         name="zip_code"
  //         value={shippingAddress.zip_code}
  //         label="Zip Code"
  //         type="number"
  //         onChange={handleChange}
  //         />
  //       <Input
  //         type="textarea"
  //         value={shippingAddress.address}
  //         name="address"
  //         label="Address"
  //         onChange={handleChange}
  //         />
  //
  //       <Input
  //         type="checkbox"
  //         // value={shippingAddress.address}
  //         value={shippingAddress.is_default}
  //         checked={shippingAddress.is_default}
  //         name="is_default"
  //         label="Make Default Shipping Address"
  //         onChange={handleChange}
  //         />
  //
  //         <div className="d-flex">
  //           <Button onClick={()=> setShowAddShippingForm(false)}>Cancel</Button>
  //           <Button onClick={handleSave}>{typeof isShowAddShippingForm === "boolean" ? "Save Shipping Address" : "Update" }</Button>
  //         </div>
  //       </div>
  //   )
  // }
  

  return (
      <div className="container"> 
          <Button 
            onClick={()=> setShowAddShippingForm(true)}
            >+ Add Address
          </Button> 
          {/*<Divider lineHeight={1} lineColor="#d9d9d" />*/}
        
          {shippingAddresses.map((sp: any)=>(
             <div className="address_book">
              <div className="">
                <i className="fa fa-map-marker-alt" />
              </div>
              <div>
                <h4>{sp.name}</h4>
                <h4>{sp.phone}</h4>
                <p>
                 <Badge
                  
                  style={{ 
                    backgroundColor: '#797ffeed', 
                    color: '#fff', 
                   //boxShadow: '0 0 0 1px #d9d9d9 inset' 
                  }}
                  />
                  west tekani Sonatola Bogra
                </p>
                {/*<Badge*/}
                {/*  count={"Default Shipping Address"}*/}
                {/*  style={{ */}
                {/*    backgroundColor: '#fff', */}
                {/*    color: 'black', */}
                {/*   boxShadow: '0 0 0 1px #d9d9d9 inset' */}
                {/*  }}*/}
                {/*  />*/}
              </div> 
              <div className="edit_shipping_button">
                <i onClick={()=>updateShippingFormHandle(sp._id)}  className="fa fa-pen" />
              </div>
          </div>
          ))}
        
          {/*{ isShowAddShippingForm && renderShippingAddress() }*/}
          
          
      </div>
    )
}

export default AddressBook