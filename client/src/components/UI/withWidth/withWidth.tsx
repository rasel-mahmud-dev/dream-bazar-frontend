import React, {ComponentType, FC, useEffect} from 'react'


function WithWidth<T>(WrapperComponent: ComponentType<T> ){
  
  return function (props){
    const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
    
    useEffect(()=>{
      setInnerWidth(window.innerWidth);
      window.addEventListener("resize", handleResize)
      return ()=>{
        window.removeEventListener("resize", handleResize)
      }
    }, [0])
    
    function handleResize(e){
      setInnerWidth(window.innerWidth);
    }
    
    return <WrapperComponent innerWidth={innerWidth}  {...props }/>
  }
}



export default WithWidth

