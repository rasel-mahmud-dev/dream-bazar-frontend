import {Request} from "express";
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../config/env";

export interface JwtTokenPayload {
    id: string,
    roles: string[]
}

const JwtService = {
    createToken(data: JwtTokenPayload) {
        return jwt.sign(data,
            JWT_SECRET, {expiresIn: '5h'}
        )
    },

    parseToken(token: string) {
        return new Promise<JwtTokenPayload | null>(async (resolve, reject) => {
            try {
                let decoded = jwt.verify(token, JWT_SECRET) as JwtTokenPayload;
                if (typeof decoded !== "object") return reject(null)
                return resolve(decoded as JwtTokenPayload)
            } catch (ex) {
                reject(null)
            }
        })
    },

    getToken(req: Request) {
        let au = req.headers["authorization"]
        let token = ""
        if (au && typeof au === "string") {
            token = au.split(" ")?.[1] ?? ""
        }
        return token
    },

    isValid() {

    }
}

export default JwtService