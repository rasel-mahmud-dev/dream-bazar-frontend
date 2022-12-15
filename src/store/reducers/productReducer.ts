import { ACTION_TYPES, Brand, CategoryType } from "src/store/types";

import filterSidebar from "./filterSidebar.reducer";
import adminProductReducer from "reducers/adminProductReducer";

interface eachCat {
    name: string;
    id: string;
    _id?: string;
    sub_menu?: eachCat[];
}

// breadcrumb or sidebar category list data ....
export interface SelectedCatSectionType {
    oneLevel?: eachCat | null;
    twoLevel?: eachCat | null;
    threeLevel?: eachCat | null;
    fourLevel?: eachCat | null;
    fiveLevel?: eachCat | null;
}

export interface LastSelectedCategoryProps {
    name?: string;
    id?: string;
    _id?: string;
    _ids?: string[];
}

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

export interface UI_CATEGORY_INFO_TYPE {
    id: string;
    _id?: string;
    filter_items: string[];
    filter_items_exclude?: string[];
    default_expand?: string[];
    render_product_attr?: string[];
    // extra field that populated after fetch filter_attributes
    filter_items_populated?: object[];
}

export interface ProductStateType {
    adminProducts: {
        total: number;
        cached: { [key: string]: any[] };
    };
    adminBrands: {
        total: number;
        cached: Brand[];
    };
    adminCategories: {
        total: number;
        cached: [];
    };
    adminStaticFiles: any[];
    ui_categories: eachCat[];
    ui_filterItems: any[];
    ui_category_info: UI_CATEGORY_INFO_TYPE[];
    paginations: PaginationType[];
    fetchedData: any;
    loadingStates: any;
    homePageSectionProducts: any;
    homePageSectionsData: any[];
    productDetails: any;
    oneTypeProductsLength: any;
    totalProduct: number;
    totalFilterAbleProductCount: number;
    filterProducts: any;
    category:
        | {
              // this is need for filter sidebar
              // filters: {name: string, values: {name: "string", value: any}[]}[]
              brands: { _id: string; name: string }[]; // populated from brands collections
              is_top: any;
              last_level: any;
              name: string;
              parent_id: string;
              updated_at: string;
              _id: string;
          }
        | {};
    filters: {
        pagination: {
            totalItems: number;
            currentPage: number;
            viewPerPage: number;
        };
        category: {
            selected?: { name: string; id: string; parentId?: string };
            allNestedIds?: string[];
        };
        price: any;
        brands: { name: string; logo: string; _id: string }[];
        sortBy: { field: string; id: string; order: number }[];
    };
    filteredAttributes: {
        attribute_name: string;
        values: { name: string; value: string }[];
    }[];
    oneTypeFetchProducts: { name?: ""; values?: [{}] };
    expandFilterItems_sectionIds: string[];
    brandsForCurrentCategory: any;
    brandsForCategory: { [key: string]: Brand[] };
    filterItem_sections_data: {
        category_id?: string;
        filterItem_sections?: { attribute_name: string; name: string; values: { name: string; value: string | object } }[];
    };
    flatCategories: CategoryType[] | null;
    nestedCategoriesCache: {
        [key: string]: any;
    };
    brands: {
        total: number;
        cached: any[];
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
    filterProducts: [{ title: "Reduce State Product", _id: "34324" }],
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
    oneTypeFetchProducts: { name: "", values: [{}] },
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
    loadingStates: [
        { where: "home_section", isLoading: false },
        { where: "one_type_products", isLoading: false },
    ],
    paginations: [
        { where: PaginationWhereEnum.home_section, perPage: 2, currentPage: 1 },
        { where: PaginationWhereEnum.one_type_products, perPage: 5, currentPage: 1 },
        { where: PaginationWhereEnum.filter_products_page, perPage: 50, currentPage: 1 },
    ],
    fetchedData: [{ where: "home_page", isFetched: false }],
    category: {},

    brandsForCurrentCategory: [],

    /// make caching brand for individual category
    brandsForCategory: {},
    filters: {
        pagination: {
            totalItems: 0,
            currentPage: 1,
            viewPerPage: 5,
        },
        category: {
            selected: null,
            allNestedIds: [],
        },
        price: [10, 100],
        brands: [],
        sortBy: [{ field: "views", order: -1, id: "1" }],
    },
    filteredAttributes: [],
    expandFilterItems_sectionIds: ["generation"],
    filterItem_sections_data: {},
    flatCategories: null,

    nestedCategoriesCache: {
        categoryName: [],
    },

    brands: {
        total: 0,
        cached: [],
    },

    selectCategory: {
        root: null,
        tree: null,
    },
};

const productReducer = (state: ProductStateType = initialState, action) => {
    let updatedState: ProductStateType = { ...state };
    switch (action.type) {
        case ACTION_TYPES.SET_UI_CATEGORIES:
            let isHas = updatedState.ui_categories.findIndex((item) => item.id === action.payload.id);
            // we not store category as it's duplicate

            if (isHas === -1) {
                updatedState.ui_categories = [...updatedState.ui_categories, action.payload];
            }

            return updatedState;

        case "SET_UI_FILTER_ITEMS":
            updatedState.ui_filterItems = action.payload;
            return updatedState;

        case ACTION_TYPES.SET_UI_CATEGORY_INFO:
            let updated_ui_category_info = [...updatedState.ui_category_info];

            // updated_ui_category_info.forEach(function (item){
            //   console.log(item)
            // })

            if (Array.isArray(action.payload)) {
                let existAny = updated_ui_category_info.findIndex((ci) => {
                    return action.payload.findIndex((s) => s.id === ci.id) !== -1;
                });

                if (existAny === -1) {
                    updated_ui_category_info = [...updated_ui_category_info, ...action.payload];
                }
                // ci => {
                //   return action.payload.findIndex(s=>s.id === ci.id) !== -1
                // }
            } else {
                if (action.payload.id) {
                    let existIndex = updated_ui_category_info.findIndex((ci) => ci.id === action.payload.id);
                    if (existIndex === -1) {
                        updated_ui_category_info = [...updated_ui_category_info, action.payload];
                    }
                }
            }

            updatedState.ui_category_info = updated_ui_category_info;
            // console.log(updatedState)
            return updatedState;

        case ACTION_TYPES.FETCH_FILTER_PRODUCTS:
            const { products, totalItems } = action.payload;

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

        case ACTION_TYPES.FETCH_BRANDS:
            updatedState.brands[action.payload.categoryId] = action.payload.brands;
            return updatedState;

        case ACTION_TYPES.DELETE_BRAND:
            // updatedState.brands = updatedState.brands.filter(b=>b.id !== action.payload)
            return updatedState;

        case ACTION_TYPES.FETCH_FLAT_CATEGORIES:
            updatedState.flatCategories = action.payload;
            return updatedState;

        case ACTION_TYPES.UPDATE_FLAT_CATEGORY:
            let updateFlatCategories = [...updatedState.flatCategories];
            let index = updateFlatCategories.findIndex((b) => b._id === action.payload.id);

            if (index !== -1) {
                updateFlatCategories[index] = {
                    ...updateFlatCategories[index],
                    ...action.payload,
                };
            }
            updatedState.flatCategories = updateFlatCategories;
            return updatedState;

        case ACTION_TYPES.DELETE_FLAT_CATEGORY:
            updatedState.flatCategories = updatedState.flatCategories.filter((c) => c._id !== action.payload);
            return updatedState;

        case ACTION_TYPES.ADD_FLAT_CATEGORY:
            updatedState.flatCategories = [...updatedState.flatCategories, action.payload];

            return updatedState;

        case ACTION_TYPES.ADD_NESTED_CATEGORY_CACHE:
            updatedState.nestedCategoriesCache[action.payload.name] = action.payload.arr;

            return updatedState;

        case ACTION_TYPES.SET_SELECT_CATEGORY:
            updatedState.selectCategory.root = action.payload.root;
            if (action.payload.tree) {
                updatedState.selectCategory.tree = action.payload.tree;
            }
            return updatedState;

        // if change page number then call this
        case ACTION_TYPES.FETCH_PRODUCTS_APPEND:
        // updatedState.products = [...updatedState.products, ...action.payload]
        // return updatedState

        case "COUNT_FETCHED_PRODUCTS":
            updatedState.totalProduct = action.payload;
            return updatedState;

        case ACTION_TYPES.COUNT_TOTAL_FILTERABLE_PRODUCT:
            updatedState.totalFilterAbleProductCount = action.payload;
            return updatedState;

        case ACTION_TYPES.FETCH_PRODUCT:
            updatedState.productDetails = action.payload;
            let m = setLoadingStates(updatedState.loadingStates, "product_details", false);
            updatedState.loadingStates = m;
            return updatedState;

        case ACTION_TYPES.ONE_TYPE_PRODUCTS_FETCH:
            updatedState.oneTypeFetchProducts = action.payload;
            return updatedState;

        case ACTION_TYPES.ONE_TYPE_PRODUCTS_LENGTH:
            updatedState.oneTypeProductsLength = action.payload;
            return updatedState;

        case ACTION_TYPES.CLEAR_PRODUCT_DETAIL:
            updatedState.productDetails = {};
            return updatedState;

        case ACTION_TYPES.FETCH_HOMEPAGE_SECTION_PRODUCTS:
            // mark it if already fetched without dependencies change
            let oldFetchedData = [...updatedState.fetchedData];
            let fetchedDataFind = oldFetchedData.findIndex((fd) => fd.where === "home_page");

            if (fetchedDataFind !== -1) {
                oldFetchedData[fetchedDataFind] = {
                    ...oldFetchedData[fetchedDataFind],
                    isFetched: true,
                };
            }
            updatedState.fetchedData = oldFetchedData;
            let g = setLoadingStates(updatedState.loadingStates, "home_section", false);
            updatedState.loadingStates = g;

            // update section
            updatedState.homePageSectionProducts = {
                ...updatedState.homePageSectionProducts,
                ...action.payload,
            };

            // log2(updatedState.loadingStates)

            return updatedState;

        // handle varies loading State... via paylaod data
        case ACTION_TYPES.LOADER_CIRCLE:
            const loadingStateIndex = updatedState.loadingStates.findIndex((ls) => ls.where === action.payload.where);
            if (loadingStateIndex !== -1) {
                updatedState.loadingStates[loadingStateIndex] = {
                    ...updatedState.loadingStates[loadingStateIndex],
                    isLoading: action.payload.isLoading,
                };
            } else {
                updatedState.loadingStates.push({
                    where: action.payload.where,
                    isLoading: action.payload.isLoading,
                });
            }
            return updatedState;

        // handle varies pagination data
        case "SET_PAGINATIONS":
            updatedState.paginations = action.payload;
            return updatedState;

        // handle varies pagination data
        case ACTION_TYPES.CHANGE_PAGINATION:
            const paginationIndex = updatedState.paginations.findIndex((pg) => pg.where === action.payload.where);
            let oldPaginations = [...updatedState.paginations];
            if (paginationIndex !== -1) {
                oldPaginations[paginationIndex] = {
                    ...oldPaginations[paginationIndex],
                    currentPage: action.payload.currentPage ? action.payload.currentPage : oldPaginations[paginationIndex].currentPage + 1,
                };
            }
            // mutation old to new paginations data
            updatedState.paginations = oldPaginations;
            return updatedState;

        case ACTION_TYPES.UNLOCK_FETCHED_DATA:
            // unlock cacheing cause user change paginationData,
            // So app need fetch more data from our database...
            let updateFetchData = [...updatedState.fetchedData];
            let fetchedDataIndex = updateFetchData.findIndex((fd) => fd.where === action.payload);

            if (fetchedDataIndex !== -1) {
                updateFetchData[fetchedDataIndex] = {
                    ...updateFetchData[fetchedDataIndex],
                    isFetched: false, // it cause fetch database again
                };
            }
            updatedState.fetchedData = updateFetchData;
            return updatedState;

        case ACTION_TYPES.SET_filtered_Attributes:
            updatedState.filteredAttributes = action.payload;
            return updatedState;

        case "SET_CATEGORY":
            updatedState.category = action.payload;
            return updatedState;

        case "SET_FILTER_SECTION_TOGGLE_ATTRIBUTE_NAME":
            updatedState.expandFilterItems_sectionIds = action.payload;
            return updatedState;

        case ACTION_TYPES.ADD_FILTER:
            const { brands, sortBy, category } = action.payload;
            let updatedFilters = { ...updatedState.filters };
            if (brands) {
                updatedFilters.brands = brands;
            }
            if (sortBy) {
                updatedFilters.sortBy = sortBy;
            }
            updatedState.filters = updatedFilters;
            // updatedState.filteredAttributes = action.payload
            return updatedState;

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

        /// make caching filter items
        case ACTION_TYPES.SET_UI_FILTER_ITEM:
            let updatedUi_filterItems = [...updatedState.ui_filterItems];
            /// only store uniq filter items
            action.payload.forEach((ii) => {
                if (updatedUi_filterItems.findIndex((up) => up.attribute_name === ii.attribute_name) === -1) {
                    updatedUi_filterItems.push(ii);
                }
            });
            updatedState.ui_filterItems = updatedUi_filterItems;
            return updatedState;

        default:
            // pass switch case to another function........
            // this function should be return updated state
            updatedState = filterSidebar(state, action);
            updatedState = adminProductReducer(updatedState, action);
            return updatedState;
    }
};

function setLoadingStates(oldLoadinStates, where, state) {
    let updatedLoadinStates = [...oldLoadinStates]
    const loadingStateIndex = updatedLoadinStates.findIndex(ls => ls.where === where)
    if (loadingStateIndex !== -1) {
        updatedLoadinStates[loadingStateIndex] = {
            ...updatedLoadinStates[loadingStateIndex],
            isLoading: state
        }
    }
    return updatedLoadinStates
}

export default productReducer
