import apis from "src/apis";
import {ACTION_TYPES, CategoryType, StatusCode} from "store/types";
import {ChangeCategoryAction} from "store/types/categoryActionTypes";

export function fetchDeepNestedCategoryAction(categoryName: string){

    return async function (dispatch, getState){
        let a = getState().categoryState
        let {data, status } = await apis.get(`/api/category/nesting/?name=`+categoryName)
        if (status === StatusCode.Ok) {
            dispatch({
                type: ACTION_TYPES.FETCH_DEEP_NESTED_CATEGORY,
                payload: data
            })
            // resolve(data)
        } else {
            // resolve(null)
        }

        // if(nestedCategory){
        //     resolve(nestedCategory)
        // } else {
        //     let {data, status} = await apis.get(`/api/category/nesting/?name=`+categoryName)
        //     if (status === StatusCode.Ok) {
        //         dispatch({
        //             type: ACTION_TYPES.FETCH_DEEP_NESTED_CATEGORY,
        //             payload: data
        //         })
        //         resolve(data)
        //     } else {
        //         resolve(null)
        //     }
        // }

    }

}



export function changeCategoryAction({selected, allNestedIds}): ChangeCategoryAction {
    return {
        type: ACTION_TYPES.CHANGE_CATEGORY,
        payload: {
            selected,
            allNestedIds
        }
    }
}