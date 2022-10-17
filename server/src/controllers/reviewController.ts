// const isObjectId = require("../utilities/isObjectId");
//
// import dbConnect from "../database";
// import { ObjectId } from "mongodb";
//
// export const getReview = async (req, res, next) => {
// 	const { productId } = req.params;
//
// 	let client;
//
// 	try {
// 		const { c: ReviewCollection, client: cc } = await dbConnect("reviews");
// 		client = cc;
//
// 		let cursor = await ReviewCollection.aggregate([
// 			// {
// 			//   $match: {product_id: ObjectId(productId)}
// 			// }
//
// 			{
// 				$group: {
// 					_id: "$product_id",
// 					avgRate: {
// 						$avg: "$rate",
// 					},
// 				},
// 			},
// 		]);
//
// 		let rr = [];
// 		await cursor.forEach((r) => {
// 			rr.push(r);
// 		});
//
// 		res.send(rr);
// 	} catch (ex) {
// 		console.log(ex);
// 		next(ex);
// 	} finally {
// 		client?.close();
// 	}
// };
