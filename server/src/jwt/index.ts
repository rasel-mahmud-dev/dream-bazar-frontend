import {ObjectId} from "mongodb";
import {Roles} from "../types";

const jwt = require('jsonwebtoken')

export const createToken = (_id: string | ObjectId, email: string, roles: Roles[])=> {
 let token = jwt.sign({
      _id: _id,
      email: email,
     roles: roles
    }, 
    process.env.SECRET, { expiresIn: '5h' }
  );

  return token
}

export const parseToken = (token: string, cb: any)=> {
   jwt.verify(token, process.env.SECRET, (err: any, d: any)=>{
     if(err){
       return cb(err, null)
     }
     cb(null, d)
   });
         
}

// exports.parseToken = (token)=> {
//   return new Promise(async (resolve, reject)=>{
//       try{
//         let decoded = await jwt.verify(token, process.env.SECRET);
//         // verify a token symmetric
//         return resolve({data: decoded, err: false})
//       } catch(ex){
//         reject({data: null, err: ex})
//       }
//   })
// }


export const getToken = (req: Request)=> {
    // @ts-ignore
        let token = req.headers["authorization"]
        return token
        
}

export const isValid = ()=> {

}