import fileUpload from "../utilities/fileUpload";
import path from "path";
import {readdir, lstat, readFile} from 'fs/promises';
import {redisConnect} from "../database";
import {Stream} from "stream";
import {createReadStream} from "fs";

const getProducts = require("../workers/getProducts")
const productsFilter = require("../workers/productsFilter")

const { open, copyFile } =  require('fs/promises')

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.doc': 'application/msword',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/x-font-ttf',
};


export const getUiCategory = async (req, res, next)=>{

  // node js v16 implement
  let file;
  
  const filename = req.params.filename 
  let dataDir = path.resolve("src/static/ui-data", filename)

  try {
    let redis = await redisConnect()
    file = await open(dataDir, 'r')

    let data = await file.readFile({flag: "r"})
    if(filename === "categories.json"){
      let categories = JSON.parse(data.toString())
      for (const category of categories) {
        await redis.HSET("ui_categories", category.id, JSON.stringify(category))
      }
    }
    const ext = path.parse(dataDir).ext; 
    res.setHeader('Content-type', mimeType[ext] || 'text/plain');
    res.end(data); 
    

  } catch (error) {
    res.status(404).json({message: error.message})
  } finally{
    await file?.close()
  }
}

export const restoreUICategory = async (req, res, next)=>{
  // const { ui_category } = req.body
  // console.log(ui_category)
  
  let file;
  
  const filename = "categories.json"
  let dataDir = path.join(__dirname, "../", "src/static/ui-data", filename)
  
  try {
    let redis = await redisConnect()
    file = await open(dataDir, 'r')
    // console.log(dataDir)
    let stream = await file.createReadStream()
    stream.on("data", (chunk)=>{
      let st = chunk.toString()
      if(st){
        let arr = JSON.parse(st)
        for (const arrElement of arr) {
          (async function (){
            // @ts-ignore
            await redis.HSET("ui_categories", arrElement.id, JSON.stringify(arrElement))
          }())
        }
      }
    })
    
  } catch (ex){
    console.log(ex)
  }
  
}

export const restoreUICategoryInfo = async (req, res, next)=>{
  let file;
  const filename = "category-info.json"
  let dataDir = path.join(__dirname, "../", "static/ui-data", filename)
  
  try {
    let redis = await redisConnect()
    file = await open(dataDir, 'r')
    // console.log(dataDir)
    let stream = await file.createReadStream()
    stream.on("data", (chunk)=>{
      let st = chunk.toString()
      if(st){
        let arr = JSON.parse(st)
        for (const arrElement of arr) {
          (async function (){
            // @ts-ignore
            await redis.HSET("ui_category-info", arrElement.id, JSON.stringify(arrElement))
          }())
        }
      }
    })
    
  } catch (ex){
    console.log(ex)
  }
  
}

export const restoreUIFilterItems = async (req, res, next)=>{
  let file;
  const filename = "filter-items.json"
  let dataDir = path.join(__dirname, "../", "static/ui-data", filename)
  
  try {
    let redis = await redisConnect()
    file = await open(dataDir, 'r')
    // console.log(dataDir)
    let stream = await file.createReadStream()
    stream.on("data", (chunk)=>{
      let st = chunk.toString()
      if(st){
        let arr = JSON.parse(st)
        for (const arrElement of arr) {
          (async function (){
            // @ts-ignore
            // await redis.RPUSH("ui_filter-items", JSON.stringify(arrElement))
            await redis.HSET("ui_filter-items", arrElement.attribute_name, JSON.stringify(arrElement))
          }())
        }
      }
    })
    
  } catch (ex){
    console.log(ex)
  }
  
}

export const backupUICategory = async (req, res, next)=>{

}

export const getUISingleCategory = async (req, res, next)=>{

  // node js v16 implement
  let client;
  try {
    client = await redisConnect()
    
    let cat = await client.HGET("ui_categories", req.params.category_id)
    if (cat){
      // new Stream() // you can send data as stream

      res.status(200).send(cat)
    } else {
      /**
        restoreUICategory restore categories from json file...
      */
      // await restoreUICategoryInfo(req, res, next)
      // await restoreUIFilterItems(req, res, next)
      // await restoreUICategory(req, res, next)
      res.status(404).json({message: "Category not found"})
    }
    
    // const ext = path.parse(dataDir).ext;
    // res.setHeader('Content-type', mimeType[ext] || 'text/plain');
    // res.end(data);
    

  } catch (error) {
    res.status(404).json({message: error.message})
  } finally{
    client?.quit()
  }
}



export const getUICategoryInfo = async (req, res, next)=>{

  const { category_id } = req.params
  let client;
  try {
    let data = ""
    let stream = createReadStream(path.join(__dirname, "../", "static/ui-data/category-info.json"))
    stream.on("data", (chunk => {
      data += chunk.toString()
    }))
    
    stream.on("close", (e)=>{
      if(data){
        let arr = JSON.parse(data)
        let index = arr.findIndex(item=>item.id === category_id)
        if(index !== -1) {
          res.send(arr[index])
          return
        }
        res.status(404).json({message: "category info not found"})
      }
    })
    
    stream.addListener("error", (e)=>{
      res.status(404).json({message: e.message})
    })
    stream.on("close", ()=>{})
    
    // client = await redisConnect()
    // let cat = await client.HGET("ui_categories", req.params.category_id)
    // if (cat){
    //   // new Stream() // you can send data as stream
    //   res.status(200).send(cat)
    // } else {
    //   /**
    //     restoreUICategory restore categories from json file...
    //   */
    //   await restoreUICategory(req, res, next)
    //   res.status(404).json({message: "Category not found"})
    // }
    //
    // const ext = path.parse(dataDir).ext;
    // res.setHeader('Content-type', mimeType[ext] || 'text/plain');
    // res.end(data);
    

  } catch (error) {
    res.status(404).json({message: error.message})
  } finally{
    client?.quit()
  }
}


