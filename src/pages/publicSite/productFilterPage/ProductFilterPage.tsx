import React, { FC, useEffect, useState } from "react";
// import json from "src/breadcrumbData.json"
import {  Spin } from "UI/index";
import Pagination from "components/Pagination/Pagination"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api, {getApi} from "src/apis";
import apis from "src/apis";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPES } from "store/types";
import "./productFilterPage.scss";
import { nonInitialEffect } from "src/reactTools";

// import Store from "pages/storePage/StorePage"
import NotFoundProduct from "UI/404-Product/Not-Found-Product";
import { PaginationWhereEnum } from "reducers/productReducer";
// import {Dispatch} from "redux";
import { filterProductsAction } from "actions/productAction";
// import {toggleAppMask} from "actions/appAction";
import { getPagination } from "actions/localActions";
import { RootState } from "src/store";
import BrandList from "pages/publicSite/productFilterPage/BrandList";
import Product from "components/Product/Product";
import SEO from "components/SEO/SEO";
import CategoryList from "components/CategoryList/CategoryList";
import WithWidth from "UI/withWidth/withWidth";
import Sidebar from "components/sidebar/Sidebar";
import Circle from "UI/Circle/Circle";
import { FaAngleLeft } from "react-icons/all";
import {setFilter, SetFilterActionPayload} from "actions/filterSidebar.action";
import product from "components/Product/Product";

let initialLoad = true;

let preCollapsCat;

interface ProductFilterType {
	toggleLoader: any;
	toggleAppMask: any;
	category?: any;
	// category: {
	//   // filters: {name: string, values: {name: "string", value: any}[]}[]
	//   brands: {not_available: boolean, _id: string, name: string}[] // populated property
	//   is_top: any
	//   last_level: any
	//   name: string
	//   parent_id: string
	//   updated_at: string
	//   _id: string
	// } | any,
	currentCategorySelected: { id?: string; _id?: string; name?: string };
	products: {}[];
	currentCategoryRoot: { name: ""; id: ""; _id: ""; sub_menu: [] }[];
	innerWidth: number;
}

interface ExpandSubMenuProps {
	id: string;
	name: string;
	isExpand: boolean;
	sub_menu: {
		id: string;
		_id: string;
		name: string;
		isExpand: boolean;
		sub_menu: {
			_id: string;
			id: string;
			name: string;
			isExpand: boolean;
		};
	};
}

let ss;

