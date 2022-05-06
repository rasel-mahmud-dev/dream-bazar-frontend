const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const dbConnect = require("../database/db");


if (isMainThread) {
  module.exports =  (products)=>{
    return new Promise((resolve, reject) => {
      // This re-loads the current file inside a Worker instance.
      const worker = new Worker(__filename, {
        workerData: products,
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
    let { c: Collection, client } = await dbConnect("products2")
    let c = await Collection.insertMany(workerData)
    client?.close()
    parentPort.postMessage(c);
    process.exit(0);
  }())
  
  
}