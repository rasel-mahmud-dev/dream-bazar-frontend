import {NextFunction, Request, Response} from "express";

import {errorResponse, successResponse} from "../response";
import fs from "fs";
import staticDir from "../utilities/staticDir";



export const getAllStaticFiles = async (req: Request, res: Response, next: NextFunction) => {
    let data = fs.readdirSync(staticDir)
    res.send(data)
}
