import {ObjectId} from "mongodb";
import {errorResponse, successResponse} from "../response";
import {createToken, getToken, parseToken} from "../jwt";
import {Roles, StatusCode} from "../types";
import User from "../models/User";
import {hashCompare} from "../hash";
import {NextFunction, Request, Response} from "express"
import Product from "../models/Product";
import {Covert} from "../dataConvert";
import isObjectId from "../utilities/isObjectId";


export const adminAuthLoading = async (req, res, next) => {
    const token = getToken(req)
    if (token) {
        parseToken(token, async (err, data) => {
            if (!err) {
                try {
                    let admin = await User.findOne<User>({
                        email: data.email,
                        roles: {$in: [Roles.ADMIN]},
                        _id: new ObjectId(data._id)
                    })
                    delete admin.password

                    successResponse(res, StatusCode.Ok, admin)

                } catch (ex: any) {
                    return errorResponse(next, ex.message, StatusCode.Unauthorized)
                }
            } else {
                return errorResponse(next, "Please Login", StatusCode.Unauthorized)
            }
        })
    } else {
        return errorResponse(next, "Please Login", StatusCode.Unauthorized)
    }
}


export const adminLogin = async (req, res, next) => {

    const {email, password} = req.body

    try {
        let admin = await User.findOne<User>({email, roles: {$in: [Roles.ADMIN]}})
        if (!admin) {
            return errorResponse(next, "Unauthorized you are not admin ", StatusCode.UnprocessableEntity)
        }

        let isMatch = await hashCompare(password, admin.password as string)

        if (!isMatch) {
            return errorResponse(next, "Please Provide valid password", StatusCode.Forbidden)
        }

        let token = createToken(admin._id as ObjectId, admin.email, [Roles.ADMIN])
        delete admin.password
        successResponse(res, StatusCode.Created, {
            message: 'Login success',
            token: token,
            admin: admin
        })

    } catch (ex) {
        next(ex)
    }
}


export const updateAdminProfile = async (req, res, next) => {

}


export const updateProductViaAdmin = async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params;

    try {


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
            sellerRules,
            highlight,
            summary = "",
            attributes,
            specification,
            approveStatus
        } = req.body

        console.log(req.body)

        if (!sku && !id) return errorResponse(next, "Please Provide Product SKU code or product Id")

        let product = await Product.findOne<Product>({$or: [{sku: Number(sku)}, {_id: new ObjectId(id)}]})
        if (!product) return errorResponse(next, "Product not found", StatusCode.NotFound)

        let updateProduct: Product = {} as Product
        if (title) updateProduct.title = title
        if (price) updateProduct.price = Covert.number(price)
        if (discount) updateProduct.discount = Covert.number(discount)
        if (productType) updateProduct.productType = productType
        if (views) updateProduct.views = views
        if (brandId && isObjectId(brandId)) updateProduct.brandId = new ObjectId(brandId)
        if (categoryId && isObjectId(categoryId)) updateProduct.categoryId = new ObjectId(categoryId)
        if (qty) updateProduct.qty = Covert.number(qty)
        if (sku) updateProduct.sku = Covert.number(sku)
        if (approveStatus) updateProduct.approveStatus = approveStatus
        if (attributes) updateProduct.attributes = attributes


        let result = await Product.findAndUpdate<Product>({$or: [{sku: Number(sku)}, {_id: new ObjectId(id)}]},
            {$set: updateProduct}
        );

        console.log(updateProduct)

        successResponse(res, StatusCode.Created, {message: "product updated", updateProduct});

    } catch (ex) {
        next(ex)
    }

}