import apis from "src/apis";
import {ACTION_TYPES} from "store/types";
import api from "src/apis";

export function fetchAdminBrandsAction(adminBrands, dispatch){
    if(!adminBrands.cached || adminBrands.cached.length === 0) {
        apis.get("/api/brands").then(({data, status}) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ADMIN_BRANDS,
                payload: {
                    total: data.length,
                    brands: data
                }
            })
        })
    }
}
export function fetchAdminProductsAction(adminProducts, pageNumber, dispatch){
    if(!adminProducts.cached[pageNumber] || adminProducts.cached[pageNumber].length === 0) {
        api.get(`/api/products?perPage=200&pageNumber=${pageNumber}`).then(({data, status}) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ADMIN_PRODUCTS,
                payload: {
                    total: data.total,
                    pageNumber: pageNumber,
                    products: data.products
                }
            })
        })
    }
    
}export function fetchAdminStaticFilesAction(adminStaticFiles,  dispatch){
    if(!adminStaticFiles || adminStaticFiles.length === 0) {
        api.get("/api/files/static-files").then(({data}) => {
            dispatch({
                type: ACTION_TYPES.FETCH_STATIC_FILES,
                payload: data
            })
        });
    }
    
}