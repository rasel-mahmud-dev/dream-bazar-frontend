import * as mongoDB from "mongodb";
import {Collection, ObjectId} from "mongodb";
import {mongoConnect} from "../services/mongodb/database.service";

interface TT {
    collection?: mongoDB.Collection;
    client: mongoDB.MongoClient;
}

class Base {
    // getCollection with Static Method............
    
    static collectionName: string;
    
    constructor(collectionName: string) {
        Base.collectionName = collectionName;
    }
    
    save() {
        return new Promise<mongoDB.InsertOneResult>(async (resolve, reject) => {
            try {
                let database = await mongoConnect();
                let collection = await database.collection(Base.collectionName);
                
                let {...other} = this;
                let cursor = await collection?.insertOne({
                    ...other,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                
                resolve(cursor);
            } catch (ex) {
                reject(ex);
            }
        });
    }
    
    static findOneAndUpdate(
        filter: mongoDB.Filter<mongoDB.Document>,
        values: any
    ) {
        return new Promise<mongoDB.ModifyResult<mongoDB.Document>>(
            async (resolve, reject) => {
                try {
                    let database = await mongoConnect();
                    
                    let {_id, ...other} = values;
                    let doc = await database
                    .collection(this.collectionName)
                    .findOneAndUpdate(filter, {
                        $set: {
                            ...other,
                            updatedAt: new Date(),
                        },
                    });
                    
                    resolve(doc);
                } catch (ex) {
                    reject(ex);
                }
            }
        );
    }
    
    static deleteById(id: string) {
        return new Promise<mongoDB.DeleteResult>(async (resolve, reject) => {
            if (!id) {
                return reject("please provide id");
            }
            
            try {
                let database = await mongoConnect();
                let doc = await database
                .collection(this.collectionName)
                .deleteOne({_id: new ObjectId(id)});
                resolve(doc);
            } catch (ex) {
                reject(ex);
            }
        });
    }
    
    static count() {
        return new Promise<number>(async (resolve, reject) => {
            try {
                let database = await mongoConnect();
                let doc = await database
                .collection(this.collectionName)
                .countDocuments();
                resolve(doc);
            } catch (ex) {
                reject(ex);
            }
        });
    }
    
    static collection() {
        return new Promise<Collection>(async (resolve, reject) => {
            try {
                let database = await mongoConnect();
                resolve(database.collection(this.collectionName));
            } catch (ex) {
                reject(ex);
            }
        });
    }
    
    static findOne<T>(filter?: mongoDB.Filter<mongoDB.Document>) {
        return new Promise<T>(async (resolve, reject) => {
            try {
                let database = await mongoConnect();
                let doc = (await database.collection(this.collectionName).findOne(filter ? filter : {})) as T;
                resolve(doc);
            } catch (ex) {
                reject(ex);
            }
        });
    }
    
    static find<T>(filter?: mongoDB.Filter<mongoDB.Document>) {
        return new Promise<T>(async (resolve, reject) => {
            try {
                let database = await mongoConnect();
                
                let docs = (await database
                .collection(this.collectionName)
                .find(filter ? filter : {})
                .toArray()) as T;
                resolve(docs);
            } catch (ex) {
                reject(ex);
            }
        });
    }
    
    static aggregate(pipeline: any) {
        return new Promise(async (resolve, reject) => {
            try {
                let database = await mongoConnect();
                let doc = (await database.collection(this.collectionName).aggregate(pipeline).toArray())
                resolve(doc)
                
            } catch (ex) {
                reject(ex)
            }
        })
    }
}

export default Base;
