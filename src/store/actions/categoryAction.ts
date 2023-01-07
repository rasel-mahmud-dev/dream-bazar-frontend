
import {ACTION_TYPES, CategoryType, StatusCode} from "store/types";
import {AddFlatCategoryAction, ChangeCategoryAction, FetchCategoryDetailAction, FetchFilterAttributesAction} from "store/types/categoryActionTypes";
import apis from "src/apis";
import {AppDispatch} from "src/store";
import errorMessageCatch from "src/utills/errorMessageCatch";


export function changeCategoryAction({selected, allNestedIds}): ChangeCategoryAction {
    return {
        type: ACTION_TYPES.CHANGE_CATEGORY,
        payload: {
            selected,
            allNestedIds
        }
    }
}

export async function fetchCategoryDetailAction(dispatch: AppDispatch, categoryId: string) {
    try{
        let {data, status} = await apis.get("/api/category?id="+categoryId)
        if(status === 200){
            dispatch({
                type: ACTION_TYPES.FETCH_CATEGORY_DETAILS,
                payload: data
            })
        }
    } catch(ex){

    }
}


export function fetchCategoryDetail(categoryId: string) {
    return new Promise<[any, any]>(async (resolve) => {
        try {
            let {status, data} = await apis.get(`/api/category?id=${categoryId}`)
            if (status === StatusCode.Ok) {
                resolve([data, null])
            }
        } catch (ex) {
            resolve([null, errorMessageCatch(ex)])
        }
    })
}


export function addFlatCategory(category: CategoryType): AddFlatCategoryAction  {
    return {
        type: ACTION_TYPES.ADD_FLAT_CATEGORY,
        payload: category
    }
}


export async function fetchProductAttributesAction(dispatch: (args:  FetchFilterAttributesAction)=>void){

        try {
            let {status, data} = await apis.get(`/api/product-attributes`)
            if (status === StatusCode.Ok) {
                dispatch({
                    type: ACTION_TYPES.FETCH_FILTER_ATTRIBUTES,
                    payload: data
                })
            }
        } catch (ex) {

        }


}