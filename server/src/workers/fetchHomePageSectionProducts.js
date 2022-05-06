const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const dbConnect = require("../database/db");

if (isMainThread) {
  module.exports = (query)=>{
    return new Promise((resolve, reject) => {
      // This re-loads the current file inside a Worker instance.
      const worker = new Worker(__filename, {
        workerData: query,
      });
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
  // console.log('Inside Worker!');
  (async function (query){
  
    const { pageNumber=1, perPage=10, type } = query
  
    let client;
  
    try {
      const { c:ProductCollection, client: cc } = await dbConnect("products")
      client = cc
      // console.log(type)
      let cursor;
    
      if(type === "most-popular"){
        // sort by views and pick 5 to 10 frist item from database
        cursor = ProductCollection.aggregate([
          { $sort: {  views : -1 } },
          { $skip: perPage * (pageNumber - 1) },
          { $limit: Number(perPage) }
        ])
      
      } else if(type === "most-updated") {
        cursor = ProductCollection.aggregate([
          { $sort: { created_at : -1 } },
          { $skip: perPage * (pageNumber - 1) },
          { $limit: Number(perPage) }
        ])
      
      } else if(type === "top-selling") {
        cursor = ProductCollection.aggregate([
          { $sort: { sold: -1 } },
          { $skip: perPage * (pageNumber - 1) },
          { $limit: Number(perPage) }
        ])
      
      } else if(type === "top-views") {
        cursor = ProductCollection.aggregate([
          { $sort: { views : -1 } },
          { $skip: perPage * (pageNumber - 1) },
          { $limit: Number(perPage) }
        ])
      
      } else if (type === "top-views-length"){
        cursor = ProductCollection.aggregate([
          { $sort: { views: -1 }}, // sort deasce order,
          { $limit: 100 },  // choose 1 to 100 item
          {                 /// count document
            $group : {
              _id : null,
              count: { $sum: 1 }
            }
          }
        ])
      
        // let ppp = []
        // await cursor.forEach(p=>{
        //   ppp.push(p)
        // })
        // console.log(ppp)
        // return res.send(ppp[0])
      
      } else if (type === "top-selling-length"){
        // cursor = ProductCollection.aggregate([
        //   { $sort: { sold: -1 }}, // sort dease order,
        //   { $limit: 100 },      // choose 1 to 100 item
        //   {                     /// count document
        //     $group : {
        //       _id : null,
        //       count: { $sum: 1 }
        //     }
        //   }
        // ])
      
        // let ppp = []
        // await cursor.forEach(p=>{
        //   ppp.push(p)
        // })
        // console.log(ppp)
        // // return res.send(ppp[0])
        //
        // return
      }
  
     
    
      let pp = []
      await cursor.forEach(p=>{
        pp.push(p)
      })
      
      parentPort.postMessage(JSON.stringify(pp));
      parentPort.close()
      process.exit(0);
    
    } catch(ex){
      console.log(ex)
      next(ex)
    } finally{
      client?.close()
    }
    
    
  }(workerData))
  
}