const ProductFilter: FC<ProductFilterType> = ({ innerWidth }) => {
	const {
		productState: { paginations, filterProducts, totalProduct, filteredAttributes, brandsForCategory, flatCategories, filters, selectCategory },
		appState: { isOpenLeftBar },
	} = useSelector((state: RootState) => state);

	const params = useParams();



	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	// const d = props.appState.ui_categories



	const [paginate, setPaginate] = React.useState({
		perPage: 3,
		currentPage: 1,
	});

	const [collapseMenus, setCollapseMenus] = React.useState({});
	const [expandSubMenu, setExpandSubMenu] = React.useState<ExpandSubMenuProps>({
		id: "",
		isExpand: false,
		name: "",
		sub_menu: { _id: "", id: "", isExpand: false, name: "", sub_menu: { _id: "", id: "", isExpand: false, name: "" } },
	});

	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});

	// function resetPaginationValue() {
	//     let updatedPaginations = [...paginations]
	//     let findex = updatedPaginations.findIndex(pg => pg.where === "filter_products_page")
	//     if (findex !== -1) {
	//         updatedPaginations[findex].currentPage = 1
	//     }
	//     dispatch({
	//         type: "SET_PAGINATIONS",
	//         payload: updatedPaginations
	//     })
	//     setPaginate({
	//         perPage: 20,
	//         currentPage: 1
	//     })
	// }

	const [breadcrumbData, setBrandcrumbData] = React.useState({});
	const [categoryData, setCategoryData] = React.useState<{ expand?: boolean; id?: string; name?: string; sub_menu?: [] }>({});

	// when enter filter Product page with queryparams category id
	// and rootCategory id, we find rootCategory and store it.

	// pagination for this page. for more flexibility it an object
	// instead of array of paginations from global store
	// React.useEffect(()=>{
	//   const findex = paginations.findIndex(pg=>pg.where==="filter_products_page")
	//   if(findex !== -1){
	//     setPaginate({
	//       ...paginations[findex],
	//     })
	//   }
	// }, [paginations])
	//

	// React.useEffect( function (){
	//   (async function () {
	//
	//
	//     try{
	//       // console.log(currentCategorySelected)
	//       // fetch category for filter sidebar items
	//       // console.log(currentCategorySelected)
	//
	//       /**
	//         Fetch Product if subcategory exists like jeans, t-sharts   sub_category means url params &cat_tree=
	//        */
	//
	//       if(currentNestedSubCategory) {
	//         // we need category id that need to find category from  database
	//
	//         const { sortBy, brands=[] } = filters
	//
	//         // if has sub_category mongodb database _id... or _ids []
	//         if (currentNestedSubCategory._id || currentNestedSubCategory._ids) {
	//           let params = ""
	//           if (currentNestedSubCategory._ids && currentNestedSubCategory._ids.length > 0){
	//             currentNestedSubCategory._ids.forEach((i, index)=>{
	//               if(index !== 0){
	//                 params += "+" + i
	//               } else {
	//                 params += i
	//               }
	//             })
	//           } else {
	//             params = currentNestedSubCategory._id
	//           }
	//
	//           // now we need category filter sections
	//           // console.log(params)
	//           // let { data } = await api.get(`/api/categories/filter-section/${params}`)
	//           // console.log(data)
	//           // if (data.category) {
	//           //   dispatch({type: "SET_CATEGORY", payload: data.category[0]})
	//           // }
	//
	//           let pagination = getPagination(paginations, PaginationWhereEnum.filter_products_page)
	//
	//           let data = {
	//             currentNestedSubCategory,
	//             selectedCatSections,
	//             brands,
	//             filteredAttributes,
	//             sortBy,
	//             paginate: {currentPage: pagination ? pagination.currentPage : 1, perPage: pagination ? pagination.perPage : 20},
	//           }
	//
	//           // filterProductWithState(data,  true, function (data) {
	//           //   dispatch({
	//           //     type: ACTION_TYPES.COUNT_TOTAL_FILTERABLE_PRODUCT,
	//           //     payload: data.total
	//           //   })
	//           // })
	//           //
	//           // filterProductWithState(data,  false, function (data) {
	//           //   // console.log(data)
	//           //   dispatch({
	//           //     type: ACTION_TYPES.FETCH_PRODUCTS,
	//           //     payload: data
	//           //   })
	//           // })
	//
	//
	//         } else {
	//           // dispatch({
	//           //   type: ACTION_TYPES.FETCH_PRODUCTS,
	//           //   payload: []
	//           // })
	//         }
	//       }
	//     } catch(ex){
	//       console.log("error,,,,,,,,", ex)
	//     }
	//
	//   }())
	//
	// }, [currentNestedSubCategory, selectedCatSections])

	// re-fetch Product if change
	// brands, filteredAttributes, sortBy
	// React.useEffect(()=>{
	//
	//   try {
	//     /**
	//       Don't re-fetch Product count if only change pagination or sort value.
	//      */
	//
	//     const { sortBy, brands } = filters
	//
	//     // fetch category for filter sidebar items
	//     if(currentNestedSubCategory && currentNestedSubCategory._id){
	//
	//       // console.log("sdfsdfdsf", filters.brands)
	//
	//       // we need category id that need to find category from  database
	//
	//       // fetching Product with fetched this category id..
	//       let pagination = getPagination(paginations, PaginationWhereEnum.filter_products_page)
	//       let data = {
	//         brands,
	//         currentNestedSubCategory,
	//         filteredAttributes,
	//         selectedCatSections,
	//         sortBy,
	//         paginate: {currentPage: pagination ? pagination.currentPage : 1, perPage: pagination ? pagination.perPage : 30},
	//       }
	//
	//       filterProductWithState(data,  true, function (data) {
	//         dispatch({
	//           type: ACTION_TYPES.COUNT_TOTAL_FILTERABLE_PRODUCT,
	//           payload: data.total
	//         })
	//       }).then(r=>{})
	//
	//       filterProductWithState(data, false, function (data) {
	//         dispatch({
	//           type: ACTION_TYPES.FETCH_PRODUCTS,
	//           payload: data
	//         })
	//       }).then( r =>{})
	//       // console.log(currentCategorySelected, filteredAttributes)
	//     }
	//   } catch(ex){
	//     console.log("error,,,,,,,,", ex)
	//   }
	//
	//
	//
	// }, [filters.brands, filteredAttributes, filters.sortBy, currentNestedSubCategory])

	useEffect(() => {
		if (filters.category.selected || filters.category.allNestedIds.length > 0) {
            const  {pagination} = filters
			let data = {
				categoryIds: [],
				brands: filters.brands,
				selectCategory,
				filteredAttributes,
				// sortBy,
				paginate: {
					currentPage: pagination ? pagination.currentPage : 1,
                    viewPerPage: pagination ? pagination.viewPerPage : 20,
				},
			};

            // for caching brand for categories key name
			let allCatName = "";

			if (filters.category) {
				if (filters.category.allNestedIds && filters.category.allNestedIds.length > 0) {
					data.categoryIds = filters.category.allNestedIds.map((a: any) => a.id);
					if (filters.category.selected) {
						allCatName = filters.category.selected.name;
					} else {
						allCatName = filters.category.allNestedIds.map((a: any) => a.name).join("_");
					}
				} else if (filters.category.selected) {
					data.categoryIds = [filters.category.selected.id];
					allCatName = filters.category.selected.name;
				}
			}


			/******************* Fetch brand for category ***************/
			/**
             * add brands for each category
             * example
             Mobiles: (19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
             Mobiles and Tablet: (19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
             Tablets: (19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
             Motherboard: (19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
             Motherboard_Processor_Ram_Keyboard_power-supply : (19) [{…}, {…}, {…}, {…}, {…}]
             */

			// check if brand already fetched or not
			if (!brandsForCategory[allCatName]) {
				apis.post("/api/brands/for-category", { forCategory: data.categoryIds }).then(({ status, data }) => {
					if (status === 200) {
						dispatch({
							type: ACTION_TYPES.FETCH_CATEGORY_BRANDS,
							payload: {
								brands: data.brands,
								categoryName: allCatName,
							},
						});
					}
				});
			}
			/******************* Fetch brand for category END ***************/
   
			filterProductsAction(data, false, dispatch).then((data)=>{
                setHttpResponse(p=>({...p, loading: false}))
            })
            .catch(ex=>{
                setHttpResponse(p=>({...p, loading: false}))
            })
            
            // console.log(data)
            // dispatch({
            //   type: ACTION_TYPES.COUNT_TOTAL_FILTERABLE_PRODUCT,
            //   payload: data.products
            // })
            // dispatch({
            //   type: ACTION_TYPES.FETCH_FILTER_PRODUCTS,
            //   payload: data.products
            // })
            // dispatch({
            //   type: ACTION_TYPES.COUNT_TOTAL_FILTERABLE_PRODUCT,
            //   payload: data.total
            // })
		}
	}, [
        filters.category.selected,
        filters.brands,
        filters.category.allNestedIds,
        filters.pagination.currentPage,
        filters.pagination.viewPerPage,
        flatCategories
    ]);



    // fetch brands using names
    function fetchBrandByNames<T>(...brandNames: string[]){
        return new Promise<T>(async(resolve, reject)=>{
            try{
                let brandQuery = ""
                brandNames.forEach((brand, index)=>{
                    brandQuery += `${brand}___`
                })
                let {data, status } = await getApi().get<T>("/api/brands/info/" + brandQuery)
                if(status === 200){
                    resolve(data)
                } else {
                    resolve(null)
                }
            } catch (ex){
                resolve(null)
            }
        })
    }

    
    /**
     if it has some product filter attribute (like ideal, brand) value in location state.
     then set it in filter state in global state.
     * */
    useEffect(() => {
        (async function(){
            let updateFilterState: SetFilterActionPayload = {}
            const {brand, ideal} = location.state
            if(brand){
                let brands = await fetchBrandByNames<{ _id: string, name: string, logo?: string }[]>(brand);
                if(brands) {
                    updateFilterState.brands = brands
                }
            }
            if(ideal){
                updateFilterState.ideals =  [ideal]
            }

            if(updateFilterState) {
                dispatch(setFilter(updateFilterState))
            }
        }())


    }, [location.state])



	// refetch Product if change paginate value
	// then append Product with exist products in store
	nonInitialEffect(() => {
		// filterProductWithState({
		//   currentCategoryRoot,
		//   brands,
		//   filteredAttributes,
		//   currentCategorySelected,
		//   sortBy,
		//   paginate,
		//   count: false
		// }, function(data){
		//   dispatch({
		//     type: "FETCH_PRODUCTS_APPEND",
		//     payload: data
		//   })
		// })
	}, [paginations]);

	function renderProducts() {
		function handleAddToWishList(product) {
			api.post("/api/toggle-wishlist", { productId: product._id }).then((data) => {
				console.log(data);
			});
		}

		function isWished(product) {
			// console.log(Product.wishlist)
			// return Product.wishlist && Product.wishlist.indexOf(authState._id) !== -1
			return true;
		}

		let renderProductAtt = ["title", "price"];

		// return (
		//   <div className="products-views">
		//   { products && products.length > 0 ? products.map(Product=>(
		//     <div className="Product card pb-5">
		//       {renderProductAtt.map(key=>{
		//         return (
		//           <h1>{Product[key]}</h1>
		//         )
		//       })}
		//     </div>
		//     ))  : ""
		//   }
		//   </div>
		// )

		return (
			<div className="products-views-ssds grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				{filterProducts && filterProducts.length > 0 ? (
					filterProducts.map((product, i) => (
						<Product
							key={i}
							product={product}
							handleAddToWishList={handleAddToWishList}
							isWished={isWished}
							renderProductAtt={renderProductAtt}
						/>
					))
				) : (
					<NotFoundProduct title="Product not found on this Category " />
				)}
			</div>
		);
	}

	function renderSortingBtn() {
		const data = [
			{ label: "Popularity", field: "views", order: -1, id: 1 },
			{ label: "Price -- Low to High", field: "price", order: 1, id: 2 },
			{ label: "Price -- High to Low", field: "price", order: -1, id: 3 },
			{ label: "Newest First", field: "created_at", order: -1, id: 4 },
		];

		async function setSortHandler(item) {
			let updatedSortBy = [...filters.sortBy];
			updatedSortBy = [
				{
					field: item.field,
					id: item.id,
					order: item.order,
				},
			];

			dispatch({
				type: ACTION_TYPES.ADD_FILTER,
				payload: { sortBy: updatedSortBy },
			});
		}

		function isSorted(id) {
			let i = filters.sortBy.findIndex((s) => s.id === id);
			return i !== -1;
		}

		return data.map((item: any, i) => (
			<span onClick={() => setSortHandler(item)} key={i} className={["inline-nav", isSorted(item.id) ? "inline-nav__active" : ""].join(" ")}>
				{item.label}
			</span>
		));
	}

	function handlePagination(pageNumber) {

		dispatch({
		    type: ACTION_TYPES.SET_FILTER_PAGINATION,
		    payload: {currentPage: pageNumber}
		})
	}

	// React.useEffect(() => {

	// let qs = qstring.parse(history.location.search)
	// let updatedCategory: any  = {...categoryData}
	//
	// const { cat, cat_tree, ...otherParams } = qs
	// let ui_categories = props.appState.ui_categories
	// console.log(ui_categories)
	// for (let i = 0; i < ui_categories.length; i++) {
	//   if(ui_categories[i].id === cat){
	//     updatedCategory = { ...categoryData, ...ui_categories[i] }
	//     if(ui_categories[i].sub_menu){
	//       for (let j = 0; j < ui_categories[i].sub_menu.length; j++) {
	//         if(ui_categories[i].sub_menu[j].id === cat_tree){
	//           updatedCategory.selected_sub_cat = {...ui_categories[i].sub_menu[j], is_selected: true}
	//         }
	//       }
	//     }
	//   }
	// }
	// console.log(updatedCategory)
	//
	// setCategoryData(updatedCategory)

	// }, [location.search, props.appState.ui_categories])

	function callbackHandler(jsx) {
		ss = jsx;
		return null;
	}

	// let pagination = getPagination(paginations, PaginationWhereEnum.filter_products_page);

	function handleClickSidebarBackdrop(e) {
		dispatch({
			type: ACTION_TYPES.TOGGLE_LEFT_BAR,
		});
	}

	function handleChangeCategory() {
		setHttpResponse((p) => ({ ...p, loading: true }));
	}


	return (
        <div className="pb-10 relative">
            <SEO title={`p/${params.pId}/${params.treeId}`} description="Product filter" />

            {httpResponse.loading && (
                <div className="fixed w-full h-full bg-black/40 top-0 left-0 z-500">
                    <Spin className="absolute left-1/2 top-40" />
                </div>
            )}

            <div className="product-filter-page--layout">
                <Sidebar isOpen={isOpenLeftBar} position="left" onClickOnBackdrop={handleClickSidebarBackdrop}>

                    <div className="">
                        {/**** sidebar fixed navigation ******/}
                        <div className="sidebar-fixed-bar top-0 bg-white py-3 px-4 md:hidden">
                            <div className="logo flex items-center  ">
                                <div className="md:hidden block mr-3 ">
                                    <Circle onClick={handleClickSidebarBackdrop}>
                                        <FaAngleLeft className="text-lg" />
                                    </Circle>
                                </div>

                                <Link to="/seller/dashboard" className="flex items-center">
                                    <img src="/public/logo-2.png" alt="" className="w-9 md:w-11" />
                                    <h4 className="text-neutral-900 font-semibold text-lg md:text-xl   md:block">Dream Bazar</h4>
                                </Link>
                            </div>
                        </div>

                        {/**** sidebar content ******/}
                        <div className="mt-20 md:mt-4 px-3">
                            {/*{ss}*/}
                            <CategoryList onChangeCategory={handleChangeCategory} />
                            <BrandList />
                        </div>
                    </div>
                </Sidebar>

                <div className="content w-full content-container">
                    {/*<RenderBreadcrumb*/}
                    {/*  dispatch={dispatch}*/}
                    {/*  selectedCatSections={selectedCatSections}*/}
                    {/*/>*/}

                    {/*<h4>{currentNestedSubCategory._id && currentNestedSubCategory._id }</h4>*/}
                    {/**/}
                    <div className="row my-5">
                        <h4>{filters.category?.selected?.name}<span className="sm-text">
                          {`(Showing ${filters.pagination.viewPerPage*filters.pagination.currentPage} products of ${filters.pagination.totalItems} products)`}
                          </span>
                            <span className="sm-text">Page {filters.pagination.currentPage}</span>
                        </h4>
                    </div>

                    <div className="row my-5 sorting_btn_section">
                        Sort By
                        {renderSortingBtn()}
                    </div>

                    {renderProducts()}


                </div>
            </div>

            {filters.pagination.totalItems > 0 && <div className="py-10">
                <Pagination
                    totalItem={filters.pagination.totalItems}
                    perPage={filters.pagination.viewPerPage}
                    onChange={handlePagination}
                    pageNumber={filters.pagination.currentPage}
                />
            </div>}

        </div>
    );
	// return (
	//   <h1>sdfsddddd</h1>
	// )
};

export default WithWidth(ProductFilter);

