

import {backend} from "src/apis"

function fullLink(filePath: string){
  if(import.meta.env.DEV) {
    return backend + "/" + filePath
  } else {
    return filePath
  }
}

export default fullLink;