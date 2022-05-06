// import {createClient} from "redis";
//
// const { MongoClient} = require("mongodb")
// const uri = "mongodb://localhost:27017"
//
//
// function dbConnect(collectionName){
//
//   const client = new MongoClient(process.env.DB_CONN_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//
//   return new Promise(async (resolve, reject) => {
//     try {
//       await client.connect()
//       const db = client.db(process.env.DB_NAME);
// 			console.log("database connected js...")
//       if(collectionName){
//         resolve({c:  db.collection(collectionName), client: client})
//       } else {
//         resolve({db: db, client: client})
//       }
//
//     } catch (ex){
// 			console.log(ex.message)
//       // here we can call reject cb
//       reject(new Error(ex))
//     }
//   })
//
// }
// // export function redisConnect(){
// //   return new Promise( async (resolve, reject)=>{
// //     // const client = createClient({
// //     //   url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPOINT}:${process.env.REDIS_PORT}`
// //     // });
// //
// //     const client = createClient();
// //
// //     client.on('error', (err) => console.log('Redis Client Error', err));
// //
// //     await client.connect();
// //     resolve(client)
// //
// //   })
// // }
//
// // async function index(res, n, cb){
//
// //   const client = new MongoClient(uri, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// //   })
//
// //   try {
//
// //     await client.connect()
// //     const db = client.db('node-ecommerce');
// //     let c  = db.collection(n).find()
// //     let b = []
//
// //     await c.forEach(v=>{
// //       b.push(v)
// //     })
//
// //     if(cb){
// //       cb(null, b)
// //     }
//
// //     client?.close()
//
//
// //   } catch (ex){
// //     console.log(ex.message);
//
// //     client?.close()
// //     cb && cb(ex.message, null)
// //     // here we can call reject cb
// //     // reject(new Error(ex))
// //   }
//
//
//   // return new Promise(async (resolve, reject) => {
//   //   try {
//   //     await client.connect()
//   //     const db = client.db('node-ecommerce');
//
//   //     if(collectionName){
//   //       resolve({client: client, c: db.collection(collectionName) })
//   //     } else {
//   //       resolve({client: client, db: client.db("node-ecommerce")})
//   //     }
//
//   //   } catch (ex){
//   //     // here we can call reject cb
//   //     reject(new Error(ex))
//   //   }
//   // })
//
// // }
//
// module.exports = dbConnect
// export function redisConnect(){
//   return new Promise( async (resolve, reject)=>{
//     // const client = createClient({
//     //   url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPOINT}:${process.env.REDIS_PORT}`
//     // });
//
//     const client = createClient({});
//
//     await client.on('error', (err) => console.log('Redis Client Error', err));
//
//     await client.connect();
//     resolve(client)
//
//   })
// }
//
//
