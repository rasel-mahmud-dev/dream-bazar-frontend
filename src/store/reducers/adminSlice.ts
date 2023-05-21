import {createSlice} from "@reduxjs/toolkit";


export interface Attributes {
    _id: string
    attributeLabel: string
    attributeName: string
    options: any[]
}


export interface AdminStateType {
    categoryDetails: any[]
    productAttributes: Attributes[]
}


const initialState: AdminStateType = {
    categoryDetails: [],
    productAttributes: []
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
    }
})

export const {fetchCategoryDetail, removeCategoryDetail, fetchProductAttributes} = adminSlice.actions
export default adminSlice
