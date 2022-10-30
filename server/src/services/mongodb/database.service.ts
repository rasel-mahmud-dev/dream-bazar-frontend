import * as mongoDB from "mongodb";
import {MongoClient} from "mongodb";
import Attributes from "../../models/Attributes";


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
    const CategoryDetail = require( "../../models/CategoryDetail");
    const Review = require( "../../models/Review");
    const Attributes = require( "../../models/Attributes");
    
    const COLLECTIONS = [User, Product, Seller, Shop, Product, Category, Brand, Review, CategoryDetail,Attributes ]

    return new Promise((async () => {
        try {
            let client  = (await clientPromise)

            let db = client.db(process.env.DB_NAME);
    
            COLLECTIONS.forEach((colItem)=>{
                let collection =  db.collection(colItem.collectionName)
                let indexes = colItem.indexes;
                if(!indexes) return;
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
