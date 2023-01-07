import {ACTION_TYPES, Brand, CategoryType} from "src/store/types";
import {CategoryActionTypes} from "store/types/categoryActionTypes";


export interface Attribute {
    _id?: string
    attributeName: string
    attributeLabel: string
    isMultiple?: boolean
    options: {name: string, value: any}[]
}

export type CategoryDetail = {
    _id?: string
    name?: string
    parentId?: string | null
    isProductLevel?: boolean
    logo?: string
    filterAttributes: string[]
    defaultExpand: string[]
    renderProductAttr: string[]
    productDescriptionSection?: {[key: string]: string[]} | null
    createdAt?: Date | string
    updatedAt?: Date | string


    filterAttributesValues?: Attribute[] // populated field

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
    attributeExpand: { [categoryId: string]: string[]};
    flatCategories: CategoryType[]
    productFilterAttributes: Attribute[]
}

const initialState: CategoryStateType = {
    category: {
        selected: null as any,
        allNestedIds: []
    },
    /// make caching brand for individual category
    brandsForCategory: {},
    categoryDetailCache: {},
    attributeExpand: {},
    flatCategories: null as unknown as CategoryType[],
    productFilterAttributes: []
};


const categoryReducer = (state = initialState, action: CategoryActionTypes) => {
    let updateState: CategoryStateType = {...state};


    switch (action.type) {

        case ACTION_TYPES.FETCH_FLAT_CATEGORIES:
            updateState.flatCategories = action.payload;
            return updateState;


        case ACTION_TYPES.ADD_FLAT_CATEGORY:
            return {
                ...state,
                flatCategories: [
                    ...state.flatCategories,
                    action.payload
                ]
            }


        case ACTION_TYPES.FETCH_CATEGORY_DETAILS:
            if(action.payload && action.payload._id) {
                updateState.categoryDetailCache[action.payload._id] = action.payload;

                // also set default expand product filter attribute section
                if(action.payload?.defaultExpand){
                    updateState.attributeExpand = {
                        ...updateState.attributeExpand,
                        [action.payload._id]: action.payload.defaultExpand
                    }
                }
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


        case ACTION_TYPES.TOGGLE_ATTRIBUTE_SECTION:
            const { attributeName, categoryId} = action.payload
            if(categoryId) {
                let updateAttributeExpand = {...updateState.attributeExpand}

                if(!updateAttributeExpand[categoryId]){
                    updateAttributeExpand[categoryId] = [attributeName]

                } else if(Array.isArray(updateAttributeExpand[categoryId])) {

                    if ( updateAttributeExpand[categoryId].includes(attributeName)) {
                        updateAttributeExpand[categoryId] = updateAttributeExpand[categoryId].filter(item => item !== attributeName)
                    } else {
                        updateAttributeExpand[categoryId] = [
                            ...updateAttributeExpand[categoryId],
                            attributeName
                        ]
                    }
                }

                return {
                    ...state,
                    attributeExpand: updateAttributeExpand
                }

            } else {
                return state
            }

        case ACTION_TYPES.FETCH_FILTER_ATTRIBUTES:
            return {
                ...state,
                productFilterAttributes: action.payload
            }


        default:
            return state;
    }
};


export default categoryReducer
