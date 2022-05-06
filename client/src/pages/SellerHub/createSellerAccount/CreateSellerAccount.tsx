import React from "react" 
import {
  Button,
  Menu,
  Spin,
  Input,
  Modal, TopProgressBar, Container
} from "components/UI"


const CreateSellerAccount = (props)=>{
  return (
    <div>
      
      <Container>
        <form action="">
          <h1 className="font-medium text-gray-900 text-3xl mt-3">Create A Seller Account</h1>
          
          <div className="form-group">
            <label htmlFor="">Seller Name</label>
            <Input placeholder="Seller Name" />
          </div>
          
          <div className="form-group">
            <label className="label" htmlFor="">Shop Name</label>
            <Input placeholder="Shop name"/>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="">Mobile Number</label>
            <Input placeholder="Mobile Number" type="number"/>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="">Email Number</label>
            <Input placeholder="Email Number" type="number"/>
          </div>
          
          <Button style={{marginLeft: 0}}>Create</Button>
          
          {/*<div className="form-group">*/}
          {/*  <label htmlFor=""></label>*/}
          {/*  <Input/>*/}
          {/*</div>*/}
          
          {/*<div className="form-group">*/}
          {/*  <Input/>*/}
          {/*</div>*/}
          
        </form>
      </Container>
    </div>
      
  )
}

export default CreateSellerAccount