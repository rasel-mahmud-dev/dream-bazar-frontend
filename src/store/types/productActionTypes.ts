import {ACTION_TYPES, Brand} from "store/types/index";
import { ProductType} from "reducers/productReducer";


/**
 Toggle product attribute section in product filter page on sidebar,
 */
export interface ToggleProductAttributeAction {
    type: ACTION_TYPES.TOGGLE_ATTRIBUTE_SECTION,
    payload: {
        attributeName: string,
        categoryId?: string
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
 select Brand for product filter
 */
export interface SelectFilterBrandAction {
    type: ACTION_TYPES.SELECT_FILTER_BRAND,
    payload: Brand
}

/**
 clear Brand for product filter
 */
export interface ClearFilterBrandAction {
    type: ACTION_TYPES.CLEAR_FILTER_BRAND,
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

// change filter search values
export type ChangeFilterSearchAction = {
    type: ACTION_TYPES.CHANGE_FILTER_SEARCH,
    payload: {
        fieldName: string;
        value?: string;
        order?: number;
    },
}

export type ChangeProductAttributeAction  = {
    type: ACTION_TYPES.CHANGE_ATTRIBUTE_VALUES,
    payload: {
        attributeName: string
        attributeValue: string | number
    }
}

export type FetchProductStoreInfoAction  = {
    type: ACTION_TYPES.FETCH_PRODUCT_SHOP_INFO,
    payload: any
}


// fetch relevant products and store in caches
export type FetchRelevantProductsAction  = {
    type: ACTION_TYPES.FETCH_RELEVANT_PRODUCTS,
    payload: {
        cacheName: string,
        products: ProductType[]
    }
}

export type ProductActionTypes = FetchHomeSectionProductAction | FilterProductAction | ChangePaginationAction | ChangeProductAttributeAction |
    SelectFilterBrandAction | ClearFilterBrandAction | FetchProductStoreInfoAction | FetchRelevantProductsAction | ChangeFilterSearchAction