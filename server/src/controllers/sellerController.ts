import {ObjectId} from "mongodb";
import {errorResponse, successResponse} from "../response";
import Product from "../models/Product";
import fileUpload from "../services/fileUpload/fileUpload";
import Seller from "../models/Seller";
import Shop from "../models/Shop";
import {uploadImage} from "../services/cloudinary";
import {mongoConnect} from "../services/mongodb/database.service";
// import User from "../models/User";


// export const getSeller = async (req, res, next)=>{
//   const { sellerId } = req.params
//   try{
//     // let seller = await User.findOne({_id: new ObjectId(sellerId)})
//     // successResponse(res, 200, {seller})
//   } catch(ex){
//     next(ex)
//   }
// }

export const createSeller = async (req, res, next) => {
    try {
        
       
        
        
        fileUpload(req, async (err, {fields, files}) => {
            
            if (err) return errorResponse(res, "Form data parsing error")
            
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
            if(seller){
                return errorResponse(next, "Seller already registered", 409)
            }
            
            let shop = await ShopCollection.findOne({shopName: shopName})
            if(shop){
                return errorResponse(next, "Shop already exists", 409)
            }
            
            
            if(!(firstName &&  password &&  email && phone && shopName && shopAddress)){
                return errorResponse(next, "Please provide valid credential", 409)
            }
            
            let newSeller = await new Seller({
                firstName,
                lastName,
                password,
                email,
                phone,
            })
            
            let newShop = new Shop({
                sellerId: newSeller._id as ObjectId,
                shopName,
                shopAddress,
                shopLogo: "",
                shopBanner: ""
            })
            
            
            let promises: Promise<any>[] = []
            for (let filesKey in files) {
                promises.push(uploadImage(files[filesKey], {dir: "dream-bazar", fieldName: filesKey}))
            }
            
            promises.push(uploadImage(files["filesKey"], {dir: "dream-bazar", fieldName: "filesKey"}))
            
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
                    }
                })
            } catch (ex) {
            }
            
            let resultSeller = await newSeller.save<Seller>()
            if (resultSeller) {
                try {
                    newShop.sellerId = resultSeller._id as ObjectId
                    let resultShop = await newShop.save();
                    successResponse(res, 201, {
                        seller: resultSeller,
                        shop: resultShop
                    })
                } catch (ex: any) {
                    errorResponse(next, ex.message as string)
                    await Seller.deleteById(resultSeller._id as any)
                }
            }
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