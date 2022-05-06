import qstring from "query-string" 


function createRedirectPath(redirect: string, queryParams: string): string{
  let redirectPath: string = ""
  switch(redirect){
    case "checkout":
      redirectPath = "/cart/checkout"
      break;
    
    case "dashboard":
      redirectPath = queryParams
      break;
    
    default: 
      redirectPath = ""
      break;
  }
  return redirectPath
}


function redirect(history: any, queryParams: string | any ){
  if(!history) return null
  let qs = qstring.parse(history.location.search)  
  if(!qs) return null
  if(!qs.redirect) return null
  
  let qsParamsFunction = typeof queryParams === "function"
  // let redirectPath = createRedirectPath(qs.redirect, qsParamsFunction ? undefined : queryParams)

  if(qsParamsFunction){
      queryParams(qs.redirect, (toRedirectUrl)=>{ 
        if(toRedirectUrl){
          history.push(toRedirectUrl)  
        }
      }) 
  } else{ 
    
    console.log("redirect")
    // redirect(history, queryParams)
    // if(redirectPath){
    //   history.push(redirectPath)  
    // }
  }
  
  
  
}

export default redirect