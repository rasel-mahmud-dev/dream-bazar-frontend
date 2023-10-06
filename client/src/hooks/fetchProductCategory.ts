import {useEffect, useState} from "react";
import useAppDispatch from "src/hooks/useAppDispatch";
import {fetchProductCategoriesAction} from "actions/categoryAction";

function useFetchProductCategory() {

    const dispatch = useAppDispatch()

    useEffect(()=>{
        fetchProductCategoriesAction(dispatch)
    }, [])

    return
}

export default useFetchProductCategory;