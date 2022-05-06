import * as mongoDB from "mongodb"
import {Collection, MongoClient, ObjectId} from "mongodb"
import dbConnect from "../database";


interface TT{
  collection?: mongoDB.Collection,
  client: mongoDB.MongoClient
}


class Base {
  
  // getCollection with Static Method............
  protected client: MongoClient;
  protected collection: Collection;
  
  static collectionName: string
  
  constructor(collectionName: string) {
    Base.collectionName = collectionName
  }
  
  static getCollection(collectionName?: string){
    return new Promise<{collection: mongoDB.Collection, client: mongoDB.MongoClient}>(async (resolve, reject)=>{
      try {
        let {c, client} = await dbConnect(collectionName ? collectionName : Base.collectionName)
        resolve({collection: c, client: client})
      } catch (ex){
        reject({collection: undefined, client: undefined})
      }
    })
  }

  static async dbConnect(collectionName: string){
    return new Promise<TT>(async (resolve, reject)=>{
      try {
        let { c, client} = await dbConnect(collectionName)
          resolve({collection: c, client: client})
        } catch (ex){
          reject(ex)
        }
      })
  }
  
  async dbConnect(){
    try {
      let { c, client} = await dbConnect("products")
      this.client = client
      this.collection = c

    } catch (ex){
      console.log(ex)
    }
  }
  
  static insertInto(values){
    return new Promise<mongoDB.InsertOneResult>(async (resolve, reject)=>{
      let client;
      try {
        
        let {collection, client: cc} = await Base.dbConnect(this.collectionName)
        client = cc
        if(values) {
          let {_id, ...other} = values
          let cursor = await collection?.insertOne({
            ...other,
            created_at: new Date(),
            updated_at: new Date()
          })
          
          resolve(cursor)
        }
        // console.log(cursor, other)
        client?.close()
        
      } catch (ex){
        client?.close()
        reject(new Error(ex.message))
      } finally {
        client?.close()
      }
    })
  }
  static update(values){
    return new Promise(async (resolve, reject)=> {
      let client;
      try {
        let {collection, client: cc} = await Base.dbConnect(Base.collectionName)
        client = cc
        let {_id, ...other} = values
        let cursor = await collection?.findOneAndUpdate({_id: new ObjectId(_id)},
          {  $set: {
              ...other,
              updated_at: new Date()
          }})
        resolve(cursor)
      } catch (ex){
      
      } finally {
        client?.close()
      }
    })
  }
  static deleteById(id: string){

      return new Promise<mongoDB.DeleteResult>(async (resolve, reject)=> {
        if(id){
          let client;
          try {
            let {collection, client: cc} = await Base.dbConnect(this.collectionName)
            client = cc
            let doc = await collection.deleteOne({_id: new ObjectId(id)})
            resolve(doc)
          } catch (ex) {
            reject(new Error(ex.message))
          } finally {
            client?.close()
          }
        } else {
          reject(new Error("please provide id"))
        }
      })
    
  }
  static findOne(attr={}){
    
    // new this("")
    return new Promise(async (resolve, reject)=>{
      let client;
      try{
        let { collection, client: cc } = await Base.dbConnect(this.collectionName)
        client = cc
        let doc = await collection.findOne(attr)
        resolve(doc)
      } catch (ex){
        reject(new Error(ex.message))
      } finally {
        client?.close()
      }
    })
  }
  static find(attribute){
    return new Promise(async (resolve, reject)=>{
      let client;
      try {
        let { collection, client: cc } = await Base.dbConnect(this.collectionName)
        client = cc
        let attr = {}
        if (attribute){
          attr = attribute
        }
        let cursor = collection?.find(attr)
        let products = []
        await cursor.forEach(p=>{
          products.push(p)
        })
        resolve(products)
        client?.close()
        
      } catch (ex){
        reject(new Error(ex.message))
      }
      finally {
        client?.close()
      }
    })
  }
  static aggregate(pipeline: any){
    return new Promise(async (resolve, reject)=>{
      let client;
      try {
        let { collection, client: cc } = await Base.dbConnect(this.collectionName)
        client = cc
        let cursor = collection?.aggregate(pipeline)
        let products = []
        await cursor.forEach(p=>{
          products.push(p)
        })
        resolve(products)
        client?.close()
        
      } catch (ex){
        reject(new Error(ex))
      }
      finally {
        client?.close()
      }
    })
  }
}

export  default Base