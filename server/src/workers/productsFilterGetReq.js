const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const dbConnect = require("../database/db");
const {ObjectId} = require("mongodb");
const {type} = require("os");


if (isMainThread) {
  module.exports = (req)=>{
    return new Promise((resolve, reject) => {
      // This re-loads the current file inside a Worker instance.
      const worker = new Worker(__filename, {
        workerData: req,
      });
      // port1.postMessage('Hello world!');
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
  
} else {
  
  (async function (req){
    
    let client;
    
    try{
  
      const { c: ProductCollection, client: cc } = await dbConnect("products")
      client = cc
  
      let query = req.query
      let { pagePage, perPage, ...other } = query
      
      let cursor;
  
      if(other.sold){
        cursor = ProductCollection.aggregate([
          { $sort: { sold: Number(other.sold) } },
          { $limit: 20 }
        ])
      } else if(other.discount){
        cursor = ProductCollection.aggregate([
          { $sort: { discount: Number(other.discount) } },
          { $limit: 20 }
        ])
      } else if(other.views){
        cursor = ProductCollection.aggregate([
          { $sort: { views: Number(other.views) } },
          { $limit: 20 }
        ])
      } else if(other.updated_at){
        cursor = ProductCollection.aggregate([
          { $sort: { updated_at: Number(other.updated_at) } },
          { $limit: 20 }
        ])
      }
      let p = []
      await cursor.forEach(c=>{
        p.push(c)
      })
  
  
      
      client?.close()
      parentPort.postMessage(JSON.stringify(p));
      parentPort.close()
      process.exit(0);
      
    } catch(ex){
    
    } finally{
      client?.close()
    }
    
  }(workerData))
  
}