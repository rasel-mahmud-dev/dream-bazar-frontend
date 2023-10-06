import {NextFunction, Request, Response} from "express";
import Product, {ProductType} from "../models/Product";
import Validator from "../utilities/validator";

import homeSectionData from "../data/homeSection.json"
import featuredProducts from "../data/featuredProducts.json"

import {ObjectId} from "mongodb";

import {ApproveStatus, Roles, StatusCode, TypedRequestBody} from "../types"

import isObjectId from "../utilities/isObjectId";


import fileUpload from "../services/fileUpload/fileUpload";
import {errorResponse, successResponse} from "../response";
import Attributes from "../models/Attributes";
import {Covert} from "../dataConvert";
import ProductDescription, {ProductDescriptionType} from "../models/ProductDescription";
import {uploadImage} from "../services/cloudinary";
import slugify from "slugify";
import parseJson from "../utilities/parseJson";
import {HomeSectionSlug} from "../types/HomeSectionSlug";
import Shop from "../models/Shop";
import Brand from "../models/Brand";

export const getProductCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let counts = await Product.count();
        res.status(200).send(counts);
    } catch (ex) {
        errorResponse(next, "Product Count fail");
    }
};

export const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {pageNumber = 1, perPage = 10} = req.query;

    const now = Date.now();


    try {

        const Collection = await Product.collection

        let counts = 0;
        if (pageNumber === 1) {
            counts = await Collection.countDocuments();
        }
        let filter = {}

        if (!req.authUser.roles.includes(Roles.ADMIN)) {
            filter = {
                sellerId: new ObjectId(req.authUser._id)
            }
        }

        let docs = await Collection.find(filter)
            .skip((perPage as number) * ((pageNumber as number) - 1))
            .limit(Number(perPage))
            .toArray();

        res.json({time: Date.now() - now, total: counts, products: docs});

    } catch (ex) {
        next(ex);
    }
};


export const getAllProductsForAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {pageNumber = 1, perPage = 10} = req.query;

    const now = Date.now();


    try {

        const Collection = await Product.collection


        let counts = 0;
        if (pageNumber == 1) {
            counts = await Collection.countDocuments();
        }

        // let docs = await Collection.find({})
        //     .skip((perPage as number) * ((pageNumber as number) - 1))
        //     .limit(Number(perPage))
        //     .toArray();
        //

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
                $unwind: { path: "$seller", preserveNullAndEmptyArrays: true }
            },
            {
                $skip: (perPage as number) * ((pageNumber as number) - 1)
            },
            {
                $limit: Number(perPage)
            }
        ]).toArray();

        console.log(docs)

        res.json({time: Date.now() - now, total: counts, products: docs});

    } catch (ex) {
        next(ex);
    }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {

    const {slug, id} = req.query;


    try {
        let filter = {}
        if (id) {
            filter = {_id: new ObjectId(id as string)}
        } else if (slug) {
            filter = {slug}

        } else {
            return errorResponse(next, "Please provider product slug or product _id")
        }

        let product = await Product.findOne(filter)
        if (product) {
            successResponse(res, StatusCode.Ok, product);
        }
    } catch (ex) {
        next(ex);
    }
};


/**
 Get relevant Product
 */
export const getRelevantProducts = async (req: Request, res: Response, next: NextFunction) => {

    const {
        brandId = "",
        categoryId = "",
        title = ""
    } = req.body;


    try {
        let filters: { brandId?: ObjectId, categoryId?: ObjectId, title?: RegExp }[] = []

        // find with brand id
        if (brandId && isObjectId(brandId)) {
            filters.push({brandId: new ObjectId(brandId)})
        }

        // find with category
        if (categoryId && isObjectId(categoryId)) {
            filters.push({categoryId: new ObjectId(categoryId)})
        }

        // split name part and search partially
        if (title) {
            title.split(" ").forEach((part) => {
                filters.push({title: RegExp(part, "i")})
            })
        }

        let products = await Product.find({$or: filters}, {limit: 20})
        successResponse(res, StatusCode.Ok, products)


    } catch (ex) {
        next(ex);
    }
};


