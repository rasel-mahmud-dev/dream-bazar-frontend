import {ACTION_TYPES, Brand, CategoryType} from "src/store/types";
import {CategoryActionTypes} from "store/types/categoryActionTypes";


export type CategoryDetail = {
    catId: string
    catName: string
    defaultExpand: string[]
    filterAttributes: object[]
    filterAttributesValues: {
        attributeLabel: string
        attributeName: string
        options: any[]
        _id: string
    }[]
    productDescriptionSection: {}
    renderProductAttr: []
    _id: string

}

export type DeepNestedCategory = {
    parentId: string | null
    _id: string
    name: string
    sub?: DeepNestedCategory[]
}


export interface CategoryStateType {
    category: {
        selected: {
            name: string;
            _id: string;
            parentId?: string
        } | null,
        allNestedIds: string[]
    }
    categoryDetailCache: {
        [categoryId: string]: CategoryDetail
    },
    brandsForCategory: { [key: string]: Brand[] };
    flatCategories: CategoryType[] | null;
    deepNestedCategory: {
        [name: string]: DeepNestedCategory
    },
}

const initialState: CategoryStateType = {
    category: {
        selected: null as any,
        allNestedIds: []
    },
    /// make caching brand for individual category
    brandsForCategory: {},
    categoryDetailCache: {},
    flatCategories: null,
    deepNestedCategory: {}
};


const categoryReducer = (state = initialState, action: CategoryActionTypes) => {
    let updateState: CategoryStateType = {...state};


    switch (action.type) {

        case ACTION_TYPES.FETCH_FLAT_CATEGORIES:
            updateState.flatCategories = action.payload;
            return updateState;

        case ACTION_TYPES.FETCH_DEEP_NESTED_CATEGORY:

            updateState.deepNestedCategory = {
                ...updateState.deepNestedCategory,
                [action.payload.name]: action.payload
            }

            return updateState;


        case ACTION_TYPES.CHANGE_CATEGORY:
            updateState.category = {
                ...updateState.category,
                selected: action.payload.selected,
                allNestedIds: action.payload.allNestedIds
            }
            return updateState


        case ACTION_TYPES.FETCH_CATEGORY_BRANDS:
            const { categoryName, brands } = action.payload
            updateState.brandsForCategory = {
                ...updateState.brandsForCategory,
                [categoryName]: brands
            }
            return updateState


        case ACTION_TYPES.TOGGLE_PRODUCT_ATTRIBUTE:
            const {  attributeName, categoryId  } = action.payload
            if(categoryId){
                let cat = updateState.categoryDetailCache[categoryId]
                if(cat && cat.defaultExpand){
                    if(cat.defaultExpand.includes(attributeName)){
                        cat.defaultExpand = cat.defaultExpand.filter(item=>item !== attributeName)
                    } else {
                        cat.defaultExpand.push(attributeName)
                    }
                }
            }
            return updateState



        default:
            return state;
    }
};


export default categoryReducer
