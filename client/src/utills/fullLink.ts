

import {staticOrigin} from "src/apis"

function fullLink(filePath: string){
  if(filePath && typeof filePath === "string" && filePath.startsWith("http")){
    return filePath
  } 
  return staticOrigin + "/"+filePath
}


export default fullLink;