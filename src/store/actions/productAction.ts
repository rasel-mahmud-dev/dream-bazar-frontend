import {ACTION_TYPES, CategoryType, StatusCode} from "store/types"
import apis from "src/apis";
import {AppDispatch, RootState} from "src/store";
import errorMessageCatch from "src/utills/errorMessageCatch";
import api from "src/apis";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchBrandForCategoriesAction} from "store/types/brandActionTypes";
import {ChangeFilterSearchAction, FetchProductStoreInfoAction} from "store/types/productActionTypes";
import {fetchBrandForCategory} from "actions/brandAction";
import {HomePageSectionProduct} from "reducers/productSlice";


export const fetchProducts = () => async (dispatch, getState, api) => {
    const {data} = await api.get("/api/products")
    console.log(data)
}

export const fetchProduct = (id) => async (dispatch, getState, api) => {
    handlerLoader(dispatch, {isLoading: true, where: "product_details"})
    const {data} = await api.get(`/api/products/${id}`)
    dispatch({
        type: ACTION_TYPES.FETCH_PRODUCT,
        payload: data.product
    })
}

export const fetchProductForUpdate = (id, cb: (err: string, result: any) => void) => {
    apis.get(`/api/product/detail/${id}`).then(({status, data}) => {
        if (status === 200) {
            cb("", data)
        }
    }).catch(ex => {
        cb(errorMessageCatch(ex), null)
    })
}


// export const fetchBrandForCategory = (current_category_id) => async (dispatch, getState: () => RootState, api) => {
//     let data = await api.get("/api/brands",)
//
// }


// only count total filtered products. if changed these state

export function filterProductsAction2(payload, isCount: boolean, dispatch) {

    // !isCount && props.toggleAppMask(true)
    // !isCount && (props.toggleLoader && props.toggleLoader("Product-filter", true))

    const {
        brands,
        attributes,
        sortBy,
        paginate
    } = payload

    // let attributes = {}
    // if(filteredAttributes.length > 0 ){
    //     filteredAttributes.forEach(attr=>{
    //         let attrValArr: any = []
    //         attr.values.forEach(attrVal=>{
    //             attrValArr.push(attrVal.value)
    //         })
    //         attributes[attr.attribute_name] =  attrValArr
    //     })
    // }

    let brandIds: string[] = []
    if (brands) {
        brands.forEach((brand: any) => {
            brandIds.push(brand._id)
        })
    }

    interface bodyDataType {
        categoryId?: string,
        categoryIds?: string[],
        pageNumber: any;
        perPage: any;
        brandIds: string[];
        attributes: {};
        sortBy?: any
    }

    let bodyData: bodyDataType = {
        attributes: attributes,
        categoryIds: payload.categoryIds,
        brandIds: brandIds.length > 0 ? brandIds : [],
        sortBy: sortBy && sortBy.length > 0 ? sortBy : [],
        // category_id: currentCategorySelected._id,
        pageNumber: paginate && paginate.currentPage,
        perPage: paginate && paginate.viewPerPage
    }


    // if(currentNestedSubCategory && selectCategory.tree){
    //     bodyData.categoryIds =  getAllChildrenId(selectCategory.tree.id, flatCategories)
    // } else if(selectCategory && selectCategory.root){
    //     bodyData.categoryIds =  getAllChildrenId(selectCategory.root.id, flatCategories)
    // }
    //
    // let response = await api.post(`/api/products/filter/v2`, bodyData)
    //
    // props.toggleAppMask(false)
    // props.toggleLoader("Product-filter", false)
    //
    // cb(response.data)


    return new Promise(async function (resolve, reject) {
        try {
            let {status, data} = await api.post(`/api/products/filter/v2`, bodyData)
            if (status === 200) {
                dispatch({
                    type: ACTION_TYPES.FETCH_FILTER_PRODUCTS,
                    payload: {
                        products: data.products,
                        totalItems: data?.totalItems
                    },
                });
            }
            resolve(data)
        } catch (ex) {
            reject(ex)
        }
    })
}

interface MyData {
    brands: any,
    attributes: any,
    sortBy: any,
    paginate: any
    categoryIds: string[]
}

