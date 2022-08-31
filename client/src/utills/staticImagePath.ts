

const staticImagePath = (fileName: string)=>{
    if(import.meta.env.DEV){
        return "/src/assets/static/"  + fileName
    } else {
        return "/assets/static/"  + fileName
    }
}

export default staticImagePath

