import {ACTION_TYPES, Brand, CategoryType} from "store/types";

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



export type BrandActionTypes = FetchBrandForCategoriesAction

