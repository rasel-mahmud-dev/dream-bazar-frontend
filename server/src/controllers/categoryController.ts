import fs from "fs";

const { ObjectId} = require("mongodb")
import dbConnect from "../database"

const isObjectId = require("../utilities/isObjectId") 
import { errorResponse, successResponse } from "../response"
import sqlDatabase from "../database/sqlDatabase";
import {NextFunction, Request, Response} from "express";
import uuid from "../utilities/uuid";
import {deleteOneById, findOne, insertOne, update} from "../services/sqlite/database.methods";
import {getSqliteDb} from "../services/sqlite/database.service";

export const getCategoriesCount = async (req: Request, res: Response, next: NextFunction)=>{
  const { _id } = req.query
  let client;
  try{
    const { c:  CategoryCollection, client: cc} = await dbConnect("categories")
    client = cc
    const doc = await CategoryCollection.countDocuments({})
    res.status(200).json({count: doc})
  } catch(ex){
    console.log(ex)
    next(ex)
  } finally{
     client?.close()
  }
} 


export const getCategories =  async (req: Request, res: Response, next: NextFunction)=>{
  try {

    // fs.readFile(path.resolve( dataDir + "/ui-data/product_categories.json"), function (err, data){
    //   if(err){
    //     errorResponse(res, 500, err.message)
    //     return
    //   }
    //   res.send(data)
    // })

    let a = await getAllCategories("SElECT * FROM categories");
    res.send(a)

  } catch (ex){
    next(ex)
  }
}

export const getCategory =  async (req: Request, res: Response, next: NextFunction)=>{
  const  {name, parentId} = req.query
  let db;
  try {
    db = await sqlDatabase()
    if(name) {
      let sql = `SELECT * FROM categories WHERE name = ?`
      db.get(sql, name, function (err, data) {

        if (err || !data) {
          console.log(err)
          errorResponse(next, "category not found", 404)
        }
        res.send(data)
      })
    } else if(parentId){
      let sql = `SELECT * FROM categories WHERE parentId = ?`
      db.all(sql, parentId, function (err, data) {

        if (err || !data) {
          console.log(err)
          errorResponse(next, "category not found", 404)
        }
        res.send(data)
      })
    }

    //   CREATE TABLE "categories" (
    //       "id"	TEXT NOT NULL,
    //       "name"	text(200) NOT NULL,
    //       "parentId"	TEXT DEFAULT "",
    //       "isProductLevel"	NUMERIC DEFAULT 0,
    //       "ideals"	JSON,
    //       CONSTRAINT "categories_pk" PRIMARY KEY("name")
    // )

  } catch(ex){
    next(ex)

  } finally{
    // db && db.close()
  }

  // if(!isObjectId(id)){
  //   return errorResponse(res, 401, "Please Provide a valid Object ID")
  // }
  // let client;
  // try {
  //   const {c: CategoryCollection, client: cc} = await dbConnect("categories")
  //   client = cc
  //   let category = await CategoryCollection.findOne({_id: ObjectId(id)})
  //   if (category) {
  //     res.json({category: category})
  //
  //   } else {
  //     res.status(404).json({message: "Item Not Found", category: null})
  //   }
  // }catch (ex){
  //   next(ex)
  //   console.log(ex)
  // } finally {
  //   client?.close()
  // }
  
}



function getAllCategories(sql: string, ...args: any){
  return new Promise(async function (resolve, reject){
    let db: any
    try {
      db = await sqlDatabase()

      db.all(sql, ...args, (err: any, result: any | null) => {
        if(err != null){
              reject(err)
        } else if (err == null && result){
          resolve(result)
        } else if (result){
          resolve(result)
        } else {
          reject(err)
        }
      })
    } catch (ex){
      console.log(ex, "SSSSSSSS")
      reject(ex)
    } finally {
      db && db.close()
    }
  })
}

