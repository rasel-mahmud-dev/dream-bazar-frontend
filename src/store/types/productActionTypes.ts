import {ACTION_TYPES} from "store/types";

export interface ToggleProductAttributeAction {
    type: ACTION_TYPES.TOGGLE_PRODUCT_ATTRIBUTE,
    payload: {
        attributeName: string,
        categoryId: string
    }
}

export type ProductActions = ToggleProductAttributeAction

export type ProductActionTypes = ProductActions