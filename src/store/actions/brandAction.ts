import apis from "src/apis";
import {ACTION_TYPES} from "store/types";
import {FetchBrandForCategoriesAction} from "store/types/brandActionTypes";
import {createAsyncThunk} from "@reduxjs/toolkit";


// this async action for redux toolkits
export const fetchBrandForCategory = createAsyncThunk(
    ACTION_TYPES.FETCH_CATEGORY_BRANDS,
    async function (payload: { allCatName: string, categoryIds: string[] }, store) {
        try {
            let {data, status} = await apis.post("/api/brands-category", {categories: payload.categoryIds})
            if (status === 200) {
                store.dispatch<FetchBrandForCategoriesAction>({
                    type: ACTION_TYPES.FETCH_CATEGORY_BRANDS,
                    payload: {
                        brands: data.brands,
                        categoryName: payload.allCatName,
                    },
                })
            }
        } catch (ex) {

        }
    }
);