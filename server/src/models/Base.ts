import * as mongoDB from "mongodb";
import {Collection, ObjectId} from "mongodb";
import {mongoConnect} from "../services/mongodb/database.service";

class Base {

    static collectionName: string;
    constructor(collectionName: string) {
        Base.collectionName = collectionName;
    }
    save<T>() {
        return new Promise<T | null>(async (resolve, reject) => {
            try {
                let database = await mongoConnect();
                let collection = await database.collection(Base.collectionName);
                
                let {...other}  = this;
                let doc = await collection?.insertOne({
                    ...other,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                
                if(doc.insertedId){
                    (other as any)._id = doc.insertedId
                    resolve(other as T)
                } else {
                    resolve(null);
                }
            } catch (ex) {
                reject(ex);
            }
        });
    }
    updateOne<T>(id: string, update: Partial<mongoDB.Document> | mongoDB.UpdateFilter<mongoDB.Document>) {
        return new Promise<T | null>(async (resolve, reject) => {
            try {
                let database = await mongoConnect();
                let collection = await database.collection(Base.collectionName);
                
                let {...other}  = this;
                let doc = await collection?.updateOne({_id: new ObjectId(id)},update);
                if(doc){
                    (other as any)._id = id
                    resolve(other as T)
                } else {
                    resolve(null);
                }
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

export default Base