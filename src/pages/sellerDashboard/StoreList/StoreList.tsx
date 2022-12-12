import React from 'react' 
import { useParams } from "react-router-dom"

import {Button} from "UI/index"
import {connect, useDispatch} from "react-redux"


const StoreList = (props) => { 
    let params = useParams() 
    // let history = useHistory()
    const dispatch = useDispatch()


  function handlePushBack(){
    // history.back() 
    // history.goBack()
  }
  
  function renderStore(){
    return ""
  }

    return (
        <div>  
          <h1>Store List</h1>  
          <div className="p-5 bg-primary d-flex justify-space-between">
            <div>
              <p>Total store showing: 200</p>  
            </div>
            <div>
              <i className="fa fa-filter" />
            </div>
          </div>
          
          {renderStore()}
          
          
          <Button onClick={handlePushBack}>Registration Now</Button>
        </div>
    )
}

function mapStateToProps(state){
  return {
     
  }
}

export default StoreList