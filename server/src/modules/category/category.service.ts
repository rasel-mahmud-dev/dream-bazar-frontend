import Category from "../../models/Category";
import throwError from "../../utilities/throwError";
import {StatusCode} from "../../types";
import {uploadImage} from "../../cloudinary";


function parseFormDataToObject<T>(formData): T {
    let obj: T = {} as T
    for (let formDataKey in formData) {
        if (formData[formDataKey] === "null") {
            obj[formDataKey] = null
        } else if (formData[formDataKey] === "false") {
            obj[formDataKey] = false
        } else if (formData[formDataKey] === "true") {
            obj[formDataKey] = true
        } else if (formData[formDataKey] === "undefined") {
            obj[formDataKey] = undefined
        } else if (!isNaN(Number(formData[formDataKey]))) {
            obj[formDataKey] = Number(formData[formDataKey])
        } else {
            try {
                obj[formDataKey] = JSON.parse(formData[formDataKey] || "")
            } catch (ex) {
                obj[formDataKey] = ""
            }
        }
    }
    return obj
}


class CategoryService {

    getCategories() {
        return Category.find({})
    }

    getCategoryDetail(findOption: object) {
        return Category.findOne(findOption)
    }

    async saveCategory(fields: {
        filterAttributes: string[]
        defaultExpand: string[]
        name: string
        isProductLevel: boolean
        parentId?: string
        logo?: string
        productDescriptionSection: { "": [] }
    }, files: any) {

        try {
            const {
                name,
                parentId = null,
                logo,
                isProductLevel = true,
                defaultExpand = [],
                filterAttributes = [],
                renderProductAttr = [],
                productDescriptionSection = {}
            } = parseFormDataToObject<{
                name: string
                parentId: object
                logo: string
                isProductLevel: boolean
                defaultExpand: string[]
                filterAttributes: string[]
                renderProductAttr: string[]
                productDescriptionSection: any
            }>(fields)

            // check it this category already exists or not
            let result = await Category.findOne({name})
            if (result) return throwError("Category Already exists", StatusCode.Conflict)

            let newPath = logo;

            const newLogo = files?.["logo"]?.[0]?.filepath

            if (newLogo) {
                let info = await uploadImage(newLogo, "dream-bazar")
                if (info) {
                    newPath = info.secure_url
                }
            }

            let newCategory = new Category({
                name,
                logo: newPath,
                parentId: (parentId ? parentId : null) as unknown as string,
                isProductLevel: isProductLevel,
                defaultExpand,
                filterAttributes,
                renderProductAttr,
                productDescriptionSection,
            })

            newCategory = await newCategory.save<Category>()
            if (!newCategory) return throwError("Internal error. Please try Again")
            return newCategory

        } catch (ex) {
            throw ex
        }
    }


}


export default new CategoryService();
