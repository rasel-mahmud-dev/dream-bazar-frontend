import Product, {ProductType} from "../../models/Product";
import {AggregationCursor, ObjectId} from "mongodb";
import Category from "../../models/Category";
import Brand from "../../models/Brand";
import {NextFunction, Request, Response} from "express";
import {errorResponse, successResponse} from "../../response";
import {StatusCode} from "../../types";
import ProductDescription from "../../models/ProductDescription";


class ProductService {

    async getAllProducts(query) {
        const {pageNumber = 1, perPage = 10} = query;
        const now = Date.now();
        const Collection = await Product.collection
        let counts = 0;
        if (pageNumber == 1) {
            counts = await Collection.countDocuments();
        }

        let docs = await Collection.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "sellerId",
                    foreignField: "_id",
                    as: "seller"
                }
            },
            {
                $unwind: {path: "$seller", preserveNullAndEmptyArrays: true}
            },
            {
                $skip: (perPage as number) * ((pageNumber as number) - 1)
            },
            {
                $limit: Number(perPage)
            }
        ]).toArray();
        return {time: Date.now() - now, total: counts, products: docs}
    };


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
    //         return {brand: pp}
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
    //                     result[item.name] = {values: p, type: "brand"}
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
    //     //   const { c: ProductCollection, client: cc } = await dbConnect("brand")
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
            const CategoryCollections = await Category.collection
            const BrandCollections = await Brand.collection
            try {

                let result: { [key: string]: ProductType[] } = {}

                for (let sectionId of sectionIds) {
                    let cursor;

                    switch (sectionId) {

                        case "TopSelling":
                            cursor = collections.aggregate([
                                {$sort: {sold: 1}},
                                {$limit: 10}
                            ])
                            break;

                        case "LatestOffer":
                            cursor = collections.aggregate([
                                {$sort: {discount: 1}},
                                {$limit: 10}
                            ])
                            break;
                        case "MostView":
                            cursor = collections.aggregate([
                                {$sort: {views: 1}},
                                {$limit: 10}
                            ])
                            break;

                        case "TopCategoryList":
                            cursor = CategoryCollections.aggregate([
                                {$sort: {views: 1}},
                                {$limit: 30}
                            ])

                            break;

                        case "TopBrandsCarousel":
                            cursor = BrandCollections.aggregate([
                                {$sort: {views: 1}},
                                {$limit: 30}
                            ])
                            break;

                        default:
                            break;

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
        //   const { c: ProductCollection, client: cc } = await dbConnect("brand")
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

    async productFiltersPostV2(body: {
        categoryIds?: string[]
        brandIds?: string[]
        pageNumber: number
        perPage: number
        sortBy: { fieldName: string, order: number }
        attributes: {}
        searchBy: { fieldName: string, value?: string }
    }) {
        try {

            let {
                sortBy,
                categoryIds,
                brandIds = [],
                attributes,
                pageNumber = 1,
                perPage = 10,
                searchBy

            } = body;


            let pipe: any = []


            // select attributes
            let attributesValues = {};
            if (attributes && Object.keys(attributes).length > 0) {
                for (let attr in attributes) {
                    if (attributes[attr] && attributes[attr].length > 0) {
                        attributesValues[`attributes.${attr}`] = {$in: attributes[attr]};
                    }
                }
            }


            // set filter for categories
            let categoryIdsOBjs: ObjectId[] = []
            categoryIds?.forEach((id) => {
                categoryIdsOBjs.push(new ObjectId(id))
            })


            // set filter for brand
            let brandObjectIds: ObjectId[] = []
            brandIds.forEach(brand => {
                if (brand.length === 24) {
                    brandObjectIds.push(new ObjectId(brand))
                }
            })


            // search brand
            let searchFilter: any = []
            if (searchBy && searchBy.value) {
                if (searchBy.fieldName === "title") {
                    // split name part and search partially
                    if (searchBy.value) {
                        searchBy.value.split(" ").forEach((part) => {
                            searchFilter.push({title: RegExp(part, "i")})
                        })
                    }
                }
            }


            if (sortBy && sortBy.fieldName) {
                pipe.push({$sort: {[sortBy.fieldName]: sortBy.order}})
            }

            let collection = await Product.collection

            let filter = {
                $match: {
                    $and: [
                        categoryIds && categoryIds.length > 0
                            ? {
                                categoryId: {$in: categoryIdsOBjs},
                            }
                            : {},
                        brandObjectIds.length > 0
                            ? {
                                brandId: {$in: [...brandObjectIds]},
                            }
                            : {},

                        ...searchFilter
                    ],
                    $or: [
                        Object.keys(attributesValues).length > 0
                            ? {
                                ...attributesValues,
                            }
                            : {},
                    ],
                },
            }

            let total
            if (pageNumber == 1) {
                total = await collection.aggregate([
                    filter,
                    {$count: "totalDocuments"}
                ]).toArray();
            }

            const result = await collection.aggregate([
                filter,
                {$skip: (Number(pageNumber) - 1) * Number(perPage)},
                {$limit: Number(perPage)},
                ...pipe

            ]).toArray();


            let totalDocument = undefined;
            if (total && total.length > 0) {
                totalDocument = total[0].totalDocuments
            }

            return {products: result, totalItems: totalDocument}

        } catch (ex) {
            throw ex
        }
    }

    async getProductDetailForUpdate(filter: { slug?: string, id?: string }) {
        try {
            let product = await Product.findOne<Product>(filter)
            let productDetail = {}
            if (product) {
                productDetail = await ProductDescription.findOne({productId: product._id});
            }
            return {product, productDetail};
        } catch (ex) {
            throw ex
        }
    }
}


export default new ProductService();