export const getProductDetail = async (req: Request, res: Response, next: NextFunction) => {

    const {productId} = req.params;

    try {
        let product = await ProductDescription.findOne({productId: new ObjectId(productId)});
        successResponse(res, StatusCode.Ok, product ? product : {});
    } catch (ex) {
        next(ex);
    }
};


// export const productUpdateForAttributeChange = async (req: Request, res: Response, next: NextFunction) => {
// 	const { id } = req.params;
// 	const { type, quantity } = req.body;
// 	let client;
// 	try {
// 		const { c: ProductCollection, client: cc } = await dbConnect("brand");
// 		client = cc;
// 		let response;
// 		if (type === "product_view_increase") {
// 			response = await ProductCollection.findOneAndUpdate(
// 				{ _id: new ObjectId(id) },
// 				{ $inc: { views: 1 } }
// 				// { returnDocument: true}
// 			);
// 		} else if (type === "product_stock_increase") {
// 			response = await ProductCollection.findOneAndUpdate(
// 				{ _id: new ObjectId(id) },
// 				{ $inc: { qty: quantity ? Number(quantity) : 1 } }
// 				// { returnNewDocument: true}
// 			);
// 		} else if (type === "product_stock_decrease") {
// 			response = await ProductCollection.findOneAndUpdate(
// 				{ _id: new ObjectId(id) },
// 				{ $inc: { qty: quantity ? Number(quantity) : -1 } }
// 				// { returnNewDocument: true}
// 			);
// 		}
//
// 		res.status(201).json({ product: response.value });
// 	} catch (ex) {
// 		next(ex);
// 	} finally {
// 		client?.close();
// 	}
// };

export const updateProductPutReq = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    try {

        // fileUploadHandler(req, "src/static/upload", "image", async (err, ctx)=>{
        //   if(err){
        //     throw new Error(err.message)
        //   }
        //
        //
        //   let uploadedImages: string[] = []
        //
        //   if(ctx?.files?.image){
        //     for (let i = 0; i < ctx.files.image.length; i++) {
        //       const link = ctx.files.image[i];
        //       uploadedImages.push(link.path)
        //     }
        //   }
        //
        //
        //   let { images, removePhoto, cover_photo, details, highlight,  seller_rules, description, attributes, ...other } = ctx.fields
        //
        //   let updatedProduct : ProductType = {
        //     title: other.title,
        //     price: Number(other.price),
        //     qty: Number(other.qty),
        //     sold: Number(other.sold),
        //     views: Number(other.views),
        //     discount: Number(other.discount),
        //     cover_photo: "",
        //     category_id: new ObjectId(other.category_id),
        //     brand_id: new ObjectId(other.brand_id),
        //     updated_at: new Date(),
        //     seller_id: new ObjectId(other.seller_id),
        //     images: []
        //   }
        //   if(attributes){
        //     updatedProduct.attributes = JSON.parse(attributes)
        //   }
        //
        //   if(images && typeof images === "string"){
        //     uploadedImages.push(...JSON.parse(images))
        //   }
        //
        //   if(cover_photo) {
        //     // if not cover photo an blob image name.......
        //     if (cover_photo.indexOf("/") !== -1) {
        //       updatedProduct.cover_photo = cover_photo
        //     } else {
        //       // if cover photo an blob image name. now search upload photo with blob name and make it as a cover photo
        //       uploadedImages.forEach(i => {
        //         if (i.indexOf(cover_photo) !== -1) {
        //           updatedProduct.cover_photo = i
        //         }
        //       })
        //     }
        //   } else {
        //     updatedProduct.cover_photo = uploadedImages[0]
        //   }
        //
        //   updatedProduct.images = uploadedImages
        //
        //   let doc = await ProductCollection.findOneAndUpdate({
        //     _id: new ObjectId(id)
        //   }, {
        //     // @ts-ignore
        //     $set: updatedProduct
        //   })
        //
        //   let updated: ProductDescriptionType = {
        //     description: description,
        //     updated_at: new Date()
        //   }
        //
        //   if(highlight && typeof highlight === "string" && highlight !== "{}"){
        //     updated.highlight =  JSON.parse(highlight)
        //   }
        //   if(seller_rules && typeof seller_rules === "string" && seller_rules !== "{}"){
        //     updated.seller_rules = JSON.parse(seller_rules)
        //   }
        //
        //   if(details && typeof details === "string"){
        //     updated.details = JSON.parse(details)
        //   }
        //
        //
        //   let doc2: any = await ProductDescriptionCollection.updateOne(
        //     { product_id: new ObjectId(id) },
        //     { $set: updated }
        //   )
        //
        //   if(doc2.modifiedCount === 0){
        //     let {_id, ...otherUpdated} = updated
        //     doc2 = await ProductDescriptionCollection.insertOne({
        //       ...otherUpdated,
        //       updated_at: new Date(),
        //       created_at: new Date(),
        //       product_id: new ObjectId(id)
        //     })
        //   }
        //
        //   res.send(doc)
        //
        //   client?.close()
        //
        // })
    } catch (ex) {
        console.log(ex);
        next(ex);
    } finally {
        // client?.close()
    }
};


