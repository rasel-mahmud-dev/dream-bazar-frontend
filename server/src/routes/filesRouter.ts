

import {Router} from "express";
import {getAllStaticFiles} from "../controllers/filesController";


export default function (app: Router){
    app.get("/api/files/static-files", getAllStaticFiles)
}