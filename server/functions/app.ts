

const express = require('express');
const serverless = require('serverless-http');

// const app = express();
// const cors = require("cors")
// const bodyParser = require('body-parser');
//
//
// require("dotenv").config()
//
// app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
//
// app.use(cors())

import app from "../src/app/app";
import routes from "../src/routes";

const router = express.Router();

router.use(routes)

router.get("/api",( req, res)=>{
	res.send("hi")
})


app.use('/.netlify/functions/app', router);  // path must route to lambda


module.exports = app;
module.exports.handler = serverless(app);