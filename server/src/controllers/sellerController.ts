import {ObjectId} from "mongodb";

export const getSeller = async (req, res, next)=>{
  const { customer_id } = req.params
  let client;
  // try{
  //   const {  c: SellerCollection, client: cc } = await dbConnect("sellers")
  //   client = cc
  //
  //   let cursor = await SellerCollection.findOne({customer_id: new ObjectId(customer_id)})
  //   res.send(cursor);
  //
  //
  // } catch(ex){
  //   console.log(ex)
  //   next(ex)
  // } finally{
  //   client?.close()
  // }
}