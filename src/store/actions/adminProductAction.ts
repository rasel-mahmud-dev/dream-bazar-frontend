import apis from "src/apis";
import api, {getApi} from "src/apis";
import {ACTION_TYPES, CategoryType, Scope, StatusCode} from "store/types";
import {Dispatch} from "redux";



export const fetchProductAttributesAction = (productAttributes, dispatch: Dispatch) => {
    return new Promise<CategoryType[] | null>(async (resolve, reject) => {
        if (productAttributes && productAttributes.length > 0) {
            resolve(productAttributes)
            // for updating operation
            dispatch({
                type: ACTION_TYPES.FETCH_PRODUCT_ATTRIBUTES,
                payload: productAttributes
            })
        } else {
            let {data, status} = await apis.get<CategoryType[] | null>(`/api/product-attributes`)
            if (status === StatusCode.Ok) {
                dispatch({
                    type: ACTION_TYPES.FETCH_PRODUCT_ATTRIBUTES,
                    payload: data
                })
                resolve(data)
            } else {
                resolve(null)
            }
        }
    })
}



export function fetchProducts(pageNumber) {
    return new Promise<[any, any]>(async (resolve) => {
        try {
            const {data, status} = await api.get(`/api/products?perPage=200&pageNumber=${pageNumber}`)
            resolve([data.products, null])
        } catch (ex) {
            resolve([null, ex])
        }
    })
}


export function updateProductAction<T>(adminProducts, productId: string, updatedProduct, dispatch) {

    return new Promise<[status: number, data: T]>(async (resolve, reject) => {
        try {
            const {data, status} = await apis.patch("/api/product/" + productId, updatedProduct)
            if (status === 201) {
                dispatch({
                    type: ACTION_TYPES.UPDATE_PRODUCT,
                    payload: {
                        _id: productId,
                        ...data.updateProduct
                    }
                })
            }
            resolve([status, data])
        } catch (ex) {
            reject(ex)
        }
    })
}