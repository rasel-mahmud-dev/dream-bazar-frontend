
const { v2: cloudinary} = require("cloudinary");

export const cloudinaryHandler = ()=>{
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });
  
  return cloudinary
}


export const uploadImage = (imagePath: string, options?: {dir?: string, fieldName?: string, overwrite?: boolean})=>{
  return new Promise<{secure_url: string} | null>(async (resolve)=>{
    try{
      let s = await cloudinaryHandler().uploader.upload(
        imagePath,
        {
          use_filename: true,
          unique_filename: false,
          folder: options?.dir ? options.dir : "",
          overwrite: options?.overwrite ? options.overwrite : false
        })
      resolve({...s, fieldName: options?.fieldName})
    } catch (ex: any){
      resolve(null)
    }
  })
  
}


export default cloudinaryHandler