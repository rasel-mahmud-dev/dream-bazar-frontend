import * as React from "react"

export function nonInitialEffect(effectFunc, dep){
  const initialRender = React.useRef(true)
  React.useEffect(()=>{
    if(initialRender && initialRender.current){
      initialRender.current = false
    } else{
      effectFunc()
    }
  }, dep)
}
