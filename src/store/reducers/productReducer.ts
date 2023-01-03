import {ACTION_TYPES,  CategoryType} from "src/store/types";

import filterSidebar from "./filterSidebar.reducer";
import {FetchHomeSectionProductAction, ProductActionTypes} from "store/types/productActionTypes";


export enum PaginationWhereEnum {
    home_section,
    one_type_products,
    filter_products_page,
}

export type PaginationType = {
    where: PaginationWhereEnum;
    perPage: number;
    currentPage: number;
};


export interface ProductStateType {
    homePageSectionProducts: any;
    homePageSectionsData: any[];
    productDetails: any;
    oneTypeProductsLength: any;
    totalProduct: number;
    totalFilterAbleProductCount: number;
    filterProducts: any;
    filters: {
        pagination: {
            totalItems: number;
            currentPage: number;
            viewPerPage: number;
        };
        price: any;
        brands: { name: string; logo: string; _id: string }[];
        sortBy: { field: string; id: string; order: number }[];
        ideals: string[]
    };
    filteredAttributes: {
        attribute_name: string;
        values: { name: string; value: string }[];
    }[];
    oneTypeFetchProducts: { name?: ""; values?: [{}] };
    expandFilterItems_sectionIds: string[];

    filterItem_sections_data: {
        category_id?: string;
        filterItem_sections?: { attribute_name: string; name: string; values: { name: string; value: string | object } }[];
    };
    flatCategories: CategoryType[] | null;
    nestedCategoriesCache: {
        [key: string]: any;
    };

    selectCategory: {
        root: CategoryType;
        tree: CategoryType;
    };
}

const initialState: ProductStateType = {
    ui_categories: [],
    ui_category_info: [],
    ui_filterItems: [],
    totalProduct: 0,
    totalFilterAbleProductCount: 0,
    filterProducts: [{title: "Reduce State Product", _id: "34324"}],
    adminProducts: {
        total: 0,
        cached: {
            1: [],
        },
    },
    adminBrands: {
        total: 0,
        cached: null,
    },
    adminCategories: {
        total: 0,
        cached: null,
    },
    adminStaticFiles: [],
    oneTypeProductsLength: 0,
    productDetails: {},
    oneTypeFetchProducts: {name: "", values: [{}]},
    homePageSectionsData: [
        {
            name: "Top Popular products",
            langKey: "top_popular_products",
            type: "products",
            filterBy: "views=-1",
            params: "views=-1",
        },
        {
            name: "Top Selling products",
            langKey: "top_selling_products",
            type: "products",
            filterBy: "sold=-1",
            params: "sold=-1",
        },
        {
            name: "Top Offers",
            langKey: "top_offer_products",
            type: "products",
            filterBy: "top-discount",
            params: "discount=-1",
        },
        // {name: "Today's Fashion Deals", type: "products", filterBy: "top-discount", params: "discount=-1&cat=60df5e546419f56b97610608"},
        // {name: "Featured Brands", type: "products", filterBy: "top-discount", params: "discount=-1&cat=60df5e546419f56b97610608"},
        // {name: "Best of Electronics", type: "products", filterBy: "top-views", params: "cat=60df5e546419f56b97610608"},
        // {name: "Fashion Best Sellers", type: "products", filterBy: "top-views", params: "cat=60df5e546419f56b97610608"},
        // {name: "Bestselling Furniture", type: "products", filterBy: "top-views", params: "cat=60df5e546419f56b97610608"},
        // {name: "TVs & Appliances", type: "products", filterBy: "top-views", params: "cat=60df5e546419f56b97610608"},
        // {name: "Top Deals on Electronics", type: "products", filterBy: "top-views", params: "/api/products/filter/v2?cat=60df5e546419f56b97610608"},
        // {name: "Men's Footwear", type: "products", filterBy: "men-footwear"},
        // {name: "Shop By Categories", type: "categories", filterBy: "fetch-categories", ids: ["60df5e546419f56b97610608", "60df5e546419f56b9761060a", "60df5e546419f56b97610609"]},
        // {name: "Shop By Brands", type: "brands", filterBy: "fetch-brands", ids: ["60e03b7bc4db28a6a4fdcb82", "60e03b83c4db28a6a4fdcb83"]},
        // {name: "motherboard",  type: "products",  filterBy: "category", id: "60df5e546419f56b97610608"},
        // {name: "mobile",  type: "products", filterBy: "category", id: "60df5e546419f56b97610602"},
        // {name: "ram", type: "products", filterBy: "category", id: "60df5e546419f56b9761060a"},
        // {name: "processor", type: "products", filterBy: "category", id: "60df5e546419f56b97610609"},
        // {name: "Cpu", type: "products", filterBy: "category", id: "60df5e546419f56b97610608"},
        // {name: "Graphics Card", type: "products", filterBy: "category", id: "60df5e546419f56b97610608"},
        // {name: "Power Supply", type: "products", filterBy: "category", id: "60df5e546419f56b9761060b"}
    ],
    homePageSectionProducts: {},
    fetchedData: [{where: "home_page", isFetched: false}],
    category: {},
    brandsForCurrentCategory: [],
    /// make caching brand for individual category
    brandsForCategory: {},
    filters: {
        pagination: {
            totalItems: 0,
            currentPage: 1,
            viewPerPage: 15,
        },
        price: [10, 100],
        brands: [],
        sortBy: [{field: "views", order: -1, id: "1"}],
        ideals: null
    },
    categoryDetailCache: {},
    filteredAttributes: [],
    expandFilterItems_sectionIds: ["generation"],
    filterItem_sections_data: {},
    flatCategories: null,

    nestedCategoriesCache: {
        categoryName: [],
    },
    selectCategory: {
        root: null,
        tree: null,
    }
};


