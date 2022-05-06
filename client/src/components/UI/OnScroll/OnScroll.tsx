import React from "react" 

let id;
function throttle(cb, wait, lastDelay){
  let time = Date.now() 
  
  return function(lastDelay){ 
    // clear timeout id if it not last 
    clearTimeout(id)
    let afterDelay = time + wait
    if(afterDelay - Date.now() < 0){
      cb()
      time = Date.now()
    }
    
    id = setTimeout(()=>{
      // callback call after 2s when stop scroll. 
      cb()
    }, lastDelay)
    
  }
  
}

const OnScroll = (HigherOrderCom, wait, lastDelay)=>{
  
  return function(props){ 
    
    const [offsetTop, setOffsetTop] = React.useState<number>(0)
  
 //   g = setOffsetTop
    
    
    React.useEffect(()=>{
      // setOffsetTop({
      //   offsetTop:  document.body.scrollTop || document.documentElement.scrollTop
      // })
      //
      window.addEventListener("scroll", throttle(handler, wait, lastDelay))
      return ()=>{
        return window.removeEventListener("scroll", throttle(handler, wait, lastDelay))
      }
    }, [])
    
    function handler(e){
      let top = document.body.scrollTop || document.documentElement.scrollTop
      setOffsetTop(top)
    }
    
    
    return <HigherOrderCom {...props} offsetTop={offsetTop} />
  
  }
  
}

export default OnScroll