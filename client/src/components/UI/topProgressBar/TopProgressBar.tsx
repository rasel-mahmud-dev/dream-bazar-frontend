import React from "react"
import LoadingBar from 'react-top-loading-bar' 

const TopProgressBar = (props) => { 
  
  const el = React.useRef<HTMLDivElement>(null)
  
  React.useEffect(()=>{
     if(el.current){
       let t: any =  el?.current
       t.staticStart()
     }
     return ()=>{
      if(el.current){
        let t: any =  el?.current
        t.staticStart()
      }
     }
  }, [])
  
  return (
    <div>
        {/* @ts-ignore */}
      <LoadingBar color="#f11946" ref={el} shadow={true} />
    </div>
  )
  
}

export default TopProgressBar