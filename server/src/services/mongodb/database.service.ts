import * as mongoDB from "mongodb";
import Product from "../../models/Product";
import User from "../../models/User";


export const collections: {
    users?: mongoDB.Collection,
    products?: mongoDB.Collection
    // brands?: mongoDB.Collection
} = {}


const COLLECTIONS_NAME = [
    {name: "users", model: User},
    {name: "products", model: Product}
]

export let db: mongoDB.Db

export async function connectToDatabase () {

   try{
       const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

       await client.connect();

       db = client.db(process.env.DB_NAME);

       COLLECTIONS_NAME.forEach((colItem)=>{
           let collection =  db.collection(colItem.name)
           collections[colItem.name] = collection
           let indexes = colItem.model.indexes;

           for (let indexesKey in indexes) {
               collection.createIndex( [indexesKey], indexes[indexesKey] as any)
           }
       })

       console.log(`Successfully connected to database: ${db.databaseName}`);

   } catch (ex){
       console.log(ex)
   }
}