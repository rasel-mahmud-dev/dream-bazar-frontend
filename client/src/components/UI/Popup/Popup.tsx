import React, {CSSProperties, FC} from "react"
import createStyles from "UI/styles"
import "./Popup.scss"
import {CSSTransition} from "react-transition-group"
interface PopupProps{
  className?: string
  timeout?: number,
  animationClass?:string,
  inProp: boolean,
  style?: CSSProperties | any,
  bg?: string,
}

const Popup: FC<PopupProps>  = ({className, timeout=500, animationClass, inProp, style, bg, children, ...otherAttributes})=>{
  const styles = createStyles(style, {bg})
  
  return (
     <CSSTransition 
      unmountOnExit 
      in={inProp} 
      timeout={timeout} 
      classNames={[animationClass ? animationClass : "my-popup"].join(" ")}>
      <div style={styles} className={"popup " + className} {...otherAttributes}>
        {children}
      </div>
    </CSSTransition>
  )
  
}
  
export default Popup