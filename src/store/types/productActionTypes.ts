import {ACTION_TYPES, Brand, CategoryType} from "store/types";
import {CategoryDetail} from "reducers/productReducer";



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
 Change current product category
 */
export interface ChangeCategoryAction {
    type: ACTION_TYPES.CHANGE_CATEGORY,
    payload: {
        selected: { id: string, name: string },
        allNestedIds: string[]
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
 Fetch current category detail that contains product attribute section,
    expand default values and detail info about current category.
 */
export interface FetchCategoryDetailAction {
    type: ACTION_TYPES.FETCH_CATEGORY_DETAILS,
    payload: CategoryDetail
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
 Change Pagination data for product filter page
 */
export interface FetchFlatCategoriesAction {
    type: ACTION_TYPES.FETCH_FLAT_CATEGORIES,
    payload: CategoryType[]
}

/**
All product actions types
* */


export type ProductActionTypes = FetchHomeSectionProductAction