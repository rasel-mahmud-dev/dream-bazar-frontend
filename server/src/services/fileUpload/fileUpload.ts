import {Request, Response} from "express"

const formidable = require("formidable");
const { rename } = require("fs/promises");

interface ResultType{
    fields?: any,
    files?: any
}

export function fileUpload(req: Request, callback: (err: any, obj: ResultType)=>any){
    const form = formidable({multiples: true})
    form.parse(req, async (err, fields, files)=>{
        if(err){
            callback(err, {})
            return
        }
        
        if(Object.keys(files).length > 0){
            let renamed = {}
            try{
                for (let filesKey in files) {
                    let newPath = files[filesKey].filepath.replace(files[filesKey].newFilename, files[filesKey].originalFilename)
                    await rename(files[filesKey].filepath, newPath)
                    renamed[filesKey] = newPath
                }
    
                callback(false, {fields, files: renamed })
            } catch (ex){
                callback(false, {fields, files: false })
            }
        } else {
            callback(false, {fields, files: false })
        }
    })
}


export default fileUpload

