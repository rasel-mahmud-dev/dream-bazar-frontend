import express, {NextFunction, Request, Response} from "express";
import  morgan from "morgan"

const bodyParser = require("body-parser")
const cors = require("cors");

const passport = require('passport');

require('dotenv').config()


import routes from "../routes"

import * as path from "path";
// import {initialConnectionMongodb} from "./services/mongodb/database.service";

// import dbConnect from "./database";

// passport config initial...
require('../passport/google')
// require('./passport/facebook.js')

// import dataDir from "../src/utilities/dataDir";
// import {connectToDatabase} from "../src/services/mongodb/database.service";
// import sqlDatabase from "../src/services/sqlite/database.service";


const app = express()
app.use(bodyParser.json());
app.use(morgan("dev"))
app.use(express.static(path.resolve('/public')));
app.use(express.static("public"))

const allowedOrigin = ["http://localhost:4000", "http://localhost:3000"]

const corsOptions = {
    origin: (origin: any[], cb: any)=>{
        if(allowedOrigin.indexOf(origin as any) !== -1){
            cb(null, true)
        } else{
            cb(null, true)
            // cb(new Error("You are Blocked"))
        }
    }
}

app.use(cors(process.env.NODE_ENV !== "development" ? corsOptions : {}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(passport.initialize())

// database connection init
// initialConnectionMongodb().then((_)=>{
//     console.log("database connected")
// }).catch(ex=>{
//     console.log("database connected fail")
//     console.log(ex.message)
//     process.exit(1)
// })


// // database sqlite database init
// sqlDatabase().then(res=>{}).catch(ex=>{
//     console.log(ex.message)
// })


app.use(routes)


// error handler
// use route for netlify serverless function
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(process.env.NODE_ENV === "development"){
        console.log(err)
    }
    if(typeof err === "string") {
        res.status(500).json({message: err})
    } else {
        res.status(err.status || 500).json({
            message: err.message || "Internal server error"
        })
    }
})


app.use(express.static(path.resolve('public')));

export default app;
module.exports  = app;
