import formidable from 'formidable';
import { copyFile, mkdir, rm, stat } from 'fs/promises';
import fs from "fs"

import {Request, Response} from "express"









function fileUpload(req: Request, filePath: string, fieldName: string, callback: (err: any, obj: ResultType)=>any){
  const uploadDir = filePath
  
  fs.stat(uploadDir, (err)=>{
    if(err){
        mkdir(uploadDir).then(()=>{
          // continue
          fileUploadHandler(req, uploadDir, fieldName, callback)
        })
    } else {
          // continue
        fileUploadHandler(req, uploadDir, fieldName, callback)
      }
    })
  
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
    
          let newFiles = [] 
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

