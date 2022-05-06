const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const dbConnect = require("../database/db");
const {ObjectId} = require("mongodb");


async function findEntryLevel_Cat(category_id) {
  let client;
  try {
    const {c: CategoryCollection, client: cc} = await dbConnect("categories")
    client = cc

    let cursor = await CategoryCollection.aggregate([
      {
        $match: {_id: ObjectId(category_id)}
      },
      {
        $lookup: {
          from: "categories",
          let: {categoryId: "$_id"},  // it first query doc _id ..
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {$eq: ["$parent_id", "$$categoryId"]} // $parent_id from sub_category
                  ]
                }
              }
            },
            {
              $lookup: {
                from: "categories",
                let: {subCatId: "$_id"},
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {$eq: ["$parent_id", "$$subCatId"]}
                        ]
                      }
                    }
                  },
                  {
                    $lookup: {
                      from: "categories",
                      let: {subSubCatId: "$_id"},
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $and: [
                                {$eq: ["$parent_id", "$$subSubCatId"]}
                              ]
                            }
                          }
                        }
                      ],
                      as: "sub_cat"
                    }
                  }
                ],
                as: "sub_cat"
              }
            }
          ],
          as: "sub_cat"
        }
      },
      {   // reduce unnecessary field
        $project: {
          _id: 1,
          is_product_level: 1,
          sub_cat: {
            _id: 1,
            is_product_level: 1,
            sub_cat: {
              _id: 1,
              is_product_level: 1,
              sub_cat: {
                _id: 1,
                is_product_level: 1
              }
            }
          },
        }
      }
    ])

    let c = []
    await  cursor.forEach(cat => {
      c.push(cat)
    })

    client?.close()
    return c

  } catch (ex) {
    console.log("-------", ex.message)

  } finally {
    client?.close()
  }
}

function mapCategoryProductLevel(categoryList){
  let categories = []
  categoryList
  && categoryList.length > 0
  && categoryList.map(c=>{
    if(c.is_product_level){
      categories.push(c._id)
    }
    if(c.sub_cat && c.sub_cat.length > 0) {
      c.sub_cat.map(cc => {
        if(cc.is_product_level){
          categories.push(cc._id)
        }
        if(cc.sub_cat && cc.sub_cat.length > 0) {
          cc.sub_cat.map(ccc => {
            if(ccc.is_product_level){
              categories.push(ccc._id)
            }
            if(ccc.sub_cat && ccc.sub_cat.length > 0){
              ccc.sub_cat.map(cccc => {
                if(cccc.is_product_level){
                  categories.push(cccc._id)
                }
              })
            }
          })
        }
      })
    }
  })

  return categories
}


const getNestedCategoryIds = async (body)=>{
  let client;
  // any of category id
  const { category_id, category_ids } = body

  try {
    // const {c: CategoryCollection, client: cc} = dbConnect("categories")
    // client = cc

    let allCategory = []

    let categoryIds = []


    if(category_id) {
      let c = await findEntryLevel_Cat(category_id)
      allCategory.push(...c)

    } else if(category_ids){
      for (let item of category_ids) {
        let c = await findEntryLevel_Cat(item)
        if(c) {
          allCategory.push(...c)
        }
      }
    }

    categoryIds = mapCategoryProductLevel(allCategory)

    client?.close()
    return categoryIds

  } catch (ex){
    console.log("message", ex.message)
    return null
  } finally {
    client?.close()
  }
}


