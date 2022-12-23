import {ACTION_TYPES} from "store/types";


export const removeAllFilteredValue = (payload)=>(dispatch)=>{
  dispatch({
    type: "REMOVE_ALL_FILTER_VALUE",
    payload: payload
  })
}



export type SetFilterActionPayload = {
    brands?: { _id: string, name: string, logo?: string }[],
    sortBy?: { field: string; id: string; order: number }[];
    ideals?: string[]
}


export const setFilter = (payload: SetFilterActionPayload) :  { payload: SetFilterActionPayload, type: typeof ACTION_TYPES.ADD_FILTER} => {
    return {
        type: ACTION_TYPES.ADD_FILTER,
        payload: payload
    }
}