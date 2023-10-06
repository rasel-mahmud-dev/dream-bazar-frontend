import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../response";
import { Roles, StatusCode } from "../types";
import Shop from "../models/Shop";
import Validator from "../utilities/validator";
import { ObjectId } from "mongodb";
import fileUpload from "../services/fileUpload/fileUpload";
import { uploadImage } from "../services/cloudinary";
import Product from "../models/Product";
import isObjectId from "../utilities/isObjectId";



/** Fetch shop detail for customer visit shop detail .*/
export const getShopDetail = async (req: Request, res: Response, next: NextFunction) => {
    const {sellerId = "", shopName} = req.query
    try {

        let filter = {}
        if(sellerId){
            filter = {sellerId: new ObjectId(sellerId as string)}
        }else if(shopName){
            filter = {shopName}
        }

        let shop: any = await Shop.aggregate([
            {$match: filter},
            { $lookup: {
                    from: "products",
                    localField: "sellerId",
                    foreignField: "sellerId",
                    as: "products"
                } },

            {
                $project: {
                    seller: {
                        username: 1
                    },
                    isActive: 1,
                    isApproved: 1,
                    isSuspense: 1,
                    sellerId: 1,
                    createdAt: 1,
                    shopAddress: 1,
                    shopBanner: 1,
                    shopEmail: 1,
                    shopLogo: 1,
                    shopName: 1,
                    shopPhone: 1,
                    updatedAt: 1,
                    totalProducts: {
                        $size: "$products"
                    }
                }
            }
        ])



        if(shop && shop.length > 0) {
            shop = shop[0]

            successResponse(res, StatusCode.Ok, shop)

        }

    } catch (ex) {
        next(ex)
    }
}



/** Fetch all shops for admin dashboard .*/
export const getAllShops = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let shop = await Shop.aggregate([

            {
                $lookup: {
                    from: "users",
                    localField: "sellerId",
                    foreignField: "_id",
                    as: "seller"
                }
            },
            { $unwind: { path: "$seller", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    seller: {
                        username: 1
                    },
                    isActive: 1,
                    isApproved: 1,
                    isSuspense: 1,
                    sellerId: 1,
                    createdAt: 1,
                    shopAddress: 1,
                    shopBanner: 1,
                    shopEmail: 1,
                    shopLogo: 1,
                    shopName: 1,
                    shopPhone: 1,
                    updatedAt: 1,
                }
            }
        ])
        successResponse(res, StatusCode.Ok, shop)

    } catch (ex) {
        next(ex)
    }
}


/** Fetch shop products with pagination .*/
export const getShopProducts = async (req: Request, res: Response, next: NextFunction) => {

    if(!isObjectId(req.params.sellerId)){
        return errorResponse(next, "Please provide valid sellerId", StatusCode.UnprocessableEntity)
    }

    try {

        let filter = {sellerId: new ObjectId(req.params.sellerId)}

        let {pageNumber = 1, perPage = 10}  = req.query

        let skip = (Number(pageNumber) - 1) * 10

        let products = await Product.find(filter, {skip: skip, limit: Number(perPage)})

        successResponse(res, StatusCode.Ok, products)

    } catch (ex) {
        next(ex)
    }
}


/** Fetch shop for customer .*/
export const getShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shopId = req.params.shopId
        let shop = await Shop.findOne({ _id: new ObjectId(shopId) })
        successResponse(res, StatusCode.Ok, shop)

    } catch (ex) {
        next(ex)
    }
}


/** Create Shop for seller and admin user.*/