// add new product
export const saveProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    fileUpload(req, async (err, {fields, files}) => {
        try {
            if (err) return errorResponse(next, "Form data parsing error")

            if (!files) return errorResponse(next, "No File found")

            let {
                title,
                price,
                discount = 0,
                brandId,
                categoryId,
                qty = 0,
                shippingCost = 0,
                tax = 0,
                videoLink,
                sellerRules = "[]",
                highlight = "[]",
                sku,
                summary,
                productType,
                minOrder = 1,
                attributes = "{}",
                specification = "{}"
            } = fields as any;


            let product = await Product.findOne({$or: [{sku: Number(sku), title: title}]})
            if (product) return errorResponse(next, "Product Name or Sku already exists")


            let validate = new Validator(
                {
                    title: {type: "text", required: true},
                    price: {type: "number", required: true},
                    brandId: {type: "text", required: true},
                    categoryId: {type: "text", required: true},
                    sellerId: {type: "text", required: true},
                    qty: {type: "number", required: true},
                    attributes: {type: "object", required: true},
                    coverPhoto: {
                        type: "text",
                        required: true,
                        errorMessage: "not allowed",
                    },
                },
                {abortEarly: true}
            );

            let errors = validate.validate({
                title,
                price: Number(price),
                brandId,
                categoryId,
                sellerId: req.authUser._id.toString(),
                qty: Number(qty),
                attributes: attributes !== "" ? JSON.parse(attributes) : {},
            });

            if (errors) {
                res.status(409).json({message: errors});
                return;
            }

            let removeBadCharacter = title.replace(/["!@#.<$%^&*()>?/|}{]/g, "")

            console.log(ApproveStatus)

            let newProduct: Product | null = new Product({
                productType,
                sku: Number(sku),
                title,
                slug: slugify(removeBadCharacter, {lower: true, replacement: "-", locale: "en", strict: true, trim: true}),
                price: Number(price),
                discount: Number(discount),
                brandId: new ObjectId(brandId),
                categoryId: new ObjectId(categoryId),
                sellerId: new ObjectId(req.authUser._id),
                updatedAt: new Date(),
                createdAt: new Date(),
                qty: Number(qty),
                sold: 0,
                views: 0,
                attributes: JSON.parse(attributes),
                coverPhoto: "",
                approveStatus: req.authUser.roles.includes(Roles.ADMIN) ? ApproveStatus.Accepted : ApproveStatus.Pending,
                isActive: !!req.authUser.roles.includes(Roles.ADMIN),
                isMall: !!req.authUser.roles.includes(Roles.ADMIN),
            });


            // filter attributes
            let attributesObj = await parseJson(attributes)
            if (attributesObj) {
                newProduct.attributes = attributesObj
            }


            let images: string[] = []
            let promises: any[] = []

            if (files) {
                for (let filesKey in files) {
                    promises.push(
                        uploadImage(files[filesKey], {dir: "dream-bazar", fieldName: filesKey, overwrite: true})
                    )
                }
            }

            let result = await Promise.allSettled(promises)

            let isFail = false
            if (result) {
                for (let resultElement of result) {
                    if (resultElement.status === "rejected") {
                        isFail = true
                    } else {
                        if (resultElement.value.fieldName === "coverPhoto") {
                            newProduct.coverPhoto = resultElement.value.secure_url
                        } else {
                            images.push(resultElement.value.secure_url)
                        }
                    }
                }
            } else {
                isFail = true
            }


            if (isFail) {
                return errorResponse(next, "File Upload fail")
            }

            newProduct = await newProduct.save<Product>()


            if (newProduct) {

                let productDescription = new ProductDescription({
                    productId: newProduct._id,
                    images: images,
                    minOrder: Number(minOrder),
                    tax: Number(tax),
                    highlight: [],
                    specification: {},
                    sellerRules: [],
                    videoLink: videoLink,
                    shippingCost: Number(shippingCost),
                    summary: summary,
                })


                let highlightArray = await parseJson(highlight)
                // if provide valid json
                if (highlightArray) {
                    productDescription.highlight = highlightArray
                }


                let sellerRulesArray = await parseJson(sellerRules)
                // if provide valid json
                if (sellerRulesArray) {
                    productDescription.sellerRules = sellerRulesArray
                }


                let specificationObj = await parseJson(specification)
                // if provide valid json
                if (specificationObj) {
                    productDescription.specification = specificationObj
                }


                ProductDescription.findAndUpdate(
                    {productId: new ObjectId(newProduct._id)},
                    {$set: productDescription},
                    {upsert: true}
                ).then(() => {

                    successResponse(res, StatusCode.Created, {
                        message: "Product added successfully",
                        product: newProduct,
                    });

                })
                    .catch(async (ex) => {
                        if (newProduct?._id) {
                            await Product.deleteById(newProduct._id.toString())
                        }
                        return next(ex);
                    })


            } else {
                errorResponse(next, "Internal error", StatusCode.InternalServerError)
            }

        } catch (ex) {
            next(ex);
        }
    })

}


// update product for any field
export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {id} = req.params;


    try {


        fileUpload<ProductType>(req, async (err, {fields, files}) => {

            if (err) return errorResponse(next, "Form data parsing error")

            let {
                title,
                price,
                views,
                discount,
                brandId,
                categoryId,
                qty,
                sku,
                _id,
                shippingCost,
                tax,
                isActive,
                productType,
                minOrder = 1,
                videoLink,
                sellerRules = "[]",
                highlight = "[]",
                summary = "",
                attributes = "{}",
                specification = "{}",
            } = fields as any;


            if (!sku && !_id) return errorResponse(next, "Please Provide Product SKU code or product Id")


            let product = await Product.findOne<Product>({$or: [{sku: Number(sku)}, {_id: new ObjectId(id)}]})
            if (!product) return errorResponse(next, "Product not found", StatusCode.NotFound)


            if (err) return errorResponse(next, "Form data parsing error")
            let updateProduct = {...product}
            if (title) updateProduct.title = title
            if (price) updateProduct.price = Covert.number(price)
            if (discount) updateProduct.discount = Covert.number(discount)
            if (productType) updateProduct.productType = productType
            if (views) updateProduct.views = views
            if (brandId && isObjectId(brandId)) updateProduct.brandId = new ObjectId(brandId)
            if (categoryId && isObjectId(categoryId)) updateProduct.categoryId = new ObjectId(categoryId)
            if (qty) updateProduct.qty = Covert.number(qty)
            if (sku) updateProduct.sku = Covert.number(sku)


            let attributesObj = await parseJson(attributes)

            if (attributesObj) {
                updateProduct.attributes = attributesObj
            }

            // only change it admin
            if (req.authUser.roles.includes(Roles.ADMIN)) {
                if (fields?.approveStatus) updateProduct.approveStatus = fields.approveStatus
                updateProduct.isMall = true;
            }

            if (isActive) updateProduct.isActive = Covert.boolean(isActive)

            // detail collection
            let desc = await ProductDescription.findOne({productId: new ObjectId(id)})
            let updateProductDetail: ProductDescriptionType = {}
            if (desc) {
                updateProductDetail = {...desc}
            }
            updateProductDetail = {
                ...updateProductDetail,
                productId: id,
            }

            if (shippingCost) updateProductDetail.shippingCost = Covert.number(shippingCost)
            if (summary) updateProductDetail.summary = summary
            if (videoLink) updateProductDetail.videoLink = videoLink
            if (tax) updateProductDetail.tax = Covert.number(tax)
            if (minOrder) updateProductDetail.minOrder = Covert.number(minOrder)


            let highlightArray = await parseJson(highlight)
            // if provide valid json
            if (highlightArray) {
                updateProductDetail.highlight = highlightArray
            }

            let sellerRulesArray = await parseJson(sellerRules)

            // if provide valid json
            if (sellerRulesArray) {
                updateProductDetail.sellerRules = sellerRulesArray
            }

            let specificationObj = await parseJson(specification)
            // if provide valid json
            if (specificationObj) {
                updateProductDetail.specification = specificationObj
            }

            // update new images
            let images: string[] = []
            let promises: any[] = []

            if (files) {
                for (let filesKey in files) {
                    promises.push(
                        uploadImage(files[filesKey], {dir: "dream-bazar", fieldName: filesKey, overwrite: true})
                    )
                }
            }

            let resultUpdateImages = await Promise.allSettled(promises)


            if (resultUpdateImages) {

                for (let resultElement of resultUpdateImages) {
                    if (resultElement.status === "rejected") {

                    } else {
                        if (resultElement.value.fieldName === "coverPhoto") {
                            updateProduct.coverPhoto = resultElement.value.secure_url
                        } else {
                            images.push(resultElement.value.secure_url)
                        }
                    }
                }
            }


            let result = await Product.findAndUpdate<Product>({$or: [{sku: Number(sku)}, {_id: new ObjectId(id)}]},
                {$set: updateProduct}
            );
            await ProductDescription.findAndUpdate<Product>({productId: new ObjectId(id)},
                {$set: updateProductDetail},
                {upsert: true}
            );
            successResponse(res, StatusCode.Created, {message: "product updated", updateProduct});

        })
    } catch (ex) {
        next(ex);
    }
};


