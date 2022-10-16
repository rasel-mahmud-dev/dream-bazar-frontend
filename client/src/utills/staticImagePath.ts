import {staticOrigin} from "src/apis";


const staticImagePath = (fileName: string)=>{
    let fullUrl =  ""
    if(import.meta.env.DEV){
        fullUrl =  staticOrigin + "/"  + fileName
    } else {
        if(fileName.startsWith("http")){
            fullUrl =  fileName
        } else {
            fullUrl = "/static/" + fileName
        }
    }
    return fullUrl
}

export default staticImagePath

