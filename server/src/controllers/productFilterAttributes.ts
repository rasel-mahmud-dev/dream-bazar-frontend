
// Get All Filter Item Collection
export const getFilterItems = async (req, res)=>{

  const {db, client} = await dbConnect()
  const FilterItemsCollection = db.collection("filter_items")

  try {
    // let cursor = FilterItemsCollection.find({})
    // if(await cursor.count() === 0){
    //   return res.json({filter_items: []})
    // }
    //
    // let p = []
    // await cursor.forEach((i)=>{
    //   p.push(i)
    // })
    //
    // res.json({filter_items: p})

  } catch(ex){

    console.error(ex)
  } finally {
    client?.close()
  }
}

//
//
// export const getFilterItem = async (req, res) =>{
//   const {db, client} = await dbConnect()
//
//   const FilterItemsCollection = db.collection("filter_items")
//   const { id } = req.params
//
//   try{
//     let filterItem = await FilterItemsCollection.findOne({_id: new ObjectId(id)})
//     res.json({filterItem: filterItem})
//
//   } catch(ex){
//       console.error(ex)
//   } finally{
//     client?.close()
//   }
// }
//
// export const saveFilterItems = async (req, res) =>{
//   const filterItems  = req.body
//   const { c: filterItemsCollection, client } = await dbConnect("filter_items")
//
//   try{
//     let response;
//     if(Array.isArray(filterItems)){
//       response = await filterItemsCollection.insertMany(filterItems)
//     } else{
//       response = await filterItemsCollection.insertOne(filterItems)
//     }
//
//     if(response.insertedCount){
//       res.status(200).json({message: "filterItems Save succefull", filterItems: response.ops})
//     } else{
//       res.status(401).json({message: "filterItems Save unsuccessfull"})
//     }
//   } catch(ex){
//     console.error(ex)
//   } finally{
//     client?.close()
//   }
// }
//
//
//
// export const updateFilterItems = async (req, res)=>{
//   const { id } = req.params
//   // const { name, logo } = req.body
//
//   const {c: filterItemsCollection, client } = await dbConnect("filter_items")
//
//   try{
//     const response = await filterItemsCollection.updateOne(
//       {_id: new ObjectId(id)},
//       { $set: req.body },
//       // { upsert: true } // add document with req.body._id if not exists
//     )
//     if(response.modifiedCount > 0){
//       res.status(201).json({message: "filterItems updated"})
//     } else{
//       res.json({message: "filterItems not updated"})
//     }
//   } catch(ex){
//     console.error(ex)
//   } finally{
//     client?.close()
//   }
// }
//
//
//
// export const deleteFilterItems = async (req, res) =>{
//
//  const { id } = req.params
//  const {c: filterItemsCollection, client } = await dbConnect("filter_items")
//
//   try{
//     const response = await filterItemsCollection.deleteOne({_id: new ObjectId(id)})
//
//     if(response.deletedCount > 0){
//       res.json({message: "delete successfull"})
//     } else{
//       res.json({message: "filter item not found"})
//     }
//   } catch(ex){
//     console.error(ex)
//   } finally{
//     client?.close()
//   }
//
// }