export const getMultipleCategoryInfo = async (req, res, next)=>{

  const { ids } = req.body
  let client;
  try {
    let data = ""
    let stream = createReadStream(path.join(__dirname, "../", "static/ui-data/category-info.json"))
    stream.on("data", (chunk => {
      data += chunk.toString()
    }))
    
    stream.on("close", (e)=>{
      if(data){
        let arr = JSON.parse(data)
        let findCategoryInfo = []
        arr.forEach(item=>{
          if(ids.indexOf(item.id) !== -1){
            findCategoryInfo.push(item)
          }
        })
        res.json({category_info: findCategoryInfo})
      }
    })

    stream.on("error", (e)=>{
      res.status(404).json({message: e.message})
    })
    
    // client = await redisConnect()
    // let cat = await client.HGET("ui_categories", req.params.category_id)
    // if (cat){
    //   // new Stream() // you can send data as stream
    //   res.status(200).send(cat)
    // } else {
    //   /**
    //     restoreUICategory restore categories from json file...
    //   */
    //   await restoreUICategory(req, res, next)
    //   res.status(404).json({message: "Category not found"})
    // }
    //
    // const ext = path.parse(dataDir).ext;
    // res.setHeader('Content-type', mimeType[ext] || 'text/plain');
    // res.end(data);
    

  } catch (error) {
    res.status(404).json({message: error.message})
  } finally{
    client?.quit()
  }
}


export const getFilterItemFilter = async (req, res, next)=>{

  const { attributeNames } = req.body
  let client;
  try {
    client = await redisConnect()
    let result = []
    if(attributeNames) {
      attributeNames.forEach((att, index) => {
        (async function () {
          let d = await client.HGET("ui_filter-items", att)
          if(d) {
            result.push(JSON.parse(d.toString()))
            if ((index + 1) === attributeNames.length) {
              res.status(200).send(result)
            }
          }
        }())
      })
    } else {
      res.status(409).message({message: "Please give attribute names"})
    }

  } catch (error) {
    res.status(404).json({message: error.message})
  } finally{
    client?.quit()
  }
}


export const updateUiCategory = async (req, res, next)=>{

  // node js v16 implement
  let filehandle;
  
  const filename = req.params.filename 
  let dataDir = path.resolve("src/static/ui-data")
  let dataDir_with_name = path.resolve("src/static/ui-data", filename)


  try { 
        
    let g = await copyFile(dataDir_with_name, dataDir + "/copy__"+ filename)
    if(!g){
      console.log(filename+" backup successful");
    }

    let jsonify = JSON.stringify(req.body)
  
    filehandle = await open(dataDir_with_name, 'w'); 
    let err = await filehandle.writeFile(jsonify)
    if(!err){
      const ext = path.parse(dataDir_with_name).ext; 
      res.setHeader('Content-type', mimeType[ext] || 'text/plain');
      res.status(201).json(req.body);   
      res.end()   

    } else{

      throw new Error("File not updated")
    }

    // fs.writeFile(dataDir_with_name, jsonify, (err)=>{
    //   const ext = path.parse(dataDir_with_name).ext; 
    //   res.setHeader('Content-type', mimeType[ext] || 'text/plain');
    //   res.status(201).json(req.body);   
    //   res.end()   
    //   console.log(err);
    // })  

  } catch (error) {
    res.status(404).json({message: error})

  } finally{
    await filehandle?.close()
  }
} 

// heavy memory task...........

export const getStaticPhotos = async (req, res, next)=>{
  try {
    let images = ["jpg", "jpeg", "png"]
    let d: any = []
    let files: {path: string, name: string}[] = []
    let dirs = await readdir("static")
    for (const dir of dirs) {
      let dirNestedDir = await readdir(`src/static/${dir}`)
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
            let dirPath =  `src/static/${dir}/${item}`

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
    
    res.json(files.length)
    
  } catch (ex){
    console.log(ex)
  }
}

export const uploadPhotos = (req, res, next)=>{
  
  fileUpload(req, "static/upload", "images", (err, result)=>{
    if(err){
      return res.status(500).send(err.message)
    }
    if(result.files && result.files.images) {
      res.send(result.files.images)
    }
  })
}



export const doHeavyTask = async (req, res, next)=>{
  
  let f = {
    body: req.body,
    count: function (){ console.log("hhi")}
  }
  
  let docs = await getProducts(f)
  res.send(docs)
  
  // const childProcess = fork(path.join(__dirname, '../workers/child'));
  // childProcess.on('message', (message) => {
  //   return res.send(`Result: ${message}`);
  // });
  // childProcess.send(f);
  
}

