
// shop brand actions
import apis from "src/apis";
import {StatusCode} from "store/types";

export const fetchShopDetail =  function (query: string) {
    return new Promise(async (resolve)=>{
        try {
            let {data, status} = await apis.get(`/api/shop/detail/?${query}`)
            if (status === StatusCode.Ok) {
                resolve(data)
            }
        } catch (ex) {
            resolve(null)
        }
    })
}


export const fetchShopProducts =  function (sellerId: string, query: string) {
    return new Promise(async (resolve)=>{
        try {
            let {data, status} = await apis.get(`/api/shop/products/${sellerId}?${query}`)
            if (status === StatusCode.Ok) {
                resolve(data)
            }
        } catch (ex) {
            resolve(null)
        }
    })
}

