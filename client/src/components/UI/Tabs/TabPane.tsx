import React from "react"


const TabPane  = (props)=>{
  return (
    <div>
      {props.children}
    </div>
  )
  
}

TabPane.displayName = "TabPane"

export default TabPane