const productReducer = (state = initialState, action: ProductActionTypes) => {
    let updatedState: ProductStateType = {...state};
    switch (action.type) {

        case ACTION_TYPES.FETCH_FILTER_PRODUCTS:
            const {products, totalItems} = action.payload;

            updatedState.filterProducts = products;

            if (typeof totalItems === "number") {
                updatedState.filters = {
                    ...updatedState.filters,
                    pagination: {
                        ...updatedState.filters.pagination,
                        totalItems: totalItems,
                    },
                };
            }
            return updatedState;


        case ACTION_TYPES.SET_FILTER_PAGINATION:
            updatedState.filters = {
                ...updatedState.filters,
                pagination: {
                    ...updatedState.filters.pagination,
                    ...action.payload,
                },
            };
            return updatedState;

        //
        // case ACTION_TYPES.SET_SELECT_CATEGORY:
        //     updatedState.selectCategory.root = action.payload.root;
        //     if (action.payload.tree) {
        //         updatedState.selectCategory.tree = action.payload.tree;
        //     }
        //     return updatedState;


        case ACTION_TYPES.FETCH_HOMEPAGE_SECTION_PRODUCTS:
            // mark it if already fetched without dependencies change
            // let oldFetchedData = [...updatedState.fetchedData];
            // let fetchedDataFind = oldFetchedData.findIndex((fd) => fd.where === "home_page");
            //
            // if (fetchedDataFind !== -1) {
            //     oldFetchedData[fetchedDataFind] = {
            //         ...oldFetchedData[fetchedDataFind],
            //         isFetched: true,
            //     };
            // }
            // updatedState.fetchedData = oldFetchedData;

            // update section
            updatedState.homePageSectionProducts = {
                ...updatedState.homePageSectionProducts,
                ...action.payload,
            };

            // log2(updatedState.loadingStates)

            return updatedState;


        // case ACTION_TYPES.SET_filtered_Attributes:
        //     updatedState.filteredAttributes = action.payload;
        //     return updatedState;
        //
        // case "SET_CATEGORY":
        //     updatedState.category = action.payload;
        //     return updatedState;
        //
        // case "SET_FILTER_SECTION_TOGGLE_ATTRIBUTE_NAME":
        //     updatedState.expandFilterItems_sectionIds = action.payload;
        //     return updatedState;
        //
        // case ACTION_TYPES.ADD_FILTER:
        //     const {brands, sortBy, ideals} = action.payload;
        //     let updatedFilters = {...updatedState.filters};
        //     if (brands) {
        //         updatedFilters.brands = brands;
        //     }
        //     if (sortBy) {
        //         updatedFilters.sortBy = sortBy;
        //     }
        //     if (ideals) {
        //         updatedFilters.ideals = ideals;
        //     }
        //     updatedState.filters = updatedFilters;
        //     // updatedState.filteredAttributes = action.payload
        //     return updatedState;


        default:
            // pass switch case to another function........
            // this function should be return updated state
            updatedState = filterSidebar(state, action);
            return updatedState;
    }
};




export default productReducer