if (isMainThread) {
  module.exports = (req)=>{
    return new Promise((resolve, reject) => {
      // This re-loads the current file inside a Worker instance.
      const worker = new Worker(__filename, {
        workerData: { body: req.body},
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
  
  (async function (body){
    
    const {
      sort_by,
      category_ids,
      product_ids,
      category_id,
      brand_ids,
      attributes,
      pageNumber=1,
      perPage=10,
      documentCount
    } = body
  
    let client;
  
    
    try{
      const { db, client: cc } = await dbConnect()
      client = cc
      const ProductCollection = db.collection("products")
      const CategoryCollection = db.collection("categories")
    
      let pipe = []
      let categoryIds = []
      let categoryId;
      let brandIds = []
      let productIds = []
      // let idealForIds = []
    
      if(category_id){
        categoryId = ObjectId(category_id)
      }
    
      if(category_ids && category_ids.length > 0){
        category_ids.forEach(id=>{
          categoryIds.push(ObjectId(id))
        })
      }
      if(brand_ids && brand_ids.length > 0){
        brand_ids.forEach(id=>{
          brandIds.push(ObjectId(id))
        })
      }
      if(product_ids && product_ids){
        product_ids.forEach(id=>{
          productIds.push(ObjectId(id))
        })
      }
    
    
      let attributesValues = {}
      if(attributes && Object.keys(attributes).length > 0 ){
        for(let attr in attributes){
        
          if(attributes[attr] && attributes[attr].length > 0){
            attributesValues[`attributes.${attr}`] = { $in: attributes[attr] }
          }
        
        }
      }
    
      // console.log(req.body)
      // { $match: { "attributes.form_factor": { $in: ["mini_itx"]  }} }
      // categoryIds && categoryIds.length > 0 ? category_id: { $in: [...categoryIds] } } : [{}]
    
      pipe = [
        ...pipe,
        {$match: productIds.length > 0 ? { _id: { $in: productIds } } : {}},
        // {$match: categoryId ? { category_id: categoryId} : {}},
        { $match : {
            $and: [
              // categoryIds && categoryIds.length > 0 ? {
              //   category_id: { $in: [...categoryIds] }
              // } : {},
              brandIds && brandIds.length > 0 ? {
                brand_id: { $in: [...brandIds] }
              } : {}
            ],
            $or: [
              Object.keys(attributesValues).length > 0 ? {
                ...attributesValues,
              } : {}
            ]
          }
        }
    
      ]
      //
      // if(count){
      //   pipe = [
      //     ...pipe,
      //     { $group: {
      //         _id: null, total: { $sum: 1 } }
      //     }
      //   ]
      // }
    
      let sortingStage = { $sort: {} }
      let sortBy = {}
      if(sort_by && sort_by.length > 0){
        sort_by.map(sort=>{
          sortingStage["$sort"][sort.field] = sort.order
        })
        pipe = [
          ...pipe,
          {...sortingStage},
        ]
      }

      let categories = await getNestedCategoryIds(body)
      // console.log(JSON.stringify(pipe))
      
     
      
      if(documentCount) {
  
  
        
        
        // client?.close()
        // parentPort.postMessage(JSON.stringify(products));
        // parentPort.close()
        // process.exit(0);
  
        let cursor  = ProductCollection.aggregate([
          ...pipe,
          {
            $match: {
              category_id: {$in: categories} // category id
            }
          },
          {
            $lookup: {
              from: "brands",
              localField: "brand_id",
              foreignField: "_id",
              as: "brand"
            }
          },
          {$unwind: {path: "$brand", preserveNullAndEmptyArrays: true}},
          { $group: {
             _id: null, total: { $sum: 1 } }
          }
        ])
        let doc = {}
        await cursor.forEach(c=>{
          doc =  {...c}
        })
        client?.close()
        parentPort.postMessage(JSON.stringify({total: doc.total}));
        parentPort.close()
        process.exit(0);
      } else {
        let cursor  = ProductCollection.aggregate([
          ...pipe,
          {
            $match: {
              category_id: {$in: categories} // category id
            }
          },
          {
            $lookup: {
              from: "brands",
              localField: "brand_id",
              foreignField: "_id",
              as: "brand"
            }
          },
          {$unwind: {path: "$brand", preserveNullAndEmptyArrays: true}},
          {$skip: perPage * (pageNumber - 1)},
          {$limit: Number(perPage)},
        ])
  
        let products = []
        await cursor.forEach(p=>{
          products.push(p)
        })
        client?.close()
        parentPort.postMessage(JSON.stringify(products));
        parentPort.close()
        process.exit(0);
      }

  
    } catch(ex){
    
    } finally{
      client?.close()
    }
    
  }(workerData.body))
  
}