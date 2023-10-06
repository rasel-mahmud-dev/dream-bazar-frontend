import Brand from "../../models/Brand";
import throwError from "../../utilities/throwError";
import {StatusCode} from "../../types";
import {uploadImage} from "../../cloudinary";
import {Document, ObjectId} from "mongodb";
import parseJson from "../../utilities/parseJson";

class BrandService {
    async getBrands() {
        return await Brand.find({})
    }

    async getBrand(id: string) {
        return await Brand.findOne<Brand>({_id: new ObjectId(id)})
    }

    async saveBrand(fields: {
        name: string,
        forCategory: string,
        logo?: string
    }, files: any) {

        try {
            const {
                name,
                forCategory = '[]',
                logo
            } = fields

            let result = await Brand.findOne({name})
            if (result) return throwError("Brand Already exists", StatusCode.Conflict)

            let newPath = logo;

            const newLogo = files?.["logo"]?.[0]?.filepath

            if (newLogo) {
                let info = await uploadImage(newLogo, "dream-bazar")
                if (info) {
                    newPath = info.secure_url
                }
            }

            let c = await parseJson(forCategory)

            let newBrand = new Brand({
                name,
                logo: newPath,
                forCategory: c
            })

            newBrand = await newBrand.save()
            if (!newBrand) return throwError("Internal error. Please try Again")
            return newBrand

        } catch (ex) {
            throw ex
        }
    }

    async updateBrand(id: string, fields: {
        name: string,
        forCategory: string,
        logo?: string
    }, files: any) {
        try {
            const {
                name,
                forCategory = '[]',
                logo
            } = fields


            let category = await Brand.findOne<Brand>({_id: new ObjectId(id)})
            if (!category) return throwError("Brand not exists", StatusCode.Conflict)

            let newPath = logo;

            const newLogo = files?.["logo"]?.[0]?.filepath

            if (newLogo) {
                let info = await uploadImage(newLogo, "dream-bazar")
                if (info) {
                    newPath = info.secure_url
                }
            }

            let c = await parseJson(forCategory)

            let updatedBrandData = {} as Document
            if (name) updatedBrandData.name = name
            if (forCategory) updatedBrandData.forCategory = c
            if (newPath) updatedBrandData.logo = newPath
            updatedBrandData.updatedAt = new Date();

            let result = await Brand.findAndUpdate({_id: new ObjectId(id)}, {
                $set: updatedBrandData,
            }, {
                upsert: true
            })

            if (!result.modifiedCount) return throwError("Internal error. Please try Again")
            return updatedBrandData

        } catch (ex) {
            throw ex
        }
    }

}


export default new BrandService();
