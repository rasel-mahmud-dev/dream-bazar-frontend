
const staticImagePath = (fileName: string)=>{
    let fullUrl =  ""

    if(fileName && fileName.startsWith("http")){
        fullUrl =  fileName
    } else {
        fullUrl = "/static/" + fileName
    }

    return fullUrl
}

export default staticImagePath

