
import bcryptjs from "bcryptjs";


export const createHash = (password: string)=>{
  return new Promise<[err: string | null, hash: string]>(async (resolve, reject)=>{
    try {
      let salt = await bcryptjs.genSalt(10);
      let hashedPass = await bcryptjs.hash(password, salt)
      resolve([ null, hashedPass])
    } catch (ex: any){
      resolve([ex.message,  ""])
    }
  })
}

export const hashCompare = (password: string, hashPassword: string)=>{
  return new Promise<boolean>(async (resolve, reject)=> {
    try {
      let m = await bcryptjs.compare(password, hashPassword)
      resolve(m)
    } catch (ex) {
      resolve(false)
    }
  })
}