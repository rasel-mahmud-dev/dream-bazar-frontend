import {ACTION_TYPES, Brand } from "store/types/index";

/**
 Toggle product attribute section in product filter page on sidebar,
 */
export interface FetchBrands {
    type: ACTION_TYPES.FETCH_BRANDS,
    payload: Brand[]

}


/**
 Toggle product attribute section in product filter page on sidebar,
 */
export interface FetchBrandForCategoriesAction {
    type: ACTION_TYPES.FETCH_CATEGORY_BRANDS,
    payload: {
        categoryName: string,
        brands: Brand[]
    }
}



export type BrandActionTypes = FetchBrandForCategoriesAction | FetchBrands

