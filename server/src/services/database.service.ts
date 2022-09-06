import * as mongoDB from "mongodb";

export const collections: {
    users?: mongoDB.Collection,
    products?: mongoDB.Collection
    brands?: mongoDB.Collection
} = {}

const COLLECTIONS_NAME = [
    "users",
    "products",
    "brands"
]

export let db: mongoDB.Db

export async function connectToDatabase () {

   try{
       const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

       await client.connect();

       db = client.db(process.env.DB_NAME);

       COLLECTIONS_NAME.forEach(collection=>{
           collections[collection] = db.collection(collection)

       })

       console.log(`Successfully connected to database: ${db.databaseName}`);

   } catch (ex){
       console.log(ex)
   }
}