// Return type of the payload creator
// First argument to the payload creator
export const filterProductsAction = createAsyncThunk<any, MyData>("productStater/filterProducts", async (payload, thunkAPI) => {

    const {
        brands,
        attributes,
        sortBy,
        paginate
    } = payload


    let brandIds: string[] = []
    if (brands) {
        brands.forEach((brand: any) => {
            brandIds.push(brand._id)
        })
    }

    interface bodyDataType {
        categoryId?: string,
        categoryIds?: string[],
        pageNumber: any;
        perPage: any;
        brandIds: string[];
        attributes: {};
        sortBy?: any
    }

    let bodyData: bodyDataType = {
        attributes: attributes,
        categoryIds: payload.categoryIds,
        brandIds: brandIds.length > 0 ? brandIds : [],
        sortBy: sortBy && sortBy.length > 0 ? sortBy : [],
        // category_id: currentCategorySelected._id,
        pageNumber: paginate && paginate.currentPage,
        perPage: paginate && paginate.viewPerPage
    }


    try {
        let {status, data} = await api.post(`/api/products/filter/v2`, bodyData)
        if (status === 200) {
            return {

                    products: data.products,
                    totalItems: data?.totalItems

            }
        }

    } catch (ex) {

    }

})


export function filterProductsAction2222222222({category, filters, brandsForCategory, dispatch, setCurrentFullCategoryName, setHttpResponse}) {


    if (category.selected || (category?.allNestedIds && category.allNestedIds.length > 0)) {
        const {pagination} = filters
        let data: {
            categoryIds: string[],
            brands: { name: string, _id: string }[],
            attributes: object,
            // sortBy,
            paginate: {
                currentPage: number,
                viewPerPage: number,
            }
        } = {
            categoryIds: [],
            brands: filters.brands,
            attributes: filters.attributes,
            // sortBy,
            paginate: {
                currentPage: pagination ? pagination.currentPage : 1,
                viewPerPage: pagination ? pagination.viewPerPage : 20,
            },
        };

        // for caching brand for categories key name
        let allCatName = "";

        if (category) {
            if (category.allNestedIds && category.allNestedIds.length > 0) {
                data.categoryIds = category.allNestedIds
                if (category.selected) {
                    allCatName = category.selected.name;
                } else {
                    allCatName = category.allNestedIds.map((a: any) => a.name).join("_");
                }
            } else if (category.selected) {
                data.categoryIds = [category.selected._id];
                allCatName = category.selected.name;
            }
        }


        /******************* Fetch brand for category ***************/
        /**
         * fetch brands for each category
         * example
         Mobiles: (19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
         Mobiles and Tablet: (19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
         Tablets: (19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
         Motherboard: (19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
         Motherboard_Processor_Ram_Keyboard_power-supply : (19) [{…}, {…}, {…}, {…}, {…}]
         */


        // check if brand already fetched or not
        if (!brandsForCategory[allCatName]) {
            dispatch(fetchBrandForCategory({allCatName, categoryIds: data.categoryIds}))
        }

        setCurrentFullCategoryName(allCatName)
        /******************* Fetch brand for category END ***************/


        dispatch(filterProductsAction(data))
            .unwrap()
            .then((data) => {
                setHttpResponse(p => ({...p, loading: false}))
            })
            .catch(ex => {
                setHttpResponse(p => ({...p, loading: false}))
            })
    }
}


export function searchProductsAction(searchBy: { fieldName: string, value?: string }, dispatch) {

    return new Promise(async function (resolve, reject) {
        try {
            let {status, data} = await api.post(`/api/products/filter/v2`, {
                searchBy: {
                    fieldName: searchBy.fieldName,
                    value: searchBy.value
                }
            })
            if (status === 200) {
                dispatch({
                    type: ACTION_TYPES.FETCH_FILTER_PRODUCTS,
                    payload: {
                        products: data.products,
                        totalItems: data?.totalItems
                    },
                });
            }
            resolve(data)
        } catch (ex) {
            resolve(null)
        }
    })

}


export function deleteBrandAction(dispatch, brandId, callback) {

    apis.delete(`/api/brand/${brandId}`).then((response) => {
        if (response.status === 201) {
            callback(null, response.data)
        } else {
            callback(response.data.message, null)
        }
    }).catch(ex => {
        callback(errorMessageCatch(ex), null)
    })
}

export function deleteFlatCategoryAction(dispatch, id, callback) {

    apis.delete(`/api/category/${id}`).then((response) => {
        if (response.status === 201) {
            callback(null, response.data)
        } else {
            callback(response.data.message, null)
        }
    }).catch(ex => {
        callback(errorMessageCatch(ex), null)
    })

}


// fetch homepage section Product...
export const fetchHomePageSection = createAsyncThunk("", async function (payload, thunkAPI) {

    let { homePageSectionsData} = (thunkAPI.getState() as RootState).productState

    try{
        let data = homePageSectionsData.map(section => {
            return {
                name: section.name,
                params: section.params
            }
        })

        let response = await apis.post(`/api/products/home-section`, {
            data: data
        })

        if (response.status !== 200) {
            //   do other staff
            return;
        }

        return response.data

    } catch (ex){

    }

})


