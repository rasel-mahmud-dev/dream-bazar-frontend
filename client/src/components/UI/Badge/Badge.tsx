import React, {HTMLAttributes, FC} from "react";
import "./Badge.scss"


const Badge:FC<HTMLAttributes<HTMLSpanElement>> = (props)=>{
  const {className= "", ...attributes} = props
  return <span className={`badge ${className}`}  {...attributes} />
}

export default Badge