// make duplicate product
export const saveProductsAsDuplicate = async (req: Request, res: Response, next: NextFunction) => {
};


export const fetchCategoryProducts = async (req: Request, res: Response, next: NextFunction) => {
    const {categoryId} = req.params;
    const fetchEachSectionItems = 10;

    let client;
};


export const productFiltersPost = async (req: Request, res: Response, next: NextFunction) => {

};


export const productFiltersGetV2 = async (req: Request, res: Response, next: NextFunction) => {
    let client;

    // try {
    // 	const { c: ProductCollection, client: cc } = await dbConnect("brand");
    // 	client = cc;
    //
    // 	let query = req.query;
    //
    // 	let { pagePage, perPage, ...other } = query;
    //
    // 	let cursor;
    //
    // 	if (other.sold) {
    // 		cursor = ProductCollection.aggregate([
    // 			{ $sort: { sold: Number(other.sold) } },
    // 			{ $limit: 20 },
    // 		]);
    // 	} else if (other.discount) {
    // 		cursor = ProductCollection.aggregate([
    // 			{ $sort: { discount: Number(other.discount) } },
    // 			{ $limit: 20 },
    // 		]);
    // 	} else if (other.views) {
    // 		cursor = ProductCollection.aggregate([
    // 			{ $sort: { views: Number(other.views) } },
    // 			{ $limit: 20 },
    // 		]);
    // 	} else if (other.updated_at) {
    // 		cursor = ProductCollection.aggregate([
    // 			{ $sort: { updated_at: Number(other.updated_at) } },
    // 			{ $limit: 20 },
    // 		]);
    // 	}
    // 	let p = [];
    // 	await cursor.forEach((c) => {
    // 		p.push(c);
    // 	});
    //
    // 	res.send(p);
    // } catch (ex) {
    // 	console.log(ex);
    // 	res.send([]);
    // } finally {
    // 	client?.close();
    // }
};

