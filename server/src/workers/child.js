const dbConnect = require("../database/db");
const {parentPort} = require("worker_threads");

function fibonacci(num) {
  if (num <= 1) return num;
  return fibonacci(num - 1) + fibonacci(num - 2);
}


process.on('message', async (req) => {
  
  console.log(req)
  
  let client;
  try {
    let {c: Collection, client: cc} = await dbConnect("products")
    client = cc
    let c = Collection.find().limit(10)
    let pp = []
    await c.forEach(p => {
      pp.push(p)
    })
    client?.close()
  
    process.send(JSON.stringify(pp));
    process.exit(0);
  } catch (ex){
  
  } finally {
    client?.close()
  }
});