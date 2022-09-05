import express, {Request, Response } from "express";


import mongoose from "mongoose";

const serverless = require("serverless-http")

const bodyParser = require("body-parser")
const cors = require("cors")
const {readdir} = require("fs/promises")
const passport = require('passport');

require('dotenv').config()

const isDev = process.env.NODE_ENV === "development"

// import dbConnect from "./database";

// // passport config initial...
// require('./passport/google.js')
// require('./passport/facebook.js')

import dataDir from "../src/utilities/dataDir";
import {connectToDatabase} from "../src/services/database.service";

const app = express()

app.use(express.static(`${dataDir}/public`))
app.use("/upload/", express.static(`${dataDir}/upload/`))
app.use("/static/upload/", express.static(`${dataDir}/upload/`))
app.use("/images/", express.static(`${dataDir}/images/`))
app.use("/ui-data/", express.static(`${dataDir}/ui-data/`))




// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET'
// }));

const allowedOrigin = ["http://localhost:4000", "http://localhost:3000"]

app.use(cors())

// app.use(cors({
//   origin: (origin, cb)=>{
//     if(allowedOrigin.indexOf(origin) !== -1){
//       cb(null, true)
//     } else{
//       cb(new Error("You are Blocked"))
//     }
//   }
// }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// const db = require("./db.json")

const router = express.Router();


if(isDev) {
    let initialRoutes  = require("../src/routes")
    initialRoutes(router)
} else {
    let initialRoutes  = require("../dist/routes")
    initialRoutes(router)
}

// database connection init
connectToDatabase().then(res=>{}).catch(ex=>{
    console.log(ex.message)
    process.exit(1)
})

// app.use((req, res, next)=>{
//     console.log(req.url, req.method);
//     next()
// })


passport.initialize()
// app.use(passport.session());


// app.get("/api/static-file", (req, res)=>{
//     readdir('upload').then(doc=>{
//         // console.log(doc)
//         res.send(doc)
//     })
// })


// // error handler
// app.use((err, req, res, next)=>{
//     res.status(err.status || 500).json({
//         status: err.status || 500,
//         message: err.message || "Internal server error"
//     })
// })



app.use('/.netlify/functions/app', router);  // path must route to lambda


module.exports = app;
module.exports.handler = serverless(app);