export const createShop = async (req: Request, res: Response, next: NextFunction) => {


    fileUpload<any>(req, async (err, { fields, files }) => {
        try {
            if (err) return errorResponse(next, "Form data parsing error")

            const {
                shopName,
                shopEmail,
                shopAddress,
                shopPhone,
            } = fields

            let shop = await Shop.findOne({ shopName: shopName });
            if (shop) return errorResponse(next, "This Names Shop already exist")

            let validate = new Validator(
                {
                    shopName: { type: "text", required: true },
                    shopEmail: { type: "text", required: true },
                    shopAddress: { type: "text", required: true },
                    shopPhone: { type: "text", required: true },
                    coverPhoto: {
                        type: "text",
                        required: true,
                        errorMessage: "not allowed",
                    },
                },
                { abortEarly: true }
            );

            let errors = validate.validate({
                shopName,
                shopEmail,
                shopAddress,
                shopPhone,
            });

            if (errors) {
                return errorResponse(next, errors, StatusCode.UnprocessableEntity)
            }

            const newShop = new Shop({
                shopName,
                shopEmail,
                shopAddress,
                shopLogo: "",
                isApproved: !!req.authUser.roles.includes(Roles.ADMIN),
                isActive: true,
                shopPhone,
                sellerId: new ObjectId(req.authUser._id)
            })


            //  upload image on cloudinary
            let promises: any[] = []

            if (files) {
                for (let filesKey in files) {
                    promises.push(
                        uploadImage(files[filesKey], { dir: "dream-bazar", fieldName: filesKey, overwrite: false })
                    )
                }
            }


            let result = await Promise.allSettled(promises)

            for (let resultElement of result) {
                if (resultElement.status !== "rejected") {

                    if (resultElement.value.fieldName === "shopLogo") {
                        newShop.shopLogo = resultElement.value.secure_url
                    }
                    if (resultElement.value.fieldName === "shopBanner") {
                        newShop.shopBanner = resultElement.value.secure_url
                    }

                }
            }

            let doc = await newShop.save<Shop>();

            if (doc?._id) {
                successResponse(res, StatusCode.Created, doc)
            } else {
                errorResponse(next, "Shop creating fail")
            }

        } catch (ex) {
            next(ex)
        }
    })
}


/** Update Shop for admin user.*/
export const updateShop = async (req: Request, res: Response, next: NextFunction) => {
    const { update = {} } = req.body
    const { shopId } = req.params;
    try {
        let doc = await Shop.findAndUpdate({ _id: new ObjectId(shopId) }, {
            $set: {
                ...update
            }
        })

        successResponse(res, StatusCode.Created, update)

    } catch (ex) {
        next(ex)
    }
}


/** Update Shop status for seller  user.*/
export const updateShopStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { isActive } = req.body

    try {
        let doc = await Shop.findAndUpdate({ sellerId: new ObjectId(req.authUser._id) }, {
            $set: {
                isActive: isActive
            }
        })
        successResponse(res, StatusCode.Created, isActive)

    } catch (ex) {
        next(ex)
    }
}


/** Fetch current seller or admin shop information .*/
export const getShopInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let shop = await Shop.findOne({ sellerId: new ObjectId(req.authUser._id) })
        successResponse(res, StatusCode.Ok, shop)

    } catch (ex) {
        next(ex)
    }
}



/** Create Shop for seller and admin user.*/

export const updateShopInfo = async (req: Request, res: Response, next: NextFunction) => {
    fileUpload<any>(req, async (err, { fields, files }) => {
        try {
            if (err) return errorResponse(next, "Form data parsing error")

            const {
                shopName,
                shopEmail,
                shopAddress,
                shopPhone,
            } = fields

            let shop = await Shop.findOne<Shop>({ sellerId: new ObjectId(req.authUser._id) });
            if (!shop) return errorResponse(next, "Shop not found")


            const updateShop = { ...shop }
            if (shopName) updateShop.shopName = shopName
            if (shopEmail) updateShop.shopEmail = shopEmail
            if (shopPhone) updateShop.shopPhone = shopPhone
             if (shopAddress) updateShop.shopAddress = shopAddress


            //  upload image on cloudinary
            let promises: any[] = []

            if (files) {
                for (let filesKey in files) {
                    promises.push(
                        uploadImage(files[filesKey], { dir: "dream-bazar", fieldName: filesKey, overwrite: false })
                    )
                }
            }


            let result = await Promise.allSettled(promises)
            if (result) {
                for (let resultElement of result) {
                    if (resultElement.status !== "rejected") {

                        if (resultElement.value.fieldName === "shopLogo") {
                            updateShop.shopLogo = resultElement.value.secure_url
                        }

                        if (resultElement.value.fieldName === "shopBanner") {
                            updateShop.shopBanner = resultElement.value.secure_url
                        }

                    }
                }
            }

            let doc = await Shop.findAndUpdate({ _id: new ObjectId(shop._id) }, { $set: updateShop })

            if (doc) {
                successResponse(res, StatusCode.Created, updateShop)
            } else {
                errorResponse(next, "Shop update fail")
            }

        } catch (ex) {
            next(ex)
        }
    })
}
