import React, {FC} from "react"

import "./Spin.scss"


interface SpinProps {
  size?: number
  loaderColor?: string,
  loaderBorderColor?: string,
  borderWidth?: number,
  style?: any,
  className?: string
  theme?: string
}

const Spin: FC<SpinProps> = (props)=>{
  const {theme, size, loaderBorderColor, loaderColor, borderWidth, style, className, ...o} = props
  
  let classes = ["spin"]
  if(className){
    classes.push(className)
  }
  if(theme){
    classes.push(`loader-${theme}`)
  }
  
  const spinStyle = {...style}
  if(size){
    spinStyle.width = size + "px"  
    spinStyle.height = size + "px"  
  }
  
  let circleStyles: any =  {}
  if(borderWidth){
    circleStyles.borderWidth = borderWidth + "px"
  }
  
  if(loaderBorderColor){
    circleStyles.borderColor = loaderBorderColor
    // circleStyles.borderRightColor = "blue"
  }
  
  if(loaderColor){
    circleStyles.borderRightColor = loaderColor
  }
  
 
  
  
  return (
    <div style={spinStyle} className={classes.join(" ")} {...o}>
      <span style={circleStyles} className="loader_circle" />
      <span style={circleStyles} className="loader_circle"/>
      <span style={circleStyles} className="loader_circle"/>
      <span style={circleStyles} className="loader_circle"/>
    </div>
  )
  
}
 
export default Spin