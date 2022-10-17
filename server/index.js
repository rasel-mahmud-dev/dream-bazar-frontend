const app = require("./dist/app/app")

app.get("/", (req, res)=>{
	res.send("hello change")
})

// app.get("/api/products1",  async function (req, res,next)  {
//
// 	const now = Date.now();
// 	try {
// 		let database = await mongoConnect();
// 		const Collection =  database.collection("products");
// 		let counts = await Collection.countDocuments();
// 		let docs = await Collection.find()
// 			.toArray();
//
// 		res.json({ time: Date.now() - now, total: counts, products: docs });
//
// 	} catch (ex) {
// 		res.send(ex)
//
// 	} finally {
//
// 	}
// })



const PORT =  process.env.PORT || 3000

app.listen(PORT, ()=>console.log("server is running on port " + PORT))