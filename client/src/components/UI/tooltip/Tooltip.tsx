import React, {FC} from "react";
import "./tooltip.scss"


interface TooltipProps{
  tooltip: any,
  children: any
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left",
  delay?: number
  maxWidth?: number
  theme?: "simple-white"
  tooltipClass?: string
}


let id;

const Tooltip: FC<TooltipProps> = (props)=>{
  
  const { delay=1000,  tooltipClass = "", placement="top-left",} = props
  
  const baseRef = React.useRef<HTMLElement>(null)
  const tipsRootRef = React.useRef<HTMLDivElement>(null)
  
  const [openTooltip, setOpenTooltip] = React.useState(false)
  
  function handleMouseEnter(e){
    
    id = setTimeout(()=>{
      let base: any =  baseRef.current
      
      setOpenTooltip(true)
      let tips = document.querySelector(".tips") as HTMLElement
      let top = tips.offsetHeight
      if(placement === "top-left") {
        tips.style.top = -(top + 4) + "px"
        tips.style.left = 0 + "px"
      } else if(placement === "top-right"){
        tips.style.top = -(top + 4) + "px"
        tips.style.left = (base.offsetWidth - 30) + "px"
      } else if(placement === "bottom-right"){
        tips.style.bottom = -(top + 8) + "px"
        tips.style.left = (base.offsetWidth - 30) + "px"
      } else if(placement === "bottom-left"){
        tips.style.bottom = -(top + 8) + "px"
        tips.style.left = (10) + "px"
      }
      if(props.maxWidth){
        tips.style.maxWidth = props.maxWidth +"px"
      }
      
    }, delay)
  }
  
  function handleMouseLeave(e){
    clearTimeout(id)
    setOpenTooltip(false)
  }
  
  
  function renderTooltip(){
    if(props.tooltip) {
      if(typeof props.tooltip === "object") {
        let cls: string[] = []
        if (props.tooltip.props.className) {
          cls.push(props.tooltip.props.className)
        }
        cls = [...cls, tooltipClass, "tips", placement]
        return React.cloneElement(
          props.tooltip, {
            ...props.tooltip.props,
            className: cls.join(" ")
          },
          props.tooltip.props.children,
          React.createElement("span", {className: "angel"})
        )
      } else {
        let cls: string[] = [tooltipClass, "tips", placement]
        return React.createElement(
          "span", {
            className: cls.join(" ")
          },
          props.tooltip,
          React.createElement("span",{className: "angel"})
        )
      }
    }
  }
  
  function renderChild(){
    if(typeof props.children === "object") {
      const childProps = {
        ...props.children.props,
        // onMouseEnter: handleMouseEnter,
        // onMouseLeave: handleMouseLeave,
        ref: baseRef,
        // onBlur: (e)=> removeOld(e)
      }
  
      if (props.children.props && props.children.props.className) {
        childProps.className = props.children.props.className + " base-element"
      } else {
        childProps.className = "base-element"
      }
      return React.cloneElement(props.children, childProps)
    } else {
      return props.children
    }
  }
  
  const tooltipsRootCls = ["tooltip"]
  if(props.theme === "simple-white"){
    tooltipsRootCls.push("simple-white")
  }
  
  return (
    <div ref={tipsRootRef} className={tooltipsRootCls.join(" ")}>
      <div
        // style={{maxWidth: "max-content"}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        
        {props.children && renderChild()}
        {openTooltip && renderTooltip()}
      </div>
    </div>
  )
}

export default Tooltip