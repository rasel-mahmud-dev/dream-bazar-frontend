import {NextFunction, Request, Response} from "express";

import {errorResponse, successResponse} from "../response";
import fs from "fs";
import staticDir from "../utilities/staticDir";
import path from "path";


export const getAllStaticFiles = async (req: Request, res: Response, next: NextFunction) => {
    let data = fs.readdirSync(staticDir)
    if(data && data.length){
        data.forEach(item=>{
            let a = path.resolve(staticDir+"/"+item)
            let d = fs.readdirSync(a)
            console.log(d)
            
        })
    }
}
