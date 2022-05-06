const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const {readdir} = require("fs/promises");


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
  
    try {
      let images = ["jpg", "jpeg", "png"]
      let staticDir = "src/static"
      let d = []
      let files = []
      let dirs = await readdir(staticDir)
      for (const dir of dirs) {
        let dirNestedDir = await readdir(`${staticDir}/${dir}`)
        // console.log(dirNestedDir)
      
        dirNestedDir && dirNestedDir.map(async (item)=>{
          // let stats =  await lstat(`static/${dir}/${item}`)
          let i = item.lastIndexOf(".")
          if (i !== -1 && i !== 0) {
            let ext = item.slice(i+1) // remove dot
            if(images.indexOf(ext) !== -1) {
              files.push({path: `${dir}`, name: item})
            }
          } else {
          
            // if(stats.isDirectory()) {
          
            // it is directory.........
            let dirPath =  `${staticDir}/${dir}/${item}`
          
            let dirNestedDir2 = await readdir(dirPath)
          
            let fi = []
            dirNestedDir2 && dirNestedDir2.map(file2=>{
              fi.push({path: `${dir}/${item}`, name: file2})
            })
            files.push(...fi)
          }
          // }
        })
        d.push(dirNestedDir)
      }
  
      parentPort.postMessage(JSON.stringify(files));
      parentPort.close()
      process.exit(0);
    
    } catch (ex){
      console.log(ex)
    }
    
    
  }())
  
}