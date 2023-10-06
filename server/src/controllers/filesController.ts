import {NextFunction, Request, Response} from "express";

import fs from "fs";
import path from "path";
import staticDir from "../utilities/staticDir";

export const getAllStaticFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = fs.readdirSync(staticDir)
        res.send(data)
    } catch (ex){
        res.send([])
    }
}
