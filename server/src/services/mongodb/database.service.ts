import * as mongoDB from "mongodb";
// import Product from "../../models/Product";
// import User from "../../models/User";
import {MongoClient} from "mongodb";


// interface Model {
//     users?: mongoDB.Collection,
//     products?: mongoDB.Collection
// }

// export const collections: Model = {}

//
// const COLLECTIONS_NAME = [
//     {name: "users", model: User},
//     {name: "products", model: Product}
// ]

// export let db: mongoDB.Db

// export async function connectToDatabase () {
//
//    try{
//        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
//
//        await client.connect();
//
//        db = client.db(process.env.DB_NAME);
//
//        COLLECTIONS_NAME.forEach((colItem)=>{
//            let collection =  db.collection(colItem.name)
//            collections[colItem.name] = collection
//            let indexes = colItem.model.indexes;
//
//            for (let indexesKey in indexes) {
//                collection.createIndex( [indexesKey], indexes[indexesKey] as any)
//            }
//        })
//
//        console.log(`Successfully connected to database: ${db.databaseName}`);
//
//    } catch (ex){
//        console.log(ex)
//    }
// }


const mongoClient = new MongoClient(process.env.DB_CONN_STRING as string);
const clientPromise = mongoClient.connect();

// interface Database extends mongoDB.Db {
//     model?: Model
// }

export async function mongoConnect(){
    return new Promise<mongoDB.Db>((async (resolve, reject) => {
        try {
            let database  = (await clientPromise).db(process.env.DB_NAME);

            // COLLECTIONS_NAME.forEach((colItem)=>{
            //     let collection =  database.collection(colItem.name)
            //     collections[colItem.name] = collection
            //     let indexes = colItem.model.indexes;
            //
            //     for (let indexesKey in indexes) {
            //         collection.createIndex( [indexesKey], indexes[indexesKey] as any)
            //     }
            // })

            // database["model"] = collections
            resolve(database)
        } catch (ex){
            reject(ex)
        }
    }))

}


// for initial database connection and create indexes
// export async function initialConnectionMongodb () {
//     try{
//         return new Promise<mongoDB.MongoClient>((async (resolve, reject) => {
//             try {
//                 let client  = (await clientPromise)
//
//                 let db = client.db(process.env.DB_NAME);
//
//                 COLLECTIONS_NAME.forEach((colItem)=>{
//                     let collection =  db.collection(colItem.name)
//
//                     // collections[colItem.name] = collection
//
//                     let indexes = colItem.model.indexes;
//
//                     for (let indexesKey in indexes) {
//                         collection.createIndex( [indexesKey], indexes[indexesKey] as any)
//                     }
//                 })
//
//                 // COLLECTIONS_NAME.forEach((colItem)=>{
//                 //     let collection =  database.collection(colItem.name)
//                 //     collections[colItem.name] = collection
//                 //     let indexes = colItem.model.indexes;
//                 //
//                 //     for (let indexesKey in indexes) {
//                 //         collection.createIndex( [indexesKey], indexes[indexesKey] as any)
//                 //     }
//                 // })
//
//                 // database["model"] = collections
//
//                 resolve(client)
//             } catch (ex){
//                 reject(ex)
//             }
//         }))
//
//     } catch (ex){
//         console.log(ex)
//     }
// }
