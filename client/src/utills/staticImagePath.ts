
const staticImagePath = (fileName: string)=>{
    let fullUrl =  ""
    if(import.meta.env.DEV){
        if(fileName && fileName.startsWith("http")) {
            fullUrl = fileName;
        }else{
            fullUrl = "/static/" + fileName
        }
    } else {
        if(fileName && fileName.startsWith("http")){
            fullUrl =  fileName
        } else {
            fullUrl = "/static/" + fileName
        }
    }
    return fullUrl
}

export default staticImagePath