// fetch homepage section Product...
export const fetchHomePageSectionProducts = createAsyncThunk<HomePageSectionProduct, HomePageSectionProduct>("fetchHomePageSectionProducts",  function (payload, thunkAPI) {

    // let { homePageSectionsData} = (thunkAPI.getState() as RootState).productState


    return payload


    // try{
    //     let data = homePageSectionsData.map(section => {
    //         return {
    //             name: section.name,
    //             params: section.params
    //         }
    //     })
    //
    //     let response = await apis.post(`/api/products/home-section`, {
    //         data: data
    //     })
    //
    //     if (response.status !== 200) {
    //         //   do other staff
    //         return;
    //     }
    //
    //     return response.data
    //
    // } catch (ex){
    //
    // }

})


//     {
//
//     // handlerLoader(dispatch, {isLoading: true, where: "home_section"})
//
//     let {homePageSectionsData} = getState().productState
//
//     // console.log(homePageSectionsData)
//
//     // let loadingState = loadingStates.find(ls=>ls.where === "home_section")
//
//
//     let h = {}
//
//     let data = homePageSectionsData.map(section => {
//         return {
//             name: section.name,
//             params: section.params
//         }
//     })
//
//     let response = await apis.post(`/api/products/home-section`, {
//         data: data
//     })
//
//     if (response.status === 200) {
//         dispatch({
//             type: ACTION_TYPES.FETCH_HOMEPAGE_SECTION_PRODUCTS,
//             payload: response.data
//         })
//     }
//
//
//     // homePageSectionsData.forEach( (data, i)=>{
//     //   (async function(){
//     //     try {
//     //
//     //       // await api.get(`/api/products/fetch-home-page/?type=${item.filterBy}&pageNumber=${currentPage}&perPage=${perPage}`)
//     //       if(data.params){
//     //         // let response = await apis.get(`/api/products/filter/v2?${data.params}`)
//     //
//     //
//     //         let response = await apis.post(`/api/products/home-section`, {
//     //           data: data.params
//     //         })
//     //
//     //         console.log(response)
//     //
//     //         // console.log(data.params)
//     //
//     //         // h[data.name] = { values: response.data, type: data.type }
//     //         //
//     //         // if(homePageSectionsData.length === (i + 1)){
//     //         //   // console.log(h)
//     //         //   dispatch({
//     //         //     type: ACTION_TYPES.FETCH_HOMEPAGE_SECTION_PRODUCTS,
//     //         //     payload: h
//     //         //   })
//     //         //
//     //         //   // handlerLoader(dispatch, {isLoading: false, where: "home_section"})
//     //         // }
//     //
//     //       }
//     //
//     //     } catch (ex){
//     //       console.log(ex)
//     //     }
//     //
//     //   })()
//     // })
//
//
//     // let pagination = paginations && paginations.find(pg=>pg.where === "home_section")
//
//     // const paginatedHomePageSectionsData = homePageSectionsData.slice(pagination.perPage * (pagination.currentPage - 1), (pagination.perPage * pagination.currentPage) )
//
//
//     // paginatedHomePageSectionsData.forEach( (data, i)=>{
//     //   (async function(){
//     //     try {
//     //
//     //       // await api.get(`/api/products/fetch-home-page/?type=${item.filterBy}&pageNumber=${currentPage}&perPage=${perPage}`)
//     //       if(data.params){
//     //         let response = await apis.get(`/api/products/filter/v2?${data.params}`)
//     //
//     //         h[data.name] = { values: response.data, type: data.type }
//     //
//     //         if(paginatedHomePageSectionsData.length === (i + 1)){
//     //           dispatch({
//     //             type: ACTION_TYPES.FETCH_HOMEPAGE_SECTION_PRODUCTS,
//     //             payload: h
//     //           })
//     //           handlerLoader(dispatch, {isLoading: false, where: "home_section"})
//     //         }
//     //       }
//     //
//     //     } catch (ex){
//     //       console.log(ex.message)
//     //     }
//     //
//     //   })()
//     // })
//
//
//     // console.log(h)
//
//     // let id = setTimeout(() => {
//     //   dispatch({
//     //     type: ACTION_TYPES.FETCH_HOMEPAGE_SECTION_PRODUCTS,
//     //     payload: h
//     //   })
//     //   handlerLoader(dispatch, {isLoading: false, where: "home_section"})
//     //
//     // }, 100)
// }


