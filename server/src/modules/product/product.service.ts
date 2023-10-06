import Product, {ProductType} from "../../models/Product";
import {AggregationCursor} from "mongodb";


class ProductService {
    // async getHomepageSectionProducts(body: any) {
    //     const {pageNumber = 1, perPage = 10, type} = body
    //
    //     let client;
    //
    //     try {
    //         const ProductCollection = await Product.collection
    //         // console.log(type)
    //         let cursor;
    //
    //         if (type === "most-popular") {
    //             // sort by views and pick 5 to 10 frist item from database
    //             cursor = ProductCollection.aggregate([
    //                 {$sort: {views: -1}},
    //                 {$skip: perPage * (pageNumber - 1)},
    //                 {$limit: Number(perPage)}
    //             ])
    //
    //         } else if (type === "most-updated") {
    //             cursor = ProductCollection.aggregate([
    //                 {$sort: {created_at: -1}},
    //                 {$skip: perPage * (pageNumber - 1)},
    //                 {$limit: Number(perPage)}
    //             ])
    //
    //         } else if (type === "top-selling") {
    //             cursor = ProductCollection.aggregate([
    //                 {$sort: {sold: -1}},
    //                 {$skip: perPage * (pageNumber - 1)},
    //                 {$limit: Number(perPage)}
    //             ])
    //
    //         } else if (type === "top-views") {
    //             cursor = ProductCollection.aggregate([
    //                 {$sort: {views: -1}},
    //                 {$skip: perPage * (pageNumber - 1)},
    //                 {$limit: Number(perPage)}
    //             ])
    //
    //         } else if (type === "top-views-length") {
    //             cursor = ProductCollection.aggregate([
    //                 {$sort: {views: -1}}, // sort deasce order,
    //                 {$limit: 100},  // choose 1 to 100 item
    //                 {                 /// count document
    //                     $group: {
    //                         _id: null,
    //                         count: {$sum: 1}
    //                     }
    //                 }
    //             ])
    //
    //             let ppp = []
    //             await cursor.forEach(p => {
    //                 ppp.push(p)
    //             })
    //             return ppp[0]
    //
    //         } else if (type === "top-selling-length") {
    //             cursor = ProductCollection.aggregate([
    //                 {$sort: {sold: -1}}, // sort deasce order,
    //                 {$limit: 100},      // choose 1 to 100 item
    //                 {                     /// count document
    //                     $group: {
    //                         _id: null,
    //                         count: {$sum: 1}
    //                     }
    //                 }
    //             ])
    //
    //             let ppp = []
    //             await cursor.forEach(p => {
    //                 ppp.push(p)
    //             })
    //             return ppp[0]
    //
    //         }
    //
    //         let pp = []
    //         await cursor.forEach(p => {
    //             pp.push(p)
    //         })
    //
    //         return {products: pp}
    //
    //     } catch (ex) {
    //         throw ex
    //     } finally {
    //         client?.close()
    //     }
    //
    // }
    // getHomepageSectionProducts(body) {
    //     // let client: any;
    //
    //     const data: { params: string, type: string, name: string }[] = body.sectionIds
    //
    //
    //     let result: { [key: string]: { values: ProductType[], type: string } } = {}
    //
    //
    //     return new Promise(async (resolve, reject) => {
    //         const collections = await Product.collection
    //         try {
    //             data.forEach((item, index) => {
    //                 (async function () {
    //                     const params = item.params;
    //
    //                     let a = params.split("=")
    //                     let other: {
    //                         sold?: string
    //                         discount?: string
    //                         views?: string
    //                     } = {};
    //
    //                     if (a.length === 2) {
    //                         other = {[a[0]]: a[1]}
    //                     }
    //
    //                     let cursor;
    //
    //                     if (other.sold) {
    //                         cursor = collections.aggregate([
    //                             {$sort: {sold: Number(other.sold)}},
    //                             {$limit: 20}
    //                         ])
    //                     } else if (other.discount) {
    //                         cursor = collections.aggregate([
    //                             {$sort: {discount: Number(other.discount)}},
    //                             {$limit: 20}
    //                         ])
    //                     } else if (other.views) {
    //                         cursor = collections.aggregate([
    //                             {$sort: {views: Number(other.views)}},
    //                             {$limit: 20}
    //                         ])
    //                     }
    //
    //                     let p: ProductType[] = []
    //                     await cursor.forEach(c => {
    //                         p.push(c)
    //                     })
    //
    //                     result[item.name] = {values: p, type: "products"}
    //
    //                     if (index === (data.length - 1)) {
    //                         resolve(result)
    //                     }
    //                 }())
    //             })
    //
    //         } catch (ex) {
    //             reject(ex)
    //         }
    //     })
    //
    //
    //     // try{
    //     //   const { c: ProductCollection, client: cc } = await dbConnect("products")
    //     //   client = cc;
    //     //
    //     //   let query = req.query
    //     //
    //     //   let { pagePage, perPage, ...other } = query
    //     //
    //     //   let cursor;
    //     //
    //     //   if(other.sold){
    //     //     cursor = ProductCollection.aggregate([
    //     //       { $sort: { sold: Number(other.sold) } },
    //     //       { $limit: 20 }
    //     //     ])
    //     //   } else if(other.discount){
    //     //     cursor = ProductCollection.aggregate([
    //     //       { $sort: { discount: Number(other.discount) } },
    //     //       { $limit: 20 }
    //     //     ])
    //     //   } else if(other.views){
    //     //     cursor = ProductCollection.aggregate([
    //     //       { $sort: { views: Number(other.views) } },
    //     //       { $limit: 20 }
    //     //     ])
    //     //   } else if(other.updated_at){
    //     //     cursor = ProductCollection.aggregate([
    //     //       { $sort: { updated_at: Number(other.updated_at) } },
    //     //       { $limit: 20 }
    //     //     ])
    //     //   }
    //     //   let p = []
    //     //   await cursor.forEach(c=>{
    //     //     p.push(c)
    //     //   })
    //     //
    //     //
    //     //   res.send(p)
    //     //
    //     // } catch(ex){
    //     //   console.log(ex)
    //     //   res.send([])
    //     // } finally{
    //     //   client?.close()
    //     // }
    //
    //
    // }

