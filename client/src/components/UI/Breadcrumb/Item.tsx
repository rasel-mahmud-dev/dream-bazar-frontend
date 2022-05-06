import React, {FC} from "react";
import {Link} from  "react-router-dom"
import "./Breadcrumb.scss" 

interface ItemProps{
  type?: "link" | ""
  onClick?: any
  to?: string
  className?: string
}

const Item: FC<ItemProps> = (props)=>{
  const { onClick, to, type, className="", ...otherAttributes} = props
  
  if(to){
    return <Link className={className + " breadcrumb_item--name"} to={to} onClick={onClick}>{ props.children}</Link>
  } else {
    return <li className={className + " breadcrumb_item--name"} onClick={onClick}>{ props.children}</li>
  }
  
}

export default Item
