import {createSlice} from "@reduxjs/toolkit";
import {ProductType} from "reducers/productSlice";
import {fetchProductsForAdmin} from "actions/adminProductAction";


export interface Attributes {
    _id: string
    attributeLabel: string
    attributeName: string
    options: any[]
}


export interface AdminStateType {
    categoryDetails: any[]
    productAttributes: Attributes[]
    allProducts: {
        products: ProductType[],
        total: number
    }
}


const initialState: AdminStateType = {
    categoryDetails: [],
    productAttributes: [],
    allProducts: {
        products: [],
        total: 0,
    }
}


const adminSlice = createSlice({
    name: "adminSlice",
    initialState: initialState,
    reducers: {

        fetchCategoryDetail: function (state, action) {
            state.categoryDetails = action.payload
            return state
        },

        removeCategoryDetail: function (state, action) {
            state.categoryDetails = [...state.categoryDetails.filter(cd => cd._id !== action.payload)]
            return state
        },

        fetchProductAttributes: function (state, action) {
            state.productAttributes = action.payload
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetchProductsForAdmin.fulfilled, (state, action) => {
            if (action.payload) {
                state.allProducts = action.payload
            }
        })


    }
})

export const {fetchCategoryDetail, removeCategoryDetail, fetchProductAttributes} = adminSlice.actions
export default adminSlice
