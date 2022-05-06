import http from "http"
import {fork} from "child_process";
import path from "path";
import dbConnect from "./database";
import fs from "fs";



const getProducts = require("./workers/getProducts")
const insertProduct = require("./workers/insertProduct")

// const fibonacciWorker = require('./fibonacci-worker-2');
//
// let server = http.createServer(async (req, res)=>{
//
//   const url = new URL(req.url, `http://${req.headers.host}`)
//
//   if(url.pathname === "/"){
//     res.writeHead(200);
//     let html = path.join(__dirname, "index.html")
//     let h = fs.readFileSync(html)
//     return res.end(h);
//
//   } else if(url.pathname === "/api/heavy-task"){
//     let n = Number(url.searchParams.get("n"))
//     console.log('Calculating fibonacci for', n);
//
//     const childProcess = fork(path.join(__dirname, 'fibonacci-fork'));
//
//     childProcess.on('message', (message) => {
//       res.writeHead(200);
//       return res.end(`Result: ${message}`);
//     });
//
//     childProcess.send(n);
//
//     // let result = fibonacci(n)
//     // console.log(result)
//     //
//     // res.writeHead(200);
//     // return res.end(`Result: ${result}`);
//
//   } else if(url.pathname === "/api/heavy-task-2"){
//
//     let n = Number(url.searchParams.get("n"))
//     console.log('Calculating fibonacci for', n);
//
//     const result = await fibonacciWorker(n);
//
//     // let result = fibonacci(n)
//     // console.log(result)
//     //
//     res.writeHead(200);
//     return res.end(`Result: ${result}`);
//
//   }  else if(url.pathname === "/api/products"){
//
//     let result = await getProducts()
//     res.writeHead(200);
//     return res.end(JSON.stringify({count: result.length, products: result}));
//
//   } else  if(url.pathname === "/api/products-add"){
//
//     let products = []
//     let i = 0
//     while (i < 10000){
//       products.push({
//         title: "this is dummy post title " + Date.now(),
//         author_name: "Rasel Maamud",
//         price: 1000,
//         qty: 10,
//         created_at: Date.now(),
//         updated_at: Date.now(),
//       })
//       i++
//     }
//
//     let p = await insertProduct(products)
//
//
//     // insertProduct()
//
//     res.writeHead(200);
//
//     res.end(JSON.stringify(p));
//     console.log("res end")
//     return
//   }
// })
//
//
// server.listen(3001, ()=> console.log("server is running on port 3001"))
