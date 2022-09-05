import React, {CSSProperties, FC} from "react"

import "./Popup.scss"
import {CSSTransition} from "react-transition-group"
interface PopupProps{
  className?: string
  timeout?: number,
  animationClass?:string,
  inProp: boolean,
  style?: CSSProperties | any,
  bg?: string,
  children: any
}

const Popup: FC<PopupProps>  = ({className, timeout=500, animationClass, inProp,  bg, children, ...otherAttributes})=>{
  
  return (
     <CSSTransition 
      unmountOnExit 
      in={inProp} 
      timeout={timeout} 
      classNames={[animationClass ? animationClass : "my-popup"].join(" ")}>
      <div className={"popup " + className} {...otherAttributes}>
        {children}
      </div>
    </CSSTransition>
  )
  
}
  
export default Popup