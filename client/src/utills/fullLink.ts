

import {backend} from "src/apis"

function fullLink(filePath: string){

  if(import.meta.env.DEV){
    let a = filePath.indexOf("/img/")
    return backend  + filePath.slice(a)
  } else {
    if (filePath && typeof filePath === "string" && filePath.startsWith("http")) {
      return filePath
    }
    return backend + "/" + filePath
  }
}


export default fullLink;