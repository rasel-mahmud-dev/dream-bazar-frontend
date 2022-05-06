const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const dbConnect = require("../database/db");


if (isMainThread) {
  module.exports = ()=>{
    return new Promise((resolve, reject) => {
      // This re-loads the current file inside a Worker instance.
      const worker = new Worker(__filename, {
        workerData: "",
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
  (async function (){
    let client;
    try{
      const {c: brandCollection, client: cc } = await dbConnect("brands")
      client = cc
    
      const cursor = brandCollection.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "for_category",
            foreignField: "_id",
            as: "for_categories"
          }
        },
        // { $skip: perPage * (pageNumber - 1) },
        // { $limit: Number(perPage) },
        {
          $project: {
            name: 1,
            logo: 1,
            created_at: 1,
            updated_at: 1,
            for_category: 1,
            for_categories: {
              _id: 1,
              name: 1,
              logo: 1,
            },
          }
        }
      ])
    
      let brands = []
      await cursor.forEach(brand=>{
        if(brand){
          brands.push(brand)
        }
      })
  
      parentPort.postMessage(JSON.stringify(brands));
      parentPort.close()
      process.exit(0);
      // res.status(200).json({brands: brands, ms: s})
    
    } catch(ex){
      process.exit(1);
      console.log(ex)
    } finally{
      client?.close()
    }
    
  }())
  
}