function getFeatureProducts() {
    return new Promise(async (resolve, reject) => {
        try {

            // let shops = await Shop.find<Shop[]>({isApproved: true, isActive: true}, {projection: {featuresProducts: 1}})
            let shops = await Shop.find<Shop[]>({}, {projection: {featuresProducts: 1}})
            let featuresProductIds: string[] = []
           
            shops.forEach(sh => {
                if (sh.featuresProducts) {
                    featuresProductIds = [...featuresProductIds, ...sh.featuresProducts]
                }
            })

            let products = Product.find({
                // isActive: true,
                // approveStatus: "accepted",
                _id: {
                    $in: featuresProductIds.map(productId => new ObjectId(productId))
                }
            })

            resolve(products)
        } catch (ex) {
            resolve(null)
        }
    })
}

export const getHomepageSectionProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // let client: any;

    const {sectionSlugs} = req.body

    let promises: any = []

    function Promisify(data, promise, result2?: Promise<any>) {
        return new Promise(async (resolve, reject) => {
            let arr = await promise

            let count;
            if (result2) {
                count = await result2
            }

            resolve({
                data,
                arr,
                count
            })
        })
    }

    function filterQuery(sectionSlug: HomeSectionSlug, section) {

        let categoryIds = []
        switch (sectionSlug) {
            case HomeSectionSlug.PopularProducts :
                return [
                    {
                        $match: {
                            isActive: true,
                            approveStatus: "accepted",
                            _id: {
                                $in: featuredProducts.map(fp => new ObjectId(fp))
                            }
                        }
                    },
                    {$limit: 10}
                ]

            case HomeSectionSlug.LatestOffer :
                return [
                    {
                        $match: {
                            // isActive: true,
                            // approveStatus: "accepted",

                        }
                    },
                    {
                        $sort: {
                            discount: -1,
                        },
                    },
                    {$limit: 10}
                ]

            case HomeSectionSlug.TrendingNow :
                return [
                    {
                        $sort: {
                            sold: -1,
                            views: -1
                        }
                    },
                    {$limit: 10}
                ]

            case HomeSectionSlug.HomeANDKitchenEssentials :
                categoryIds = []
                if (section.filter.categoryIds) {
                    categoryIds = section.filter.categoryIds
                }

                return [
                    {
                        $match: {
                            categoryId: {$in: categoryIds.map((catId: string) => new ObjectId(catId))}
                        }
                    },
                    {$limit: 10}
                ]

            case HomeSectionSlug.TopDealsOnTVsAppliances :

                // television categories
                if (section.filter.categoryIds) {
                    categoryIds = section.filter.categoryIds
                }

                return [
                    {
                        $match: {
                            categoryId: {$in: categoryIds.map((catId: string) => new ObjectId(catId))}
                        }
                    },
                    {$limit: 10}
                ]


            default:
                return [
                    {$limit: 10}
                ]

        }

    }


    sectionSlugs.forEach(slug => {
        let sectionItem = homeSectionData.find(sec => sec.sectionSlug === slug)

        if (slug === HomeSectionSlug.FeaturedProducts) {
            let result = getFeatureProducts()
            let result2 = Product.count()
            promises.push(Promisify(sectionItem, result, result2))

        } else if (slug === HomeSectionSlug.TopBrandsCarousel) {
            // this can be control from admin. to store these id in database

            let topBrandNames = ["Samsung", "nokia", "Apple", "A4Tech", "Airtel", "Intel", "vivo", "MSI", "LG"]
            let brands = Brand.find({
                name: {$in: topBrandNames}
            })
            promises.push(Promisify(sectionItem, brands))

        } else {
            let result = Product.aggregate(filterQuery(slug, sectionItem))
            let result2 = Product.count()
            promises.push(Promisify(sectionItem, result, result2))
        }


    })


    try {
        let group = {}
        let result = await Promise.allSettled(promises)
        if (result && Array.isArray(result)) {
            result.forEach(item => {
                if (item.status === "fulfilled") {
                    if (item.value.data && item.value.arr) {
                        group[item.value.data.sectionSlug] = {
                            data: item.value.arr,
                            count: item.value.count,
                            pageNumber: 1,
                            pageSize: 10
                        }
                    }

                }
            })
        }

        successResponse(res, StatusCode.Ok, group)
    } catch (ex) {
        next(ex)
    } finally {

    }
}

