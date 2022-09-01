import * as mongoDB from "mongodb"

// import { createClient} from 'redis';

const isDev = process.env.NODE_ENV === "development"
import {MongoClient} from "mongodb";

export const typeOrmConfig: any = {
  DB_CONN_STRING: isDev ? "mongodb://127.0.0.1:27017/node-ecommerce"
      : process.env.MONGODB_URL,
  REDIS_ENDPOINT: process.env.REDIS_ENDPOINT,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
}

interface T{
  c?: mongoDB.Collection,
  db?: mongoDB.Db,
  client: mongoDB.MongoClient
}
//
// // mongo --port 27017  --authenticationDatabase  "admin" -u "myUserAdmin" -p

function dbConnect(collectionName?: string){

  let client = new MongoClient(typeOrmConfig.DB_CONN_STRING)

  return new Promise<T>(async (resolve, reject) => {
    try {
      await client.connect()
      const db = client.db();
      // const db = client.db(typeOrmConfig.DB_NAME);
      console.log("database connected...")
      if(collectionName){
        resolve({c: db.collection(collectionName), client: client})
      } else {
        resolve({db: db, client: client})
      }
    } catch (ex){
      console.log(ex.message)
      reject(new Error(ex))
    }
  })
}

// export function redisConnect(){
//   return new Promise( async (resolve, reject)=>{
//     const client = createClient({
//       url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPOINT}:${process.env.REDIS_PORT}`
//     });
//
//     // const client = createClient({});
//
//     client.on('error', (err) => console.log('Redis Client Error', err));
//
//     await client.connect();
//     resolve(client)
//
//   })
// }
//
//
export default dbConnect
//