export const saveCategory =  async (req: Request, res: Response, next: NextFunction)=>{

  const { name, parentId, isProductLevel  } = req.body

  try {

    let [err, result] =  await findOne("SELECT name FROM categories where name = ?", [name])
    if(!err && result){
      return errorResponse(next, "Category already exists")
    }

   let id = uuid(10);
    let sql = `
       INSERT INTO categories('id', 'name', 'parentId', 'isProductLevel') values('${id}', '${name}', '${parentId}', '${isProductLevel ? 1 : 0}')
     `

    const db  = await getSqliteDb();

    db.exec(sql, function (data: any, err: any){
      if(!err){
        successResponse(res, 201, {
          message: "category created",
          category: {
            id,
            name,
            parentId,
            isProductLevel: isProductLevel ? 1 : 0
          }
        })
      } else {
        errorResponse(next, "Category create fail")
      }
    })

  } catch(ex){
    next(ex)

  }
}


export const updateCategory = async (req: Request, res: Response, next: NextFunction)=>{
  const { id } = req.params

  const { name, parentId, isProductLevel  } = req.body

  try {

    let [err, result] =  await findOne("SELECT name FROM categories where id = ?", [id])
    if(err || !result){
      return errorResponse(next, "Category not found")
    }

    let sql = ''
    let data = []

    let field = { name, parentId, isProductLevel};

    for (const key in field) {
      if (field[key]) {
        sql += `${key} = ?, `
        data.push(field[key])
      }
    }

    sql = sql.slice(0, sql.lastIndexOf(","))

    sql = "UPDATE categories SET " + sql + " WHERE id = ?"

    let [errRes] = await update(sql, [...data, req.params.id])
    if (errRes) {
      errorResponse(next, "category update fail")
    } else {
      successResponse(res, 201, {
        message: "category updated",
        category: {
          id: req.params.id,
          name,
          parentId,
          isProductLevel: isProductLevel ? 1 : 0
        }
      })
    }

  } catch (ex) {
    errorResponse(next, "category update fail")

  } finally {

  }
}



export const deleteCategory = async (req: Request, res: Response, next: NextFunction)=>{
  const {id} = req.params

  try {

    let [err, result] = await deleteOneById("categories", id)
    if (err) {
      errorResponse(next, "Category delete fail", 500)
    } else {
      successResponse(res, 201, {message: "Category deleted", id});
    }

  } catch (ex) {
    next(ex)
  } finally {

  }
}


export const getCategoryByIds = async (req: Request, res: Response, next: NextFunction)=>{
  let client;
  const { type, ids } = req.body 
  try {
      const { c: CategoryCollection, client: cc } = await dbConnect("categories")
      client = cc
      let categoryIds = []
      let cursor; 
      // if(type && type === "fetch-top-categories"){ 
        ids && ids.forEach(stringId=>{
          categoryIds.push( ObjectId(stringId) )           
        })
        // res.send(categoryIds)
        cursor = CategoryCollection.find(
          { _id: { $in: categoryIds } }, 
          // { top: 0 } // projection need mongodb 4.4
        ) 
      // }
      let categories = []
      await cursor.forEach(cat=>{
        categories.push(cat)
      }) 
    
      res.json({categories: categories})
  } catch(ex){
    next(ex)
    console.log(ex)
  } finally {
    client?.close()
  }
}


// category Filter for varies type filter for [ homepage, filter-sidebar ] 
// fetch all child category for parent category that id given

export const filterCategoryFetch =  async (req: Request, res: Response, next: NextFunction)=>{
  
  const { type, categoryId } = req.query 
  let client;
  try {
    const { c: CategoryCollection, client: cc } = await dbConnect("categories")
      client = cc
    let categoriesDocs = []
      if(type && type === "top-categories"){    
        let cursor = CategoryCollection.find(
          {is_top: false}, 
          // { top: 0 } // projection need mongodb 4.4
        ) 
        
        if(await cursor.count() === 0){ 
          return res.json({categories: []}) 
        }

        await cursor.forEach((i)=>{
          categoriesDocs.push(i)
        })
      }  
      
      if(categoryId){ 
        // fetch this category and its all sub_categories
        let categoriesCursor = await CategoryCollection.find({parent_id: ObjectId(categoryId)})
        let selectedCategories = []
        await categoriesCursor.forEach((i)=>{
          selectedCategories.push(i) 
        })
        return res.json({ categories: selectedCategories})
      }
      
      res.json({ categories: categoriesDocs})
      
  } catch(ex){
    next(ex)
    console.log(ex)

  } finally{
      client?.close()
    }
  }

  

