// const dbConnect = require("../database")
// const {ObjectId} = require("mongodb")
// const formidable = require('formidable');
// const path = require("path")
// const { copyFile, mkdir, rm, slats } = require('fs/promises');
// const fileUpload = require("../utilities/fileUpload")
//
// const {createToken, getToken, parseToken} = require("../jwt")

import { NextFunction, Request, Response } from "express"
import { ObjectId } from "mongodb"
import ShippingAddress from "../models/ShippingAddress"
import { errorResponse, successResponse } from "../response"
import { StatusCode } from "../types"


export const getShippingAddresses = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let docs = await ShippingAddress.find({ customerId: new ObjectId(req.authUser._id) })
        successResponse(res, StatusCode.Ok, docs)

    } catch (ex) {
        next(ex)
    }
}

export const saveShippingAddress = async (req: Request, res: Response, next: NextFunction) => {

    const {
        address,
        apartmentSuit,
        city,
        country,
        firstName,
        lastName,
        isDefault,
        phone,
        zipCode,
        state,
        email,
    } = req.body

    try {
        let newShippingAddress = new ShippingAddress({
            customerId: new ObjectId(req.authUser._id),
            address,
            apartmentSuit,
            city,
            country,
            firstName,
            lastName,
            isDefault,
            phone,
            zipCode,
            state,
            email,
        })

        let result = await newShippingAddress.save()
        if (result) {
            successResponse(res, StatusCode.Created, result)

        } else {
            errorResponse(next, "Shipping addesss adding fail", StatusCode.InternalServerError)
        }

    } catch (ex) {
        next(ex)
    }
}
