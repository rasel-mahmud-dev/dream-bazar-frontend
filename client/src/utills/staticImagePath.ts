

const staticImagePath = (fileName: string)=>{
    if(import.meta.env.DEV){
        return "/static/"  + fileName
    } else {
        if(fileName.startsWith("http")){
            return fileName
        } else {
            return "/static/" + fileName
        }
    }
}

export default staticImagePath

