import { configureStore, combineReducers} from '@reduxjs/toolkit'
import productReducer from "reducers/productReducer";
import cartReducer from "reducers/cartReducer";
import authReducer from "reducers/authReducer";
import appReducer from "reducers/appReducer";
import sellerReducer from "reducers/sellerReducer";
import adminReducer from "reducers/adminReducer";
import categoryReducer from "reducers/categoryReducer";
import brandReducer from "reducers/brandReducer";


const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    brandState: brandReducer,
    cartState: cartReducer,
    authState: authReducer,
    appState: appReducer,
    sellerState: sellerReducer,
    adminState: adminReducer,
})

const store =  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
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