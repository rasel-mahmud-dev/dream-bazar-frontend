import {ACTION_TYPES, Brand, CategoryType} from "store/types/index";
import {Attribute, CategoryDetail} from "reducers/categoryReducer";




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
 Change current product category
 */
export interface ChangeCategoryAction {
    type: ACTION_TYPES.CHANGE_CATEGORY,
    payload: {
        selected: { _id: string, name: string },
        allNestedIds: string[]
    }
}



/**
 * fetch all brand for current category
 * @example
 * mobiles => samsung, nokia, apple...
 * television => samsung, walton, mi...
 * */
export interface FetchCategoryBrandsAction {
    type: ACTION_TYPES.FETCH_CATEGORY_BRANDS,
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
 Fetch database categories
 */
export interface FetchFlatCategoriesAction {
    type: ACTION_TYPES.FETCH_FLAT_CATEGORIES,
    payload: CategoryType[]
}


/**
 Fetch database categories
 */
export interface FetchProductCategoriesAction {
    type: ACTION_TYPES.FETCH_PRODUCT_CATEGORIES,
    payload: CategoryType[]
}



/**
 add flat category
 */
export interface AddFlatCategoryAction {
    type: ACTION_TYPES.ADD_FLAT_CATEGORY,
    payload: CategoryType
}




/**
 fetch all product filter able attribute
 */
export interface FetchFilterAttributesAction {
    type: ACTION_TYPES.FETCH_FILTER_ATTRIBUTES,
    payload: Attribute[]
}




export type CategoryActionTypes = ToggleProductAttributeAction | ChangeCategoryAction | FetchCategoryBrandsAction | FetchCategoryDetailAction
    | ChangeProductFilterPaginationAction
    | FetchFlatCategoriesAction
|   AddFlatCategoryAction | FetchFilterAttributesAction | FetchProductCategoriesAction


