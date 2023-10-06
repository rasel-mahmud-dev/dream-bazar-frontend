import {ObjectId} from "mongodb";
import {Roles} from "../types";
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../config/env";

const JwtService = {
    createToken(_id: string | ObjectId, email: string, roles: Roles[]) {
        let token = jwt.sign({
                _id: _id,
                email: email,
                roles: roles
            },
            JWT_SECRET, {expiresIn: '5h'}
        );

        return token
    },

    parseToken(token: string, cb: any) {
        jwt.verify(token, JWT_SECRET, (err: any, d: any) => {
            if (err) {
                return cb(err, null)
            }
            cb(null, d)
        });

    },

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

    getToken(req: Request) {
        return req.headers["authorization"]

    },

    isValid() {

    }
}

export default JwtService