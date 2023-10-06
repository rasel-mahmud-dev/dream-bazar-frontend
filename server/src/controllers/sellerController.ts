import {ObjectId} from "mongodb";
import {errorResponse, successResponse} from "../response";
import Product from "../models/Product";
import fileUpload from "../services/fileUpload/fileUpload";
import {uploadImage} from "../services/cloudinary";
import {mongoConnect} from "../services/mongodb/database.service";
import {StatusCode} from "../types";
import Shop from "../models/Shop";
import User from "../models/User";


export const getSeller = async (req, res, next) => {
    const {sellerId} = req.params
    try {
        let seller = await User.findOne({_id: new ObjectId(sellerId)})
        successResponse(res, 200, {seller})
    } catch (ex) {
        next(ex)
    }
}

export const createSeller = async (req, res, next) => {

    // fileUpload<any>(req, async (err, {fields, files}) => {
    //     try {
    //
    //         if (err) return errorResponse(next, "Form data parsing error")
    //
    //         if (!files) return errorResponse(next, "No File found error")
    //
    //         const {
    //             firstName,
    //             lastName="",
    //             password,
    //             email,
    //             shopPhone,
    //             shopName,
    //             shopAddress,
    //         } = fields;
    //
    //         let db = await mongoConnect();
    //         let UserCollection = db.collection("users")
    //         let ShopCollection = db.collection("shops")
    //
    //
    //         let seller = await UserCollection.findOne({email: email})
    //         if (seller) {
    //             return errorResponse(next, "Seller already registered", StatusCode.Conflict)
    //         }
    //
    //         let shop = await ShopCollection.findOne({shopName: shopName})
    //         if (shop) {
    //             return errorResponse(next, "Shop already exists", StatusCode.Conflict)
    //         }
    //
    //
    //         if (!(firstName && password && email && shopPhone && shopName && shopAddress)) {
    //             return errorResponse(next, "Please provide valid credential", StatusCode.UnprocessableEntity)
    //         }
    //
    //         let newSeller: User | null = new User({
    //             firstName,
    //             roles: [Roles.SELLER],
    //             lastName,
    //             password,
    //             email,
    //             username: firstName  + " " + lastName,
    //             avatar: "",
    //             createdAt: new Date(),
    //             updatedAt: new Date()
    //         })
    //
    //         let [err2, hash] = await createHash(password)
    //         if(err2){
    //             return  errorResponse(next, err2, StatusCode.InternalServerError)
    //         }
    //
    //         newSeller.password = hash
    //
    //         let newShop: null | Shop  = new Shop({
    //             createdAt: new Date(),
    //             isApproved: false,
    //             isSuspense: false,
    //             sellerId: undefined,
    //             shopBanner: "",
    //             shopLogo: "",
    //             updatedAt: new Date(),
    //             isActive: true,
    //             shopPhone,
    //             shopName,
    //             shopAddress
    //         })
    //
    //         let promises: Promise<any>[] = []
    //         for (let filesKey in files) {
    //             promises.push(uploadImage(files[filesKey], {dir: "dream-bazar", fieldName: filesKey}))
    //         }
    //
    //         try {
    //             let all = await Promise.allSettled(promises)
    //             all.forEach((result) => {
    //                 if (result.status === "fulfilled") {
    //                     let photo = result.value
    //                     if (photo.fieldName === "avatar") {
    //                         if (newSeller instanceof User) {
    //                             newSeller[photo.fieldName] = photo.secure_url;
    //                         }
    //                     } else {
    //                         if (newShop instanceof Shop) {
    //                             newShop[photo.fieldName] = photo.secure_url
    //                         }
    //                     }
    //                 } else {
    //                     return errorResponse(next, "File Upload fail", StatusCode.Conflict)
    //                 }
    //             })
    //         } catch (ex) {
    //             return errorResponse(next, "File Upload fail", StatusCode.Conflict)
    //         }
    //
    //
    //         let doc = await UserCollection.insertOne(newSeller)
    //
    //         if(doc && doc.insertedId){
    //             newShop.sellerId = new ObjectId(doc.insertedId)
    //             newShop = await newShop.save()
    //
    //             successResponse(res, StatusCode.Created, {
    //                 seller: newSeller,
    //                 shop: newShop
    //             })
    //         } else {
    //             errorResponse(next, "", StatusCode.InternalServerError)
    //         }
    //
    //     } catch (ex) {
    //         next(ex)
    //     }
    // })

}


export const createShop = async (req, res, next) => {
    fileUpload<any>(req, async (err, {fields, files}) => {
        try {

            if (err) return errorResponse(next, "Form data parsing error")

            if (!files) return errorResponse(next, "Photo missing")

            const {
                shopPhone,
                shopEmail,
                shopName,
                shopAddress,
            } = fields;

            let shop = await Shop.findOne({shopName: shopName, sellerId: new ObjectId(req.authUser._id)})
            if (shop) {
                return errorResponse(next, "Shop already exists", 409)
            }

            if (!(shopPhone && shopName && shopAddress)) {
                return errorResponse(next, "Please provide valid credential", 409)
            }

            let newShop: Shop | null = new Shop({
                isActive: true,
                sellerId: new ObjectId(req.authUser._id),
                isSuspense: false,
                isApproved: false,
                shopEmail: shopEmail,
                shopName,
                shopPhone,
                shopAddress,
                shopLogo: "",
                shopBanner: "",
            })


            let promises: Promise<any>[] = []
            for (let filesKey in files) {
                promises.push(uploadImage(files[filesKey], {dir: "dream-bazar", fieldName: filesKey}))
            }

            try {
                let all = await Promise.allSettled(promises)
                all.forEach((result) => {
                    if (result.status === "fulfilled") {
                        let photo = result.value
                        if (newShop instanceof Shop) {
                            newShop[photo.fieldName] = photo.secure_url
                        }
                    } else {
                        return errorResponse(next, "File Upload fail", 409)
                    }
                })
            } catch (ex) {
                return errorResponse(next, "File Upload fail", 409)
            }

            newShop = await newShop.save()
            if (newShop) {
                successResponse(res, StatusCode.Created, newShop)
            } else {
                errorResponse(next, "Shop create fail", StatusCode.InternalServerError)
            }

        } catch (ex) {
            next(ex)
        }
    })
}


