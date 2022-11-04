
import {ProductStateType} from "reducers/productReducer";
import {ACTION_TYPES} from "store/types";

export default (state: ProductStateType, action)=>{
    let updateState = {...state}
 
    switch (action.type){
        
        case ACTION_TYPES.UPDATE_PRODUCT:
            let {_id } = action.payload
            let cacheKey: any =""
            let findIndex = -1
            let pCaches = updateState.adminProducts.cached
            for (let pCachesKey in pCaches) {
                findIndex = pCaches[pCachesKey].findIndex(p=>p._id === _id);
                if(findIndex !== -1){
                    cacheKey = pCachesKey
                    break;
                }
            }
            if(cacheKey && (findIndex !== -1)) {
                updateState.adminProducts.cached[cacheKey][findIndex] = {
                    ...updateState.adminProducts.cached[cacheKey][findIndex],
                    ...action.payload
                }
            }
            // updateState.adminProducts.cached
            return updateState
       
        case ACTION_TYPES.FETCH_ADMIN_PRODUCTS:
            let {total, products, pageNumber} = action.payload
   
            if(total) {
                updateState.adminProducts.total = total
            }
            updateState.adminProducts.cached = {
                ...updateState.adminProducts.cached,
                [pageNumber]: products
            }
            return updateState
        
        case ACTION_TYPES.FETCH_ADMIN_BRANDS:
            let {  brands } = action.payload
   
            if(action.payload.total) {
                updateState.adminBrands.total = action.payload.total
            }
            if(brands){
                updateState.adminBrands.cached = brands
            }
            return updateState
        
        case ACTION_TYPES.UPDATE_BRAND_CACHE:
            if(action.payload){
                updateState.adminBrands.cached = action.payload
            }
            return updateState
        
        
        case ACTION_TYPES.FETCH_ADMIN_CATEGORIES:
            let {  categories } = action.payload
            if(action.payload.total) {
                updateState.adminCategories.total = action.payload.total
            }
            if(categories){
                updateState.adminCategories.cached = categories
            }
            return updateState
        case ACTION_TYPES.FETCH_STATIC_FILES:
            
            updateState.adminStaticFiles = action.payload
            
            return updateState
        
        default :
            return state
    }
}

