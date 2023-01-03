import {ACTION_TYPES, Brand, CategoryType} from "src/store/types";

export interface BrandStateType {
    brands: {
        total: number;
        cached: any[];
    };
    /// make caching brand for individual category
    brandsForCategory: {},
}


const initialState: BrandStateType = {
    /// make caching brand for individual category
    brandsForCategory: {},
    brands: {
        total: 0,
        cached: [],
    },
};


const brandReducer = (state: BrandStateType = initialState, action) => {
    let updatedState: BrandStateType = {...state};

    switch (action.type) {


        /// make caching brand for individual category
        case ACTION_TYPES.SET_BRAND_FOR_CATEGORY:
            // let updatesBrandForCategory = [...updatedState.brandsForCategory]
            // let hasBrandCatIdx = updatesBrandForCategory.findIndex(bforCat => bforCat._id === action.payload.id)
            //
            // if (hasBrandCatIdx === -1) {
            //     updatesBrandForCategory = [...updatesBrandForCategory, action.payload]
            // }
            // updatedState.brandsForCategory = updatesBrandForCategory

            return updatedState;

        default:
            return state;
    }
};



export default brandReducer