// get length of one-type-products
export const fetchOneTypeProductLength = (homePageSectionData: { type: string, params: string }) => async (dispatch, getState, api) => {

    let count = 0

    switch (homePageSectionData.type) {
        case "products":
            let pData = await api.get(`/api/products/fetch-home-page-count?type=${homePageSectionData.type}&${homePageSectionData.params}`)
            console.log(pData)
            count = pData.data.count
            break

        default :
            return
    }

    dispatch({
        type: ACTION_TYPES.ONE_TYPE_PRODUCTS_LENGTH,
        payload: count
    })
}

export const fetchOneTypeProduct = (homePageSectionData, currentPage = 1, perPage) => async (dispatch, getState, api) => {
    const prod = await fetchOneTypeProductsFromDb(homePageSectionData, api, currentPage, perPage)
    dispatch({
        type: ACTION_TYPES.ONE_TYPE_PRODUCTS_FETCH,
        payload: {name: homePageSectionData.name, values: prod, type: homePageSectionData.type}
    })
}

function fetchOneTypeProductsFromDb(homePageSectionData, api, currentPage = 1, perPage = 10) {
    return new Promise(async (resolve, reject) => {

        let response;
        let arrOfProducts = []
        let pData;

        switch (homePageSectionData.type) {
            case "products":
                pData = await api.get(`/api/products/filter/?type=${homePageSectionData.type}&${homePageSectionData.params}&pageNumber=${currentPage}&perPage=${perPage}`)
                arrOfProducts = pData.data && pData.data
            // break

            // case "top-selling" :
            //   pData = await api.get(`/api/products/fetch-home-page/?type=${item.filterBy}&pageNumber=${currentPage}&perPage=${perPage}`)
            //   arrOfProducts = pData.data.products && pData.data.products
            //   break
            //
            // case "top-views" :
            //   pData = await api.get(`/api/products/fetch-home-page/?type=${item.filterBy}&pageNumber=${currentPage}&perPage=${perPage}`)
            //   // console.log(pData)
            //   arrOfProducts = pData.data.products && pData.data.products
            //   break
            //
            // case "fetch-categories" :
            //   pData = await api.post(`/api/categories/?pageNumber=${currentPage}&perPage=${perPage}`, { ids: item.ids ? item.ids : [] })
            //   arrOfProducts = pData.data.categories && pData.data.categories
            //   break
            //
            // case "fetch-brands" :
            //   pData = await api.post(`/api/brands/?&pageNumber=${currentPage}&perPage=${perPage}`, { ids: item.ids ? item.ids : [] })
            //   arrOfProducts = pData.data.brands && pData.data.brands
            //   break
        }

        // console.log(item.name, arrOfProducts)
        resolve(arrOfProducts)
    })
}


// fetch relevant products
type RelevantProductsActionType = {
    slug: string
    title: string
    brandId: string
    categoryId: string
}


export const fetchRelevantProductsAction = createAsyncThunk(
    "productState/fetchRelevantProducts",
    async (payload: RelevantProductsActionType, thunkAPI) => {
    let cacheName = payload.slug

    // prevent duplicate fetch request if already fetch these relevant products
    let store = thunkAPI.getState() as RootState
    if (store && store?.productState?.relevantProducts[cacheName]) return;

    try{
        let response = await apis.post(`/api/products/relevant`, payload)
        if (response.status === StatusCode.Ok) {
            return {
                cacheName: cacheName,
                products: response.data
            }
        }
    } catch(ex){

    }
})


function handlerLoader(dispatch, state) {
    dispatch({
        type: ACTION_TYPES.LOADER_CIRCLE,
        payload: state
    })
}


type changePaginationType = {
    where: string,
    currentPage: number,
    type: ("increment" | "decrement")
}

export const changePagination = (payload: changePaginationType) => {
    return {
        type: ACTION_TYPES.CHANGE_PAGINATION,
        payload: payload
    }

}


// shop products actions

export const fetchProductStoreInfo = function (query: string) {
    return new Promise(async (resolve) => {
        try {
            let {data, status} = await apis.get(`/api/shop/product/?${query}`)
            if (status === StatusCode.Ok) {
                resolve(data)
            }
        } catch (ex) {
            resolve(null)
        }
    })
}


// change filter search actions
export const changeFilterSearchAction = (data: { fieldName: string, value?: string, order?: number }): ChangeFilterSearchAction => {
    return {
        type: ACTION_TYPES.CHANGE_FILTER_SEARCH,
        payload: data
    }
}