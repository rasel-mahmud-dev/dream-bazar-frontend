

export const removeAllFilteredValue = (payload)=>(dispatch)=>{
  dispatch({
    type: "REMOVE_ALL_FILTER_VALUE",
    payload: payload
  })
}