export const updateShop = async (req, res, next) => {

    fileUpload<any>(req, async (err, {fields, files}) => {
        try {

            if (err) return errorResponse(next, "Form data parsing error")

            const {shopId} = req.params

            const {
                shopPhone,
                shopName,
                shopAddress,
                shopLogo,
                shopBanner
            } = fields;

            if (!shopId) {
                return errorResponse(next, "Please provide shop id", StatusCode.UnprocessableEntity)
            }

            if (!files || !(shopLogo || shopBanner)) return errorResponse(next, "Photo missing")

            let shop = await Shop.findOne({
                _id: new ObjectId(shopId),
                sellerId: new ObjectId(req.authUser._id)
            })
            if (!shop) {
                return errorResponse(next, "Shop Not found", StatusCode.NotFound)
            }

            if (!(shopPhone && shopName && shopAddress)) {
                return errorResponse(next, "Please provide valid credential", StatusCode.UnprocessableEntity)
            }


            let newShop: Shop | null = new Shop()
            if (shopName) newShop.shopName = shopName
            if (shopPhone) newShop.shopPhone = shopPhone
            if (shopAddress) newShop.shopAddress = shopAddress

            let promises: Promise<any>[] = []
            for (let filesKey in files) {
                promises.push(uploadImage(files[filesKey], {dir: "dream-bazar", fieldName: filesKey}))
            }

            try {
                let all = await Promise.allSettled(promises)
                all.forEach((result) => {
                    if (result.status === "fulfilled") {
                        let photo = result.value
                        if (newShop instanceof Shop) {
                            newShop[photo.fieldName] = photo.secure_url
                        }
                    } else {
                        return errorResponse(next, "File Upload fail", 409)
                    }
                })
            } catch (ex) {

            }

            if (shopLogo) newShop.shopLogo = shopLogo
            if (shopBanner) newShop.shopBanner = shopBanner


            newShop = await newShop.updateOne(
                {sellerId: new ObjectId(req.authUser._id)},
                {$set: newShop}
            )
            console.log(newShop)
            if (newShop) {
                successResponse(res, StatusCode.Created, newShop)
            } else {
                errorResponse(next, "", StatusCode.InternalServerError)
            }

        } catch (ex) {
            next(ex)
        }
    })
}


export const getSellerProducts = async (req, res, next) => {
    try {
        let products = await Product.find({sellerId: new ObjectId(req.authUser._id)})
        successResponse(res, 200, {products: products})
    } catch (ex) {
        next(ex)
    }
}


export const deleteSellerProduct = async (req, res, next) => {
    const {productId} = req.params
    try {
        let db = await mongoConnect()
        let ProductCollection = db.collection("products")
        let DetailsCollection = db.collection("product_descriptions")
        let doc = await ProductCollection.deleteOne({sellerId: new ObjectId(req.authUser._id), _id: new ObjectId(productId)})
        if (doc.deletedCount) {
            await DetailsCollection.deleteOne({productId: new ObjectId(productId)})
            successResponse(res, StatusCode.Created, "deleted")
        }
    } catch (ex) {
        next(ex)
    }
}

export const getSellerShop = async (req, res, next) => {
    try {
        let shop = await Shop.findOne<Shop>({sellerId: new ObjectId(req.authUser._id)})
        successResponse(res, StatusCode.Ok, shop)
    } catch (ex) {
        next(ex)
    }
}



export const addToFeatureProduct = async (req, res, next) => {
    const {productIds} = req.body
    try {
        let shop = await Shop.findOne<Shop>({sellerId: new ObjectId(req.authUser._id)})
        if(!shop) return  errorResponse(next, "Shop not found")

        let result = await Shop.findAndUpdate(
            {_id: new ObjectId(shop._id)}, {
            $addToSet: {
                featuresProducts: { $each: productIds }
            }
        })

        successResponse(res, StatusCode.Created, {})
    } catch (ex) {
        next(ex)
    }
}
export const removeFeatureProduct = async (req, res, next) => {
    const {productIds} = req.body
    try {
        let shop = await Shop.findOne<Shop>({sellerId: new ObjectId(req.authUser._id)})
        if(!shop) return  errorResponse(next, "Shop not found")

        let result = await Shop.findAndUpdate(
            {_id: new ObjectId(shop._id)}, {
                $pull: {
                    featuresProducts: { $in: productIds }
                }
            })

        successResponse(res, StatusCode.Created, {})
    } catch (ex) {
        next(ex)
    }
}