export const getHomepageSection = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let activeSectionProducts = homeSectionData.filter(item => item.isActive).sort((a, b) => a.index - b.index)
        successResponse(res, StatusCode.Ok, activeSectionProducts)

    } catch (ex) {
        next(ex)
    } finally {

    }
};


export const productFiltersPostV2 = async (req: TypedRequestBody<{
    categoryIds?: string[]
    brandIds?: string[]
    pageNumber: number
    perPage: number
    sortBy: { fieldName: string, order: number }
    attributes: {}
    searchBy: { fieldName: string, value?: string }

}>, res: Response, next: NextFunction) => {

    /** example body payload
     {
        "categoryIds": ["60df5e546419f56b97610616", "60df5e546419f56b97610608"],
        "brandIds": ["60df5e546419f56b97610601"],
        "sortBy": {"field": "created_at", "order": 1},
        "attributes": {
            "form_factor": ["mini_itx", "df"],
            "generation": [1]
        }
    }
     */

    let {
        sortBy,
        categoryIds,
        brandIds = [],
        attributes,
        pageNumber = 1,
        perPage = 10,
        searchBy

    } = req.body;


    try {
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

        successResponse(res, 200, {products: result, totalItems: totalDocument})

    } catch (ex) {
        next(ex)
    }
};


