import apis from "src/apis";
import {ACTION_TYPES, Brand, StatusCode} from "store/types";
import {FetchBrandForCategoriesAction, FetchBrands} from "store/types/brandActionTypes";
import {createAsyncThunk} from "@reduxjs/toolkit";


// this async action for redux toolkits
export const fetchBrandForCategory = createAsyncThunk(
    ACTION_TYPES.FETCH_CATEGORY_BRANDS,
    async function (payload: { allCatName: string, categoryIds: string[] }, store) {
        try {
            let {data, status} = await apis.post("/api/brands-category", {categories: payload.categoryIds})
            if (status === StatusCode.Ok) {
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


// fetch all brand for admin or seller userActionTypes.ts


// this async action for redux toolkits
export const fetchBrands = createAsyncThunk(
    ACTION_TYPES.FETCH_BRANDS,
    async function (_, store) {
        try {
            let {data, status} = await apis.get("/api/v1/brands")
            if (status === StatusCode.Ok) {
                store.dispatch<FetchBrands>({
                    type: ACTION_TYPES.FETCH_BRANDS,
                    payload: data
                })
            }
        } catch (ex) {

        }
    }
);