export const fetchCategoryWithFilter =  async (req: Request, res: Response, next: NextFunction)=>{
  
  const { type, is_product_level } = req.body 

  let client;


  try {
    const { c: CategoryCollection, client: cc } = await dbConnect("categories")
    client = cc

    let filterObject = {}
    
    if(typeof is_product_level !== "undefined"){
      filterObject["is_product_level"] = !!is_product_level
    }

    
    let categoriesCursor = CategoryCollection.find(filterObject)

    // fetch this category and its all sub_categories
    // let categoriesCursor = await CategoryCollection.find({parent_id: ObjectId(categoryId)}, {is_top: 0}) 
    
    let selectedCategories = []
    await categoriesCursor.forEach((i)=>{
      selectedCategories.push(i) 
    })

    res.json({ categories: selectedCategories})

      
  } catch(ex){
    client?.close()
    console.log("---------++++++++++--------");
    // console.log(ex)
    next(ex)

  } finally{
    client?.close()
    

  }
}

  
  
export const getCategoryFilterSection =  async (req: Request, res: Response, next: NextFunction)=>{
  const { id } = req.params 
  let client;
 

  try {
   
      const {c:CategoryCollection, client: cc} = await dbConnect("categories")
client = cc
    let cursor;
    
    let plusIndex = id.indexOf("+")
    if(plusIndex !== -1) {
      let arrOfCatIds = []
      let catIds = id.split('+')
      catIds && catIds.forEach(id=>{
        arrOfCatIds.push(ObjectId(id))
      })
  
  
      cursor = CategoryCollection.aggregate([
        { $match:
            { _id: {  $in: arrOfCatIds  }}
          
        },
        {
          $lookup: {
            from: "brands",
            localField: "_id",
            foreignField: "for_category",
            as: "brands"
          }
        },
        {
          $project: {
            brands: {name: 1, _id: 1},
            name: 1,
            filters: 1,
            is_top: 1,
            last_level: 1,
            parent_id: 1,
            updated_at: 1,
            _id: 1
          }
        }
      ])
      
    } else {
  
      cursor = CategoryCollection.aggregate([
        {$match: {_id: ObjectId(id)}},
    
        {
          $lookup: {
            from: "brands",
            localField: "_id",
            foreignField: "for_category",
            as: "brands"
          }
        },
        {
          $project: {
            brands: {name: 1, _id: 1},
            name: 1,
            filters: 1,
            is_top: 1,
            last_level: 1,
            parent_id: 1,
            updated_at: 1,
            _id: 1
          }
        }
      ])
  
    }
  
    let r: any = []
    let b = []
    await cursor.forEach(cat => {
      r.push(cat)
      b.push(...cat.brands)
    })
    if(r.length > 1){
      r.brands = b
      res.json({category: [{ brands: b }]})
    } else {
      res.json({category: r })
    }
    
  } catch (ex){

    next(ex)
    console.log(ex)

  } finally{
    client?.close()
  }
  
  
  
  
}



//! Here nested array of lookup bug...
export const getCategoryExpand =  async (req: Request, res: Response, next: NextFunction)=>{
  let client;
  
  try{
      let { c: CategoryCollection, client: cc } = await dbConnect("categories")
      client = cc
  
    let c = await CategoryCollection.aggregate([
      { $match: { _id: ObjectId(req.params.category_id) }},
      {
        "$lookup": {
          "from": "categories",
          "localField": "_id",
          "foreignField": "parent_id",
          "as": "sub"
        }
      },
      { $unwind: { path: '$sub' } },
      {
        "$lookup": {
          "from": "categories",
          "localField": "sub._id",
          "foreignField": "parent_id",
          "as": "sub.sub"
        }
      },
      { $unwind: { path: '$sub.sub' } },
      {
        "$lookup": {
          "from": "categories",
          "localField": "sub.sub._id",
          "foreignField": "parent_id",
          "as": "sub.sub.sub"
        }
      },

      {
        $group: {
          _id: "$_id",
          name: {$first: "$name"},
          parent_id: {$first: "$parent_id"},
          ideal: {$first: "$ideal"},
          sub: { $push: "$sub" }
        }
      }
      
    ])
    
    let category = []
    await c.forEach(cc=>{
      category.push(cc)
    })
    res.send(category)
    
  } catch (ex){
    res.send(ex.message)
  } finally {
    client?.close()
  }
}