export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    try {
        let doc = await Product.deleteOne({_id: new ObjectId(id)});
        if (doc.deletedCount > 0) {
            ProductDescription.deleteOne({productId: new ObjectId(id)}).then().catch()
            successResponse(res, StatusCode.Ok, "product deleted");
        } else {
            errorResponse(next, "product not found", StatusCode.NotFound);
        }
    } catch (ex) {
        next(ex);
    }
};

// export const toggleWishList = async (req: Request, res: Response, next: NextFunction) => {
// 	const { id } = req.params;
// 	let client;
// 	const { productId } = req.body;
// 	try {
// 		const { db, client: cc } = await dbConnect();
// 		client = cc;
// 		const UsersCollection = db.collection("users");
// 		const ProductCollection = db.collection("brand");
//
// 		if (req.user_id) {
// 			let user: any = await UsersCollection.findOne({
// 				_id: new ObjectId(req.user_id),
// 			});
// 			let exist = false;
// 			await user.wishlist.forEach((w) => {
// 				exist = w === productId;
// 			});
// 			// console.log(exist)
// 			let u: any = { result: { nModified: 0 } };
// 			if (!exist) {
// 				u = await UsersCollection.updateOne(
// 					{ _id: new ObjectId(req.user_id) },
// 					{ $push: { wishlist: new ObjectId(productId) } }
// 				);
// 			} else {
// 				u = await UsersCollection.updateOne(
// 					{ _id: new ObjectId(req.user_id) },
// 					{ $pull: { wishlist: new ObjectId(productId) } }
// 				);
// 			}
//
// 			if (u.result.nModified > 0) {
// 			}
//
// 			res.send(u);
// 		} else {
// 			res.status(403).send("Please login first");
// 			// send unauthorize response
// 		}
// 	} catch (ex) {
// 		next(ex);
// 	} finally {
// 		client?.close();
// 	}
// };

