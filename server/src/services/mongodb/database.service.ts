import * as mongoDB from "mongodb";
import {Db, MongoClient} from "mongodb";


import dotenv from "dotenv";
dotenv.config();

const DB_CONN_STRING = process.env.DB_CONN_STRING || "mongodb://mongodb:27017/dream-bazar";
const DB_NAME = process.env.DB_NAME || "dream-bazar";

let mongoClient: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;
let database: Db;

function getClientPromise(): Promise<MongoClient> {
    if (!clientPromise) {
        mongoClient = new MongoClient(process.env.DB_CONN_STRING || DB_CONN_STRING);
        clientPromise = mongoClient.connect().catch((err) => {
            clientPromise = null;
            throw err;
        });
    }
    return clientPromise;
}

export async function mongoConnect() {
    return new Promise<mongoDB.Db>((async (resolve, reject) => {
        try {
            if (!database) {
                const client = await getClientPromise();
                database = client.db(process.env.DB_NAME || DB_NAME);
            }
            resolve(database);
        } catch (ex) {
            reject(ex);
        }
    }));
}


// for initial database connection and create indexes
export async function initialMongodbIndexes() {
    // const Product = require("../../models/Product");
    // const User = require("../../models/User");
    // const Shop = require("../../models/Shop");
    // const Brand = require("../../models/Brand");
    // const Category = require("../../models/Category");
    // const Review = require("../../models/Review");
    // const Attributes = require("../../models/Attributes");
    // const ProductDescription = require("../../models/ProductDescription");
    // const Role = require("../../models/Role");
    //
    // const COLLECTIONS = [
    //     User,
    //     Product,
    //     Shop,
    //     Product,
    //     Category,
    //     Brand,
    //     Review,
    //     Attributes,
    //     ProductDescription,
    //     Role
    // ]
    //
    // return new Promise((async () => {
    //     try {
    //         let client = (await clientPromise)
    //
    //         let db = client.db(DB_NAME);
    //
    //         COLLECTIONS.forEach((colItem) => {
    //             let collection = db.collection(colItem.collectionName)
    //             let indexes = colItem.indexes;
    //             if (!indexes) return;
    //             for (let indexesKey in indexes) {
    //                 collection.createIndex([indexesKey], indexes[indexesKey] as any, (a) => {
    //                     if (a) {
    //                         console.log(a.message)
    //                     } else {
    //                         console.log(`${colItem.name} collection indexed completed`)
    //                     }
    //                 })
    //             }
    //         })
    //     } catch (ex: any) {
    //         console.log(ex.message)
    //     }
    // }))
    
}


