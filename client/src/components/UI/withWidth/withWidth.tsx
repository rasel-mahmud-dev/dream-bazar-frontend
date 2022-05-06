import React, {ComponentType, FC, FunctionComponent} from 'react'

type size = "col" | "sm" | "md" | "lg" | "xl"

interface withWidthProps {
  isUp?: (size: size | number )=> boolean
  isDown?: (size: size | number)=>  boolean
  winScreenSize?: size | ""
  innerWidth?: number
  [key: string]: any
}

function WithWidth<T>(WrapperComponent: ComponentType<T> ){
  
  return function (props){
    const [innerWidth, setInnerWidth] = React.useState(0);
    const [ screen, setScreen ] =  React.useState({
      col: { min: 0, max: 575 },
      sm: { min: 576, max: 767 },
      md: { min: 768, max: 991 },
      lg: { min: 992, max: 1200 },
      xl: { min: 1200, max: null },
    })
    React.useEffect(()=>{
      
      setInnerWidth(window.innerWidth);
      
      window.addEventListener("resize", handleScroll)
      return ()=>{
        window.removeEventListener("resize", handleScroll)
      }
    }, [0])
    function handleScroll(e){
      setInnerWidth(e.target.innerWidth);
    }
    function calculateScreenSize(innerWidth){
      // console.log(innerWidth);
      let winScreenSize = ''
      if( innerWidth > screen.col.min && innerWidth <= screen.col.max) winScreenSize = "col"
      if( innerWidth >= screen.sm.min && innerWidth <= screen.sm.max)  winScreenSize = "sm"
      if( innerWidth >= screen.md.min && innerWidth <= screen.md.max) winScreenSize = "md"
      if( innerWidth >= screen.lg.min && innerWidth < screen.lg.max) winScreenSize = "lg"
      if( innerWidth >= screen.xl.min ) winScreenSize = "xl"
      return winScreenSize
    }
    let winScreenSize = calculateScreenSize(innerWidth);
    function isDown(size){
      if(typeof size === "string"){
        for (const key in screen) {
          if(key === size){
            return (screen[key].max >= innerWidth)
          }
        }
      } else {
        return size >= innerWidth
      }
      
    }
    function isUp(size){
      if(typeof size === "string"){
        for (const key in screen) {
          if(key === size){
            return (screen[key].max + 1 <= innerWidth)
          }
        }
      } else {
        return size <= innerWidth
      }
    }
    return <WrapperComponent isUp={isUp} isDown={isDown} winScreenSize={winScreenSize} innerWidth={innerWidth}  {...props }/>
  }
}



export default WithWidth

