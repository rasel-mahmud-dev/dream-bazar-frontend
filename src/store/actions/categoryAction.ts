
import {ACTION_TYPES, CategoryType, StatusCode} from "store/types";
import {ChangeCategoryAction, FetchCategoryDetailAction} from "store/types/categoryActionTypes";
import apis from "src/apis";
import {AppDispatch} from "src/store";


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