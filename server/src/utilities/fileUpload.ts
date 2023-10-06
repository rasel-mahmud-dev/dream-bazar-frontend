
import { copyFile, mkdir, rm, stat } from 'fs/promises';
import fs, {cpSync} from "fs"

import {Request, Response} from "express"




// function fileUpload(req: Request, filePath: string, fieldName: string, callback: (err: any, obj: ResultType)=>any){
//   const uploadDir = filePath
//
//   fs.stat(uploadDir, (err)=>{
//     if(err){
//         mkdir(uploadDir).then(()=>{
//           // continue
//           fileUploadHandler(req, uploadDir, fieldName, callback)
//         })
//     } else {
//           // continue
//         fileUploadHandler(req, uploadDir, fieldName, callback)
//       }
//     })
// }

const formidable = require("formidable");
const { rename } = require("fs/promises");
const path = require("path")



const fileUpload = (req: Request, imageName: string)=> {
  const form = formidable({ multiples: false });

  return new Promise<{err: string | null, fields?: object, file: any, fileName: string  }>(((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject({err: err, fields: "", file: ""})
      } else {
        if(files && files[imageName]){
          const {filepath, originalFilename, newFilename } = files[imageName]
          let newName = filepath.replace(newFilename, "/"  +originalFilename )
            cpSync(filepath, newName)
          resolve({err: null, fields, file: path.resolve(newName), fileName: originalFilename})
        } else {
          resolve({err: null, fields, file: null, fileName: ""})
        }
      }
    });
  }))
}




interface ResultType{
  fields?: any,
  files?: any
}

function fileUploadHandler(req: Request, uploadDir: string, fieldName: string, callback: (err: any, obj: ResultType)=>any){
  
    const form = formidable({multiples: true})
    form.parse(req, async (err, fields, files)=>{
      if(err){
        callback(err, {})
        return 
      }
      
      
      if(Object.keys(files).length > 0){
        
        if(Array.isArray(files[fieldName])){
    
          let newFiles: any = []
          let len = files[fieldName].length
          
          files[fieldName].map(async (file, i)=>{  
            // item = (i + 1)
            let newPath = uploadDir+"/"+file.name
            await copyFile(file.path, newPath)
            newFiles.push({
              name: file.name,
              path: newPath
            })
            if(newFiles.length >= 2){
              callback(false, {fields, files: { [fieldName]: newFiles} })            
            }  
            fs.rm(file.path, (err)=>{})
            
          })
        } else{
          let newPath = uploadDir+"/"+files[fieldName].name 
          await copyFile(files[fieldName].path, newPath)
          let file = {
            name: files[fieldName].name,
            path: newPath
          }
          callback(false, {fields, files: { [fieldName]: [file] }})
          fs.rm(files[fieldName].path, (err)=>{})
        }
      
      } else {
        
        callback(false, {fields, files: false })
      }
      
    })
  }


export default fileUpload

