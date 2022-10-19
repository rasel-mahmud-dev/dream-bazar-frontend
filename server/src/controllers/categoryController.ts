import {errorResponse, successResponse} from "../response"
import sqlDatabase from "../database/sqlDatabase";
import {NextFunction, Request, Response} from "express";
import uuid from "../utilities/uuid";
import Category from "../models/Category";
import CategoryJson from "../models/CategoryJson";

const {ObjectId} = require("mongodb")


export const getCategoriesCount = async (req: Request, res: Response, next: NextFunction) => {

}


export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let a = await getAllCategories("SElECT * FROM categories");
        res.send(a)
        
    } catch (ex) {
        next(ex)
    }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    const {name, parentId} = req.query
    try {
        if(name){
            const [err, result]  = await Category.findOne("SELECT * FROM categories WHERE name = ?", [name])
            if (err || !result) {
                return errorResponse(next, "category not found", 404)
            }
            successResponse(res, 200, result)
            
        } else if (parentId) {
            const [err, result]  = await Category.findOne("SELECT * FROM categories WHERE parentId = ?", [parentId])
            if (err || !result) {
                return  errorResponse(next, "category not found", 404)
            }
            successResponse(res, 200, result)
        }
        
        //   CREATE TABLE "categories" (
        //       "id"	TEXT NOT NULL,
        //       "name"	text(200) NOT NULL,
        //       "parentId"	TEXT DEFAULT "",
        //       "isProductLevel"	NUMERIC DEFAULT 0,
        //       "ideals"	JSON,
        //       CONSTRAINT "categories_pk" PRIMARY KEY("name")
        // )
        
    } catch (ex) {
        next(ex)
        
    } finally {
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


function getAllCategories(sql: string, ...args: any) {
    return new Promise(async function (resolve, reject) {
        let db: any
        try {
            db = await sqlDatabase()
            
            db.all(sql, ...args, (err: any, result: any | null) => {
                if (err != null) {
                    reject(err)
                } else if (err == null && result) {
                    resolve(result)
                } else if (result) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        } catch (ex) {
            console.log(ex, "SSSSSSSS")
            reject(ex)
        } finally {
            db && db.close()
        }
    })
}

export const saveCategory = async (req: Request, res: Response, next: NextFunction) => {
    
    const {name, parentId, isProductLevel} = req.body
    
    try {
        
        let [findErr, result] = await Category.findOne('select * from categories where name = ?', [name])
        if (!findErr && result) {
            return errorResponse(next, "Category already exist")
        }
        
        let id = uuid(10)
        let newCategory = new Category({
            id,
            name,
            parentId: parentId ? parentId : "",
            logo: "",
            isProductLevel: isProductLevel ? 1 : 0
        })
        
        let [err2, doc] = await newCategory.insertOne()
        
        if (err2) {
            return errorResponse(next, "Internal error. Please try Again")
        }
        successResponse(res, 201, {
            message: "category created",
            category: doc
        })
    } catch (ex) {
        next(ex)
        
    }
    
}

export const addCategoryCache = async (req: Request, res: Response, next: NextFunction) => {
    
    const { rootId, data } = req.body
    
    try {
        
        let [findErr, result] = await Category.findOne('select * from categories_cache where rootId = ?', [rootId])
        if (!findErr && result) {
            return errorResponse(next, "Category already exist")
        }
        
        let newCategoryCache = new CategoryJson({
            rootId: rootId,
            arr: JSON.stringify(data)
        })
    
        let [err2, doc] = await newCategoryCache.insertOne()
        
        if (err2) {
            return errorResponse(next, "Internal error. Please try Again")
        }
        successResponse(res, 201, {
            message: "category created",
            category: doc
        })
    } catch (ex) {
        next(ex)
        
    }
    
}

export const getCategoryCache = async (req: Request, res: Response, next: NextFunction) => {
    
    const { rootId } = req.params
    
    try {
        
        let [er, cat] = await Category.findOne('select * from categories where name = ?', [rootId])
        if(!cat){
            return errorResponse(next, "Category Cache not found ")
        }
        let [findErr, result] = await Category.findOne('select * from categories_cache where rootId = ?', [cat.id])
        if (findErr) {
            return errorResponse(next, "Category Cache not found ")
        }
        // @ts-ignore
        successResponse(res, 201, {
            categoryCache: result
        })
        
    } catch (ex) {
        next(ex)
        
    }
    
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    
    const {name, parentId, isProductLevel, ideals} = req.body
    
    try {
        
        let [err, result] = await Category.findOne<Category>("SELECT name FROM categories where id = ?", [id])
        if (err || !result) {
            return errorResponse(next, "Category not found")
        }
        
        let category = new Category({
            name: name,
            parentId: parentId,
            isProductLevel: isProductLevel ? 1 : 0,
            logo: "",
            ideals: ideals ?? '[]'
        })
        
        
        category.updatedAt = new Date().toISOString()
        
        let [updateErr, updateResult] = await category.updateOne<Category>(id)
        
        if (updateErr) {
            return errorResponse(next, "category update fail")
        }
        
        successResponse(res, 201, {
            message: "category updated",
            category: updateResult
        })
        
    } catch (ex) {
        errorResponse(next, "category update fail")
        
    } finally {
    
    }
}


export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    
    try {
        
        let [err, result] = await Category.deleteOneById(id)
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


// category Filter for varies type filter for [ homepage, filter-sidebar ] 
// fetch all child category for parent category that id given

export const filterCategoryFetch = async (req: Request, res: Response, next: NextFunction) => {
    
    const {type, categoryId} = req.query
    let client;
    // try {
    //     const {c: CategoryCollection, client: cc} = await dbConnect("categories")
    //     client = cc
    //     let categoriesDocs = []
    //     if (type && type === "top-categories") {
    //         let cursor = CategoryCollection.find(
    //             {is_top: false},
    //             // { top: 0 } // projection need mongodb 4.4
    //         )
    //
    //         if (await cursor.count() === 0) {
    //             return res.json({categories: []})
    //         }
    //
    //         await cursor.forEach((i) => {
    //             categoriesDocs.push(i)
    //         })
    //     }
    //
    //     if (categoryId) {
    //         // fetch this category and its all sub_categories
    //         let categoriesCursor = await CategoryCollection.find({parent_id: ObjectId(categoryId)})
    //         let selectedCategories = []
    //         await categoriesCursor.forEach((i) => {
    //             selectedCategories.push(i)
    //         })
    //         return res.json({categories: selectedCategories})
    //     }
    //
    //     res.json({categories: categoriesDocs})
    //
    // } catch (ex) {
    //     next(ex)
    //     console.log(ex)
    //
    // } finally {
    //     client?.close()
    // }
}


export const fetchCategoryWithFilter = async (req: Request, res: Response, next: NextFunction) => {
    
    const {type, is_product_level} = req.body
    
    let client;
    
    
    // try {
    //     const {c: CategoryCollection, client: cc} = await dbConnect("categories")
    //     client = cc
    //
    //     let filterObject = {}
    //
    //     if (typeof is_product_level !== "undefined") {
    //         filterObject["is_product_level"] = !!is_product_level
    //     }
    //
    //
    //     let categoriesCursor = CategoryCollection.find(filterObject)
    //
    //     // fetch this category and its all sub_categories
    //     // let categoriesCursor = await CategoryCollection.find({parent_id: ObjectId(categoryId)}, {is_top: 0})
    //
    //     let selectedCategories = []
    //     await categoriesCursor.forEach((i) => {
    //         selectedCategories.push(i)
    //     })
    //
    //     res.json({categories: selectedCategories})
    //
    //
    // } catch (ex) {
    //     client?.close()
    //     console.log("---------++++++++++--------");
    //     // console.log(ex)
    //     next(ex)
    //
    // } finally {
    //     client?.close()
    //
    //
    // }
}


export const getCategoryFilterSection = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    let client;
    
    
    // try {
    //
    //     const {c: CategoryCollection, client: cc} = await dbConnect("categories")
    //     client = cc
    //     let cursor;
    //
    //     let plusIndex = id.indexOf("+")
    //     if (plusIndex !== -1) {
    //         let arrOfCatIds = []
    //         let catIds = id.split('+')
    //         catIds && catIds.forEach(id => {
    //             arrOfCatIds.push(ObjectId(id))
    //         })
    //
    //
    //         cursor = CategoryCollection.aggregate([
    //             {
    //                 $match:
    //                     {_id: {$in: arrOfCatIds}}
    //
    //             },
    //             {
    //                 $lookup: {
    //                     from: "brands",
    //                     localField: "_id",
    //                     foreignField: "for_category",
    //                     as: "brands"
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     brands: {name: 1, _id: 1},
    //                     name: 1,
    //                     filters: 1,
    //                     is_top: 1,
    //                     last_level: 1,
    //                     parent_id: 1,
    //                     updated_at: 1,
    //                     _id: 1
    //                 }
    //             }
    //         ])
    //
    //     } else {
    //
    //         cursor = CategoryCollection.aggregate([
    //             {$match: {_id: ObjectId(id)}},
    //
    //             {
    //                 $lookup: {
    //                     from: "brands",
    //                     localField: "_id",
    //                     foreignField: "for_category",
    //                     as: "brands"
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     brands: {name: 1, _id: 1},
    //                     name: 1,
    //                     filters: 1,
    //                     is_top: 1,
    //                     last_level: 1,
    //                     parent_id: 1,
    //                     updated_at: 1,
    //                     _id: 1
    //                 }
    //             }
    //         ])
    //
    //     }
    //
    //     let r: any = []
    //     let b = []
    //     await cursor.forEach(cat => {
    //         r.push(cat)
    //         b.push(...cat.brands)
    //     })
    //     if (r.length > 1) {
    //         r.brands = b
    //         res.json({category: [{brands: b}]})
    //     } else {
    //         res.json({category: r})
    //     }
    //
    // } catch (ex) {
    //
    //     next(ex)
    //     console.log(ex)
    //
    // } finally {
    //     client?.close()
    // }
    
    
}


//! Here nested array of lookup bug...
export const getCategoryExpand = async (req: Request, res: Response, next: NextFunction) => {
        let client;
        
        // try {
        //     let {c: CategoryCollection, client: cc} = await dbConnect("categories")
        //     client = cc
        //
        //     let c = await CategoryCollection.aggregate([
        //         {$match: {_id: ObjectId(req.params.category_id)}},
        //         {
        //             "$lookup": {
        //                 "from": "categories",
        //                 "localField": "_id",
        //                 "foreignField": "parent_id",
        //                 "as": "sub"
        //             }
        //         },
        //         {$unwind: {path: '$sub'}},
        //         {
        //             "$lookup": {
        //                 "from": "categories",
        //                 "localField": "sub._id",
        //                 "foreignField": "parent_id",
        //                 "as": "sub.sub"
        //             }
        //         },
        //         {$unwind: {path: '$sub.sub'}},
        //         {
        //             "$lookup": {
        //                 "from": "categories",
        //                 "localField": "sub.sub._id",
        //                 "foreignField": "parent_id",
        //                 "as": "sub.sub.sub"
        //             }
        //         },
        //
        //         {
        //             $group: {
        //                 _id: "$_id",
        //                 name: {$first: "$name"},
        //                 parent_id: {$first: "$parent_id"},
        //                 ideal: {$first: "$ideal"},
        //                 sub: {$push: "$sub"}
        //             }
        //         }
        //
        //     ])
        //
        //     let category = []
        //     await c.forEach(cc => {
        //         category.push(cc)
        //     })
        //     res.send(category)
        //
        // } catch (ex) {
        //     res.send(ex.message)
        // } finally {
        //     client?.close()
        // }
    }