import * as mongoDB from "mongodb";




import {MongoClient} from "mongodb";

console.log("ASDDDDDDDDDDDDDDD")

import Base from "../../models/Base";

// interface Model {
//     users?: mongoDB.Collection,
//     products?: mongoDB.Collection
// }

// export const collections: Model = {}




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
export async function initialConnectionMongodb () {
    
    const Product = require( "../../models/Product");
    const User = require( "../../models/User");
    const Seller = require( "../../models/Seller");
    const Shop = require( "../../models/Shop");
    const Brand = require( "../../models/Shop");
    const Category = require( "../../models/Shop");
    const Review = require( "../../models/Review");
    
    const COLLECTIONS_NAME = [
        {name: "users", model: User},
        {name: "products", model: Product},
        {name: "sellers", model: Seller},
        {name: "shops", model: Shop},
        {name: "products", model: Product},
        {name: "categorise", model: Category},
        {name: "brands", model: Brand},
        {name: "reviews", model: Review},
    ]
    try{
        return new Promise<mongoDB.MongoClient>((async (resolve, reject) => {
            try {
                let client  = (await clientPromise)

                let db = client.db(process.env.DB_NAME);

                COLLECTIONS_NAME.forEach((colItem)=>{
                    let collection =  db.collection(colItem.name)
                    let indexes = colItem.model.indexes;
                    for (let indexesKey in indexes) {
                        collection.createIndex( [indexesKey], indexes[indexesKey] as any)
                        console.log(`${colItem.name} collection indexed completed`)
                    }
                })
                resolve(client)
            } catch (ex){
                reject(ex)
            }
        }))

    } catch (ex){
        console.log(ex)
    }
}
