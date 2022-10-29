import * as mongoDB from "mongodb";
import {MongoClient} from "mongodb";


const mongoClient = new MongoClient(process.env.DB_CONN_STRING as string);
const clientPromise = mongoClient.connect();


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
export async function initialMongodbIndexes () {
    
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

    return new Promise((async (resolve, reject) => {
        try {
            let client  = (await clientPromise)

            let db = client.db(process.env.DB_NAME);
            
            COLLECTIONS_NAME.forEach((colItem)=>{
                let collection =  db.collection(colItem.name)
                let indexes = colItem.model.indexes;
                for (let indexesKey in indexes) {
                    collection.createIndex( [indexesKey], indexes[indexesKey] as any, (a)=>{
                        if(a){
                            console.log(a.message)
                        } else {
                            console.log(`${colItem.name} collection indexed completed`)
                        }
                    })
                }
            })
        } catch (ex: any){
            console.log(ex.message)
        }
    }))

}
