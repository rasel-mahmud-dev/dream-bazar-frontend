import {ObjectId} from "mongodb";
import {errorResponse, successResponse} from "../response";
import Product from "../models/Product";
import fileUpload from "../services/fileUpload/fileUpload";
import Seller from "../models/Seller";
import {uploadImage} from "../services/cloudinary";
import {mongoConnect} from "../services/mongodb/database.service";
import {createToken, getToken, parseToken} from "../jwt";
import {Roles} from "../types";
import Shop from "../models/Shop";


// export const getSeller = async (req, res, next)=>{
//   const { sellerId } = req.params
//   try{
//     // let seller = await User.findOne({_id: new ObjectId(sellerId)})
//     // successResponse(res, 200, {seller})
//   } catch(ex){
//     next(ex)
//   }
// }


export const sellerAuthLoading = async (req, res, next) => {
    const token = getToken(req)
    if (token) {
        parseToken(token, async (err, data) => {
            if (!err) {
                try {
                    let seller = await Seller.findOne<Seller>({_id: new ObjectId(data._id)})
                    
                    delete seller.password
                    
                    seller["roles"] = [Roles.SELLER]
                    
                    successResponse(res, 200, seller)
                    
                } catch (ex: any) {
                    return errorResponse(next, ex.message, 404)
                }
            } else {
                return errorResponse(next, "Please Login", 404)
            }
        })
    } else {
        return errorResponse(next, "Please Login", 404)
    }
}


export const sellerLogin = async (req, res, next) => {
    
    const {email, password} = req.body
    
    try {
        let seller = await Seller.findOne<Seller>({email})
        if (!seller) {
            return errorResponse(next, "Please register", 404)
        }
        
        if (seller.password !== password) {
            return errorResponse(next, "Please Provide valid password", 401)
        }
        
        let token = createToken(seller._id as ObjectId, seller.email, [Roles.SELLER])
        delete seller.password
        successResponse(res, 201, {
            message: 'Login success',
            token: token,
            seller: seller
        })
        
    } catch (ex) {
        next(ex)
    }
}

export const createSeller = async (req, res, next) => {
    try {
        
        
        fileUpload(req, async (err, {fields, files}) => {
            
            if (err) return errorResponse(res, "Form data parsing error")
            
            if (!files) return errorResponse(res, "No File found error")
            
            const {
                firstName,
                lastName,
                password,
                email,
                phone,
                shopName,
                shopAddress,
            } = fields;
            
            let db = await mongoConnect();
            let SellerCollection = db.collection("sellers")
            let ShopCollection = db.collection("shops")
            
            
            let seller = await SellerCollection.findOne({$and: [{email: email}, {phone: phone}]})
            if (seller) {
                return errorResponse(next, "Seller already registered", 409)
            }
            
            let shop = await ShopCollection.findOne({shopName: shopName})
            if (shop) {
                return errorResponse(next, "Shop already exists", 409)
            }
            
            
            if (!(firstName && password && email && phone && shopName && shopAddress)) {
                return errorResponse(next, "Please provide valid credential", 409)
            }
            
            let newSeller: any = {
                firstName,
                roles: [Roles.SELLER],
                lastName,
                password,
                email,
                phone,
                avatar: "",
                createdAt: new Date(),
                updatedAt: new Date()
            }
            
            let newShop: any = {
                sellerId: "",
                shopName,
                shopAddress,
                shopLogo: "",
                shopBanner: ""
            }
            
            
            let promises: Promise<any>[] = []
            for (let filesKey in files) {
                promises.push(uploadImage(files[filesKey], {dir: "dream-bazar", fieldName: filesKey}))
            }
            
            try {
                let all = await Promise.allSettled(promises)
                all.forEach((result) => {
                    if (result.status === "fulfilled") {
                        let photo = result.value
                        if (photo.fieldName === "avatar") {
                            newSeller[photo.fieldName] = photo.secure_url;
                        } else {
                            newShop[photo.fieldName] = photo.secure_url
                        }
                    } else {
                        return errorResponse(next, "File Upload fail", 409)
                    }
                })
            } catch (ex) {
                return errorResponse(next, "File Upload fail", 409)
            }
            
            let {insertedId} = await SellerCollection.insertOne(newSeller)
            if (insertedId) {
                newSeller._id = insertedId
                try {
                    newShop.sellerId = insertedId
                    let resultShop = await ShopCollection.insertOne(newShop);
                    if (resultShop.insertedId) {
                        successResponse(res, 201, {
                            seller: newSeller,
                            shop: {
                                ...newShop,
                                _id: resultShop.insertedId
                            }
                        })
                    }
                } catch (ex: any) {
                    errorResponse(next, ex.message as string)
                    await Seller.deleteById(insertedId as any)
                }
            }
        })
        
    } catch (ex) {
        next(ex)
    }
}


export const updateShop = async (req, res, next) => {
    try {
        fileUpload(req, async (err, {fields, files}) => {
            
            if (err) return errorResponse(next, "Form data parsing error")
            
            const {
                shopContact,
                shopName,
                shopAddress,
                shopLogo,
                shopBanner
            } = fields;
            
            let db = await mongoConnect();
            
            let ShopCollection = db.collection("shops")

            let shop = await ShopCollection.findOne({sellerId: new ObjectId(req.authUser._id)})
            if (!shop) {
                return errorResponse(next, "Shop not found", 409)
            }
            
            let newShop: any = {}
            if(shopName) newShop.shopName = shopName
            if(shopContact) newShop.shopContact = shopContact
            if(shopAddress) newShop.shopAddress = shopAddress
            
            let promises: Promise<any>[] = []
            for (let filesKey in files) {
                promises.push(uploadImage(files[filesKey], {dir: "dream-bazar", fieldName: filesKey}))
            }
            
            try {
                let all = await Promise.allSettled(promises)
                all.forEach((result) => {
                    if (result.status === "fulfilled") {
                        let photo = result.value
                        newShop[photo.fieldName] = photo.secure_url
                    } else {
                        return errorResponse(next, "File Upload fail", 409)
                    }
                })
            } catch (ex) {
            
            }
    
            if(shopLogo) newShop.shopLogo = shopLogo
            if(shopBanner) newShop.shopBanner = shopBanner
    
            
            let resultShop = await ShopCollection.updateOne({
                sellerId: new ObjectId(req.authUser._id)
            },{
                $set: {...newShop}
            })
       
            successResponse(res, 201, newShop)
        })
        
    } catch (ex) {
        next(ex)
    }
}


export const getSellerProducts = async (req, res, next) => {
    try {
        let products = await Product.find({sellerId: new ObjectId(req.authUser._id)})
        successResponse(res, 200, {products: products})
    } catch (ex) {
        next(ex)
    }
}

export const getSellerShop = async (req, res, next) => {
    try {
        let shop = await Shop.findOne<Shop>({sellerId: new ObjectId(req.authUser._id)})
        successResponse(res, 200,  shop)
    } catch (ex) {
        next(ex)
    }
}