export const uploadHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // fileUploadHandler(req, "upload", "image", (err, r)=>{
        //
        //   if(err){
        //     throw new Error(err)
        //   }
        //
        //   let imagesLink = []
        //   let cover_photo = ""
        //
        //   if(r?.files?.image){
        //     for (let i = 0; i < r.files.image.length; i++) {
        //       const link = r.files.image[i];
        //       imagesLink.push(link.path)
        //       if(r?.fields?.cover_photo){
        //         let match = link.path.lastIndexOf(r.fields.cover_photo)
        //         if(match !== -1){
        //           cover_photo = link.path
        //         }
        //       }
        //     }
        //   }
        //
        //   console.log(r);
        //
        // })
    } catch (ex) {
        console.log(ex);
    }
};


export async function getProductAttributes(req: Request, res: Response, next: NextFunction) {
    try {
        let attributes = await Attributes.find()
        successResponse(res, StatusCode.Ok, attributes)
    } catch (ex) {
        next(ex)
    }
}

export async function addAttribute(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            attributeName,
            attributeLabel,
            isRange = false,
            options,
        } = req.body

        let attribute = await Attributes.findOne({attributeName: attributeName})
        if (attribute) return errorResponse(next, "Attribute already exists", StatusCode.Conflict);

        let attr: any = new Attributes({
            attributeName,
            attributeLabel,
            isRange,
            options,
        })


        attr = await attr.save()

        if (attr) {
            successResponse(res, StatusCode.Created, attr)
        }
    } catch (ex) {
        next(ex)
    }
}

export async function updateAttribute(req: Request, res: Response, next: NextFunction) {
    try {
        const attributeId = req.params.id
        const {
            attributeName,
            attributeLabel,
            isRange = false,
            options,
        } = req.body

        let updateData = {}

        if (attributeName) updateData["attributeName"] = attributeName
        if (attributeLabel) updateData["attributeLabel"] = attributeLabel
        if (isRange) updateData["isRange"] = isRange
        if (options) updateData["options"] = options

        let isUpdated = await Attributes.findOneAndUpdate(
            {_id: new ObjectId(attributeId)},
            {$set: updateData}
        )
        if (isUpdated) {
            successResponse(res, StatusCode.Created, updateData)
        }
    } catch (ex) {
        next(ex)
    }
}

export async function deleteAttribute(req: Request, res: Response, next: NextFunction) {
    try {
        const attributeId = req.params.id
        let isDeleted = await Attributes.deleteById(attributeId)
        if (isDeleted) {
            successResponse(res, StatusCode.Ok, isDeleted)
        }
    } catch (ex) {
        next(ex)
    }
}


export async function makeLocalCache(req: Request, res: Response, next: NextFunction) {
    // try {
    //     let brand = ""
    //     let db = await mongoConnect()
    //     let ii = db.collection("t")
    //     let p: any = await ii.find({}).toArray()
    //     p.forEach(item=>{
    //
    //         setTimeout(async ()=>{
    //             let r = await category.insertOne({...item})
    //             console.log(r)
    //         }, 400)
    //     })
    //
    //     res.send(p)
    //
    // } catch (ex) {
    //     next(ex)
    // }
}