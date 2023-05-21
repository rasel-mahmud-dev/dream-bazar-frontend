import { configureStore, combineReducers} from '@reduxjs/toolkit'
import productReducer from "reducers/productSlice";
import cartReducer from "reducers/cartReducer";
import authReducer from "reducers/authReducer";
import appReducer from "reducers/appReducer";
import sellerReducer from "reducers/sellerReducer";
import adminSlice from "reducers/adminSlice";
import categoryReducer from "reducers/categoryReducer";
import brandReducer from "reducers/brandReducer";


const store =  configureStore({
    reducer: {
        productState: productReducer,
        categoryState: categoryReducer,
        brandState: brandReducer,
        cartState: cartReducer,
        authState: authReducer,
        appState: appReducer,
        sellerState: sellerReducer,
        adminState: adminSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ["NAME"],
            },
        }),
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store