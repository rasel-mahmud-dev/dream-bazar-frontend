import {ACTION_TYPES, Brand} from "store/types";
import { ProductType} from "reducers/productReducer";


/**
 Toggle product attribute section in product filter page on sidebar,
 */
export interface ToggleProductAttributeAction {
    type: ACTION_TYPES.TOGGLE_PRODUCT_ATTRIBUTE,
    payload: {
        attributeName: string,
        categoryId: string
    }
}


/**
* fetch all brand for current category
* @example
* mobiles => samsung, nokia, apple...
* television => samsung, walton, mi...
* */
export interface FetchHomeSectionProductAction {
    type: ACTION_TYPES.FETCH_HOMEPAGE_SECTION_PRODUCTS,
    payload: {
        categoryName: string,
        brands: Brand[]
    }
}


/**
 Change Pagination data for product filter page
 */
export interface ChangeProductFilterPaginationAction {
    type: ACTION_TYPES.SET_FILTER_PAGINATION,
    payload: {
        totalItems: number;
        currentPage: number;
        viewPerPage: number;
    }
}

/**
All product actions types
* */

export type FilterProductAction = {
    type: ACTION_TYPES.FETCH_FILTER_PRODUCTS,
    payload: {
        products: ProductType[],
        totalItems: number | undefined
    },
}

export type ChangePaginationAction = {
    type: ACTION_TYPES.SET_FILTER_PAGINATION,
    payload: {
        totalItems: number;
        currentPage: number;
        viewPerPage: number;
    },
}


export type ProductActionTypes = FetchHomeSectionProductAction | FilterProductAction | ChangePaginationAction