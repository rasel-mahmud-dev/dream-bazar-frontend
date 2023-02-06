import React, {FC, useEffect, useState} from "react";
import Pagination from "components/Pagination/Pagination"
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import api, {getApi} from "src/apis";
import {useDispatch, useSelector} from "react-redux";
import {ACTION_TYPES} from "store/types";
import "./productFilterPage.scss";
import NotFoundProduct from "UI/404-Product/Not-Found-Product";
import {filterProductsAction, filterProductsAction2222222222} from "actions/productAction";
import {RootState} from "src/store";
import BrandList from "pages/main/productFilterPage/BrandList";
import Product from "components/Product/Product";
import SEO from "components/SEO/SEO";
import CategoryList from "components/CategoryList/CategoryList";
import WithWidth from "UI/withWidth/withWidth";
import Sidebar from "components/sidebar/Sidebar";
import Circle from "UI/Circle/Circle";
import {FaAngleLeft} from "react-icons/all";
import {setFilter, SetFilterActionPayload} from "actions/filterSidebar.action";
import FilterAttribute from "pages/main/productFilterPage/Filter.Attribute";
import useAppDispatch from "src/hooks/useAppDispatch";


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

const ProductFilter: FC<ProductFilterType> = ({innerWidth}) => {
    const {
        productState: {filterProducts, filters},
        categoryState: {category, brandsForCategory, flatCategories},
        appState: {isOpenLeftBar},
    } = useSelector((state: RootState) => state);

    const params = useParams();


    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    // const d = props.appState.ui_categories


    const [paginate, setPaginate] = React.useState({
        perPage: 3,
        currentPage: 1,
    });


    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    let [currentFullCategoryName, setCurrentFullCategoryName] = useState("")

    // when enter filter Product page with queryparams category id
    // and rootCategory id, we find rootCategory and store it.

    useEffect(() => {

        // console.log(category)
        filterProductsAction2222222222({
            category,
            filters,
            dispatch,
            brandsForCategory,
            setCurrentFullCategoryName,
            setHttpResponse
        });

    }, [
        category.selected,
        category.allNestedIds,
        filters.brands,
        filters.pagination.currentPage,
        filters.pagination.viewPerPage,
        filters.attributes,
        flatCategories
    ]);






    // fetch brands using names
    function fetchBrandByNames<T>(...brandNames: string[]) {
        return new Promise<T>(async (resolve, reject) => {
            try {
                let brandQuery = ""
                brandNames.forEach((brand, index) => {
                    brandQuery += `${brand}___`
                })
                let {data, status} = await getApi().get<T>("/api/brands/info/" + brandQuery)
                if (status === 200) {
                    resolve(data)
                } else {
                    resolve(null as T)
                }
            } catch (ex) {
                resolve(null as T)
            }
        })
    }


    /**
     if it has some product filter attribute (like ideal, brand) value in location state.
     then set it in filter state in global state.
     * */
    useEffect(() => {
        (async function () {
            let updateFilterState: SetFilterActionPayload = {}
            const {brand, ideal} = location.state
            if (brand) {
                let brands = await fetchBrandByNames<{ _id: string, name: string, logo?: string }[]>(brand);
                if (brands) {
                    updateFilterState.brands = brands
                }
            }
            if (ideal) {
                updateFilterState.ideals = [ideal]
            }

            if (updateFilterState) {
                dispatch(setFilter(updateFilterState))
            }
        }())


    }, [location.state])


    function renderProducts() {
        function handleAddToWishList(product) {
            api.post("/api/toggle-wishlist", {productId: product._id}).then((data) => {
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
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filterProducts && filterProducts.length > 0 ? (
                    filterProducts.map((product, i) => (
                        <Product
                            key={i}
                            product={product}
                            handleAddToWishList={handleAddToWishList}
                            isWished={isWished}
                            // renderProductAtt={renderProductAtt}
                        />
                    ))
                ) : (
                    <NotFoundProduct title="Product not found on this Category "/>
                )}
            </div>
        );
    }

    function renderSortingBtn() {
        const data = [
            {label: "Popularity", field: "views", order: -1, id: 1},
            {label: "Price -- Low to High", field: "price", order: 1, id: 2},
            {label: "Price -- High to Low", field: "price", order: -1, id: 3},
            {label: "Newest First", field: "created_at", order: -1, id: 4},
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
                payload: {sortBy: updatedSortBy},
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
        setHttpResponse((p) => ({...p, loading: true}));
    }


    return (
        <div className="pb-10 relative">

            <SEO title={`p/${params.pId}/${params.treeId}`} description="Product filter"/>

            {/*{httpResponse.loading && (*/}
            {/*    <div className="fixed w-full h-full bg-black/40 top-0 left-0 z-500">*/}
            {/*        <Spin className="absolute left-1/2 top-40" />*/}
            {/*    </div>*/}
            {/*)}*/}

            <div className="product-filter-page--layout">
                <Sidebar isOpen={isOpenLeftBar} position="left" onClickOnBackdrop={handleClickSidebarBackdrop}>

                    <div className="">
                        {/**** sidebar fixed navigation ******/}
                        <div className="sidebar-fixed-bar top-0 bg-white py-3 px-4 md:hidden">
                            <div className="logo flex items-center  ">
                                <div className="md:hidden block mr-3 ">
                                    <Circle onClick={handleClickSidebarBackdrop}>
                                        <FaAngleLeft className="text-lg"/>
                                    </Circle>
                                </div>

                                <Link to="/seller/dashboard" className="flex items-center">
                                    <img src="/public/logo-2.png" alt="" className="w-9 md:w-11"/>
                                    <h4 className="text-neutral-900 font-semibold text-lg md:text-xl   md:block">Dream Bazar</h4>
                                </Link>
                            </div>
                        </div>

                        {/**** sidebar content ******/}
                        <div className="mt-20 md:mt-4 px-3">
                            {/*{ss}*/}
                            <CategoryList onChangeCategory={handleChangeCategory}/>
                            <BrandList currentFullCategoryName={currentFullCategoryName}/>
                            <FilterAttribute/>
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
                        <h4>{category.selected?.name}<span className="sm-text">
                          {`(Showing ${filters.pagination.viewPerPage * filters.pagination.currentPage} products of ${filters.pagination.totalItems} products)`}
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

};

export default WithWidth(ProductFilter);