    getHomepageSectionProducts(body) {
        // let client: any;
        const sectionIds: string[] = body.sectionIds

        return new Promise(async (resolve, reject) => {
            const collections = await Product.collection
            try {

                let result: { [key: string]: ProductType[] } = {}

                for (let sectionId of sectionIds) {
                    let cursor;
                    if (sectionId === "TopSelling") {
                        cursor = collections.aggregate([
                            {$sort: {sold: 1}},
                            {$limit: 20}
                        ])
                    } else if (sectionId === "LatestOffer") {
                        cursor = collections.aggregate([
                            {$sort: {discount: 1}},
                            {$limit: 20}
                        ])
                    } else if (sectionId === "MostView") {
                        cursor = collections.aggregate([
                            {$sort: {views: 1}},
                            {$limit: 20}
                        ])
                    }

                    let p: ProductType[] = []
                    await cursor?.forEach(c => {
                        p.push(c)
                    })

                    result[sectionId] = p
                }

                resolve(result)

            } catch (ex) {
                reject(ex)
            }
        })


        // try{
        //   const { c: ProductCollection, client: cc } = await dbConnect("products")
        //   client = cc;
        //
        //   let query = req.query
        //
        //   let { pagePage, perPage, ...other } = query
        //
        //   let cursor;
        //
        //   if(other.sold){
        //     cursor = ProductCollection.aggregate([
        //       { $sort: { sold: Number(other.sold) } },
        //       { $limit: 20 }
        //     ])
        //   } else if(other.discount){
        //     cursor = ProductCollection.aggregate([
        //       { $sort: { discount: Number(other.discount) } },
        //       { $limit: 20 }
        //     ])
        //   } else if(other.views){
        //     cursor = ProductCollection.aggregate([
        //       { $sort: { views: Number(other.views) } },
        //       { $limit: 20 }
        //     ])
        //   } else if(other.updated_at){
        //     cursor = ProductCollection.aggregate([
        //       { $sort: { updated_at: Number(other.updated_at) } },
        //       { $limit: 20 }
        //     ])
        //   }
        //   let p = []
        //   await cursor.forEach(c=>{
        //     p.push(c)
        //   })
        //
        //
        //   res.send(p)
        //
        // } catch(ex){
        //   console.log(ex)
        //   res.send([])
        // } finally{
        //   client?.close()
        // }


    }


}


export default new ProductService();
