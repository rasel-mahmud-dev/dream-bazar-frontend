import {NextFunction, Response} from "express";

export const errorResponse = (next: NextFunction, data: string | object, status=500)=>{
    next({
        message: data,
        status,
    })
}


export const successResponse = (res: Response, status = 200, data: string | object | any)=>{
    if(typeof data === "string"){
        res.status(status).json({message: data})
    } else{
        res.status(status).json(data)
    }
}





