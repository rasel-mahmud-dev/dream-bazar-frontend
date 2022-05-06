const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const dbConnect = require("../database/db");


if (isMainThread) {
  module.exports = (body)=>{
    
    return new Promise((resolve, reject) => {
      // This re-loads the current file inside a Worker instance.
      const worker = new Worker(__filename, {
        workerData: body,
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
    let { c: Collection, client } = await dbConnect("products")
    let c = Collection.find().limit(10)
    let pp = []
    await c.forEach(p=>{
      pp.push(p)
    })
    client?.close()
    parentPort.postMessage(JSON.stringify(pp));
    parentPort.close()
    process.exit(0);
    
  }())
  
}