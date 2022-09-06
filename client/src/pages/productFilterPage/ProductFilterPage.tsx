import React, {FC} from "react"
// import json from "src/breadcrumbData.json"
import {  Badge, Pagination, Tooltip, Spin} from "components/UI"
import qstring from "query-string"
import {Link, useParams, useNavigate, useLocation} from "react-router-dom"
import api from "src/apis"
import {useDispatch, connect} from "react-redux"
import FilterSidebar from "components/FilterSidebar/FilterSidebar"
import {ACTION_TYPES} from "store/types"
import "./productFilterPage.scss"
import {nonInitialEffect} from "src/reactTools"

// import Store from "pages/storePage/StorePage"

import fullLink from "src/utills/fullLink";
import Title from "UI/typography/Title";

import NotFoundProduct from "UI/404-Product/Not-Found-Product";
import SidebarRenderCategory from "components/SidebarRenderCategory/SidebarRenderCategory";
import {LastSelectedCategoryProps, PaginationWhereEnum, SelectedCatSectionType} from "reducers/productReducer";
import RenderBreadcrumb from "components/renderBreadcrumb/RenderBreadcrumb";
// import {Dispatch} from "redux";
import {toggleLoader} from "actions/productAction";
import {toggleAppMask} from "actions/appAction";
import calculateDiscount from "src/utills/calculateDiscount";
import apis from "src/apis";
import {getPagination} from "actions/localActions";
import CategoryList from "pages/productFilterPage/CategoryList";
import {RootState} from "src/store";
import BrandList from "pages/productFilterPage/BrandList";
import staticImagePath from "src/utills/staticImagePath";
import {FaHeart} from "react-icons/all";


let initialLoad = true

let preCollapsCat;

interface ProductFilterType {
  toggleLoader: any,
  toggleAppMask: any
  category?: any,
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
  currentCategorySelected: {id?: string, _id?: string, name?:string}
  products: {}[]
  currentCategoryRoot: {name: "", id: "", _id: "", sub_menu: []}[],
  productState: any
  appState: any
}

interface ExpandSubMenuProps {
  id: string,
  name: string,
  isExpand: boolean
  sub_menu: {
    id: string,
    _id: string,
    name: string,
    isExpand: boolean
    sub_menu: {
      _id: string,
      id: string,
      name: string,
      isExpand: boolean
    }
  }
}

let ss;

const ProductFilter: FC<ProductFilterType> = (props) => {
  let { productState, appState } = props
  
  const {
    paginations,
    products,
    totalProduct,
    totalFilterAbleProductCount,
    currentCategorySelected,
    filteredAttributes,
    loadingStates,
    filters,
    selectCategory,
    flatCategories
  } = productState
  
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  // const d = props.appState.ui_categories

  const [paginate, setPaginate] = React.useState({
    perPage: 3,
    currentPage: 1
  })

  const [collapseMenus, setCollapseMenus] = React.useState({})
  const [expandSubMenu, setExpandSubMenu] = React.useState<ExpandSubMenuProps>({
    id: "",
    isExpand: false,
    name: "",
    sub_menu: {_id: "", id: "", isExpand: false, name: "", sub_menu: {_id: "", id: "", isExpand: false, name: ""}}
  })


  function resetPaginationValue(){
    let updatedPaginations =[...paginations]
    let findex = updatedPaginations.findIndex(pg=>pg.where==="filter_products_page")
    if(findex !== -1){
      updatedPaginations[findex].currentPage = 1
    }
    dispatch({
      type: "SET_PAGINATIONS",
      payload: updatedPaginations
    })
    setPaginate({
      perPage: 20,
      currentPage: 1
    })
  }

  const [breadcrumbData, setBrandcrumbData] = React.useState({})
  const [categoryData, setCategoryData] = React.useState<{expand?: boolean, id?: string, name?: string, sub_menu?: []}>({})

  // when enter filter product page with queryparams category id
  // and rootCategory id, we find rootCategory and store it.
  // React.useEffect(()=>{
  //   let qs = qstring.parse(history.location.search)
  //   // console.log(qs)
  //   const { cat, cat_tree, ...otherParams } = qs
  //
  //   if(otherParams.category) {
  //     let catArray = otherParams.category?.split("--")
  //     renderSelectedCategory(catArray, cat)
  //   }
  //
  //   if(cat){
  //     // * if change root of cat, then only change state value currentCategoryRoot
  //     if(currentCategoryRoot.id !== cat){
  //       let currentCategoryRoot = json ? json.find(c=>c.id === cat) : null
  //       dispatch({
  //         type: "SET_CURRENT_CATEGORY_ROOT",
  //         payload: currentCategoryRoot
  //       })
  //
  //       if(cat_tree) {
  //         // console.log(qs)
  //         // expand nested category
  //         handleClickSubMenu(cat_tree, otherParams)
  //       }
  //
  //       // let updatedFilteredAttributes = [...filteredAttributes]
  //       // if(qs.ideal && qs.ideal !== "undefined"){
  //       //   updatedFilteredAttributes = [
  //       //     ...updatedFilteredAttributes,
  //       //     {attribute_name: "ideal_for", values: [{value: qs.ideal, name: qs.ideal.toUpperCase()}]}
  //       //   ]
  //       // }
  //       //
  //       // if(updatedFilteredAttributes && updatedFilteredAttributes.length > 0) {
  //       //   dispatch({
  //       //     type: ACTION_TYPES.SET_filtered_Attributes,
  //       //     payload: updatedFilteredAttributes
  //       //   })
  //       // }
  //
  //
  //     } else{
  //       // // only change cat_tree to fetch product from database
  //       // if(qs.cat_tree) {
  //       //   console.log("sands")
  //       //   // expand nested category
  //       //   handleClickSubMenu(qs.cat_tree)
  //       //
  //       // }
  //     }
  //   }
  //
  //   return ()=>{
  //     // setStore({name: "", sections: [], store_id: "", store_name: "", top_brands: []})
  //   }
  // }, [history.location.search])

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


  // @ts-ignore
  // React.useEffect(()=>{
  //   (async function () {
  //
  //     // props.toggleAppMask(true)
  //     // props.toggleLoader("product-filter", true)
  //     // parse query parameter and set rootCategory and last selected category
  //     let { cat, cat_tree, brand } = qstring.parse(location.search)
  //
  //
  //     if(brand) {
  //       // find brand using brand name...
  //       apis.get(`/api/brand?brandName=${brand}`).then(response => {
  //         if (response.status === 200) {
  //           let brand = response.data.brand
  //           dispatch({
  //             type: ACTION_TYPES.ADD_FILTER,
  //             payload: {
  //               brands: [brand]
  //             }
  //           })
  //         }
  //       }).catch(err => {
  //         dispatch({
  //           type: ACTION_TYPES.ADD_FILTER,
  //           payload: {
  //             brands: []
  //           }
  //         })
  //       })
  //     }
  //
  //     /**
  //      fetch only one category that has url params as root category instead of fetch all categories... (like old way)
  //      let selectedRootCat  = props.appState.ui_categories ? props.appState.ui_categories.find(js=>js.id == cat) : {}
  //      let { currentNestedSubCategory, selectedCatSections } = chooseLastSelectedCategory(selectedRootCat, cat_tree)
  //      */
  //
  //     // let response0 = await apis.get(`/api/category?parentId=''`)
  //     // console.log(response0)
  //     // if(!cat) return;
  //     // let response = await apis.get(`/api/category?name=${cat}`)
  //     // if(response.status === 200) {
  //     //   let response2 = await apis.get(`/api/category?parentId=${response.data.id}`)
  //
  //       // let newFetchedRootCategory = response.data
  //       // console.log(cat_tree)
  //       // let { currentNestedSubCategory, selectedCatSections } = chooseLastSelectedCategory(newFetchedRootCategory, cat_tree)
  //
  //       /**
  //        here is one issue down code 4 dispatch function re-render 4 times ui.
  //        you can merge it.
  //        so, it will render one time
  //        */
  //       // dispatch({
  //       //   type: ACTION_TYPES.SET_UI_CATEGORIES,
  //       //   payload: newFetchedRootCategory
  //       // })
  //       // dispatch({
  //       //   type: "SET_SELECTED_CATEGORY_SECTIONS",
  //       //   payload: selectedCatSections
  //       // })
  //       //
  //       // dispatch({
  //       //   type: "SET_CURRENT_CATEGORY_ROOT",
  //       //   payload: newFetchedRootCategory
  //       // })
  //       // dispatch({
  //       //   type: "SET_CURRENT_NESTED_SUBCATEGORY",
  //       //   payload: currentNestedSubCategory
  //       //   // payload: currentNestedSubCategory
  //       // })
  //
  //       // let categoryInfoRes = await apis.get(`/api/ui-data/category-info/${currentNestedSubCategory.id}`)
  //       // if(categoryInfoRes.status === 200){
  //       //
  //       //   if(categoryInfoRes.data.filter_items){
  //       //
  //       //   let filterItemsRes = await apis.post("/api/ui-data/filter-items", {attributeNames: categoryInfoRes.data.filter_items})
  //       //   if(filterItemsRes.status === 200) {
  //       //     let filter_items_populated = []
  //       //     filterItemsRes.data.findIndex(fItem => {
  //       //       let match = categoryInfoRes.data.filter_items.indexOf(fItem.attribute_name)
  //       //       if (match !== -1) {
  //       //         filter_items_populated.push(fItem)
  //       //       }
  //       //     })
  //       //   }
  //       //
  //       //     // dispatch({type: ACTION_TYPES.SET_UI_CATEGORY_INFO, payload:  {
  //       //     //   ...categoryInfoRes.data,
  //       //     //   filter_items_populated
  //       //     // }})
  //       //
  //       //   }
  //       //
  //       //   /// fetch all brand for selected category
  //       //   if(currentNestedSubCategory._id){
  //       //     let brandResponse = await apis.post("/api/fetch-brands", {forCategoryIds: [currentNestedSubCategory._id]})
  //       //     dispatch({
  //       //       type: ACTION_TYPES.SET_BRAND_FOR_CATEGORY,
  //       //       payload: {
  //       //         id: currentNestedSubCategory.id,
  //       //         brands: brandResponse.data.brands
  //       //       }
  //       //     })
  //       //   }
  //       //
  //       // }
  //       // if(catRes.status === 200){
  //       //   dispatch({type: "SET_UI_FILTER_ITEMS", payload:  filterItemsRes.data})
  //       // }
  //
  //     // }
  //     // dispatch({
  //     //   type: "SET_LAST_SELECTED_CATEGORY",
  //     //   payload: currentNestedSubCategory
  //     // })
  //     //
  //   }())
  // }, [location.search])
  
  
  // function chooseLastSelectedCategory(selectedRootCat, cat_tree) {
  //   // console.log(selectedRootCat)
  //
  //   let currentNestedSubCategory = {}
  //   let updatedSelectedCatSections: SelectedCatSectionType = {
  //     oneLevel: selectedRootCat
  //   }
  //
  //   // console.log(selectedRootCat.id, cat_tree)
  //
  //   if(selectedRootCat){
  //     if(selectedRootCat.id === cat_tree){
  //       currentNestedSubCategory = selectedRootCat
  //     } else {
  //       if(selectedRootCat.sub_menu){
  //         for (let i = 0; i < selectedRootCat.sub_menu.length; i++) {
  //           if(selectedRootCat.sub_menu[i].id === cat_tree){
  //             currentNestedSubCategory = selectedRootCat.sub_menu[i]
  //             updatedSelectedCatSections = {
  //               ...updatedSelectedCatSections,
  //               twoLevel: selectedRootCat.sub_menu[i]
  //             }
  //           } else {
  //             if(selectedRootCat.sub_menu[i].sub_menu){
  //               for (let j = 0; j < selectedRootCat.sub_menu[i].sub_menu.length; j++) {
  //                 if(selectedRootCat.sub_menu[i].sub_menu[j].id == cat_tree){
  //                   currentNestedSubCategory = selectedRootCat.sub_menu[i].sub_menu[j]
  //                   updatedSelectedCatSections = {
  //                     ...updatedSelectedCatSections,
  //                     twoLevel: selectedRootCat.sub_menu[i],
  //                     threeLevel: selectedRootCat.sub_menu[i].sub_menu[j]
  //                   }
  //                 } else {
  //                   if(selectedRootCat.sub_menu[i].sub_menu[j].sub_menu){
  //                     for (let k = 0; k < selectedRootCat.sub_menu[i].sub_menu[j].sub_menu.length; k++) {
  //                       if(selectedRootCat.sub_menu[i].sub_menu[j].sub_menu[k].id === cat_tree){
  //                         currentNestedSubCategory =  selectedRootCat.sub_menu[i].sub_menu[j].sub_menu[k]
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //
  //   return {
  //     currentNestedSubCategory,
  //     selectedCatSections: updatedSelectedCatSections
  //   }
  // }

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
  //         Fetch product if subcategory exists like jeans, t-sharts   sub_category means url params &cat_tree=
  //        */
  //
  //       if(currentNestedSubCategory) {
  //         // we need category id that need to find category from  database
  //
  //         const { sortBy, brands=[] } = filters
  //
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

  // re-fetch product if change
  // brands, filteredAttributes, sortBy
  // React.useEffect(()=>{
  //
  //   try {
  //     /**
  //       Don't re-fetch product count if only change pagination or sort value.
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
  //       // fetching product with fetched this category id..
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
  
  React.useEffect(()=>{
   
    let data = {
        brands: filters.brands,
        selectCategory,
        filteredAttributes,
        // sortBy,
        paginate: {currentPage: pagination ? pagination.currentPage : 1, perPage: pagination ? pagination.perPage : 20},
      }

      filterProductWithState(data,  false, function (data) {
        dispatch({
          type: ACTION_TYPES.COUNT_TOTAL_FILTERABLE_PRODUCT,
          payload: data.products
        })
        dispatch({
          type: ACTION_TYPES.FETCH_FILTER_PRODUCTS,
          payload: data.products
        })
        
        // dispatch({
        //   type: ACTION_TYPES.COUNT_TOTAL_FILTERABLE_PRODUCT,
        //   payload: data.total
        // })
      })
    
  }, [selectCategory.root, selectCategory.tree, filters.brands])
  
  
  function getAllChildrenId(id, arr){
    let aa = []
    function re(id, arr){
      if(arr){
        arr.forEach(a=>{
          if(a.parentId === id){
            if(a.isProductLevel){
              aa.push(a.id)
              re(a.id, arr)
            }
          }
        });
      }
    }
    re(id, arr)
    return aa;
  }
  
  

  
  // refetch product if change paginate value
  // then append product with exist products in store
  nonInitialEffect(()=>{

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
  }, [paginations])

  // only count total filtered products. if changed these state

  async function filterProductWithState(data, isCount: boolean, cb){

    !isCount && props.toggleAppMask(true)
    !isCount && (props.toggleLoader && props.toggleLoader("product-filter", true))

    const {
      currentNestedSubCategory,
      selectCategory,
      brands,
      filteredAttributes,
      sortBy,
      paginate,
    } = data

    let attributes = {}
    if(filteredAttributes.length > 0 ){
      filteredAttributes.forEach(attr=>{
        let attrValArr: any = []
        attr.values.forEach(attrVal=>{
          attrValArr.push(attrVal.value)
        })
        attributes[attr.attribute_name] =  attrValArr
      })
    }

    let brandIds : string[] = []
    if(brands){
      brands.forEach((brand: any)=>{
        brandIds.push(brand.id)
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
      categoryIds: [],
      brandIds: brandIds.length > 0 ? brandIds : [],
      sortBy: sortBy && sortBy.length > 0 ? sortBy : [],
      // category_id: currentCategorySelected._id,
      pageNumber: paginate && paginate.currentPage,
      perPage: paginate && paginate.perPage
    }
  
    
    if(currentNestedSubCategory && selectCategory.tree){
      bodyData.categoryIds =  getAllChildrenId(selectCategory.tree.id, flatCategories)
    } else if(selectCategory && selectCategory.root){
      bodyData.categoryIds =  getAllChildrenId(selectCategory.root.id, flatCategories)
    }
  
    let response = await api.post(`/api/products/filter/v2`, bodyData)
    
    props.toggleAppMask(false)
    props.toggleLoader("product-filter", false)
   
    cb(response.data)
   
    
    
    // console.log(bodyData)
    // try {
    //   if(isCount){
    //     let {data} = await api.post(`/api/products/filter/v2`, {...bodyData, documentCount: true})
    //     cb(data)
    //   } else {
    //     let {data} = await api.post(`/api/products/filter/v2`, bodyData)
    //     if (data) {
    //       props.toggleAppMask(false)
    //       props.toggleLoader("product-filter", false)
    //       cb(data)
    //     }
    //   }
    // } catch (ex){
    //   console.log(ex)
    // }
  }
  
  

  function renderProducts(){

    function handleAddToWishList(product){
      api.post("/api/toggle-wishlist", {productId: product._id}).then(data=>{
        console.log(data)
      })
    }

    function isWished(product){
      // console.log(product.wishlist)
      // return product.wishlist && product.wishlist.indexOf(authState._id) !== -1
      return true
    }

    let renderProductAtt = [
      "title",
      "price"
    ]

      // return (
      //   <div className="products-views">
      //   { products && products.length > 0 ? products.map(product=>(
      //     <div className="product card pb-5">
      //       {renderProductAtt.map(key=>{
      //         return (
      //           <h1>{product[key]}</h1>
      //         )
      //       })}
      //     </div>
      //     ))  : ""
      //   }
      //   </div>
      // )

    return (
      <div className="products-views">
        { products && products.length > 0 ? products.map((product, i)=>(
          <div key={i} className="product card pb-5" >
            <FaHeart onClick={()=>handleAddToWishList(product)} className={`add_wish_list_btn  fa fa-heart  ${isWished(product)? 'wish': ''} `} />
            <div className="add_wish_list_btn left">
              <Badge
                color="light-A400"
                radius={2}
                bg="primary"
                count="Best Value"
              />
            </div>

            <Link className="block mx-auto" to={`/products/${product._id}`}>
              <div className="product_image_div">
                <div className="product_image_wra">
                  <img src={staticImagePath(product.coverPhoto)} alt=""/>
                </div>
              </div>
            </Link>

            <div className="card-body mx-5 mt-5">
              <Title level={5} className="product__brand_name">{product?.brand?.name}</Title>
              { renderProductAtt.indexOf("title") !== -1 &&  <h4 className="product__title">
                  <Tooltip theme="simple-white" tooltip={<a>{product.title}</a>}>
                    <Link to={`/products/${product._id}`}>
                      {product.title.slice(0, 20)}
                      { product.title && product.title.length > 20 ? "..." : "" }
                    </Link>
                  </Tooltip>
                </h4>
              }

              <div className="product__price_row d-flex align-center">
                <h5 className="product__price">TK {calculateDiscount(product.discount, product.price)}</h5>
                {product.discount !== 0 && <span className="product__price_old ml-3">TK{product.price}</span>}
                {product.discount !== 0 && <h5 className="product__discount_row">{product.discount}% off</h5>}

              </div>


              { renderProductAtt.indexOf("size") !== -1 && (
                <div className="product__size_row d-flex align-center">
                  <h4 className="">Size</h4>
                  <span className=" ml-5">S, M, L, XL, XXL</span>
                </div>
              )}
            </div>
          </div>
        )) : (
          <NotFoundProduct title="Product not found on this Category " />
        )}
      </div>
    )
  }

  function renderSortingBtn(){
    const data = [
      {label: "Popularity", field: "views", order: -1, id: 1},
      {label: "Price -- Low to High", field: "price", order: 1, id: 2},
      {label: "Price -- High to Low", field: "price", order: -1, id: 3},
      {label: "Newest First", field: "created_at", order: -1, id: 4}
    ]

    async function setSortHandler(item){
      let updatedSortBy = [...filters.sortBy]
      updatedSortBy = [{
        field: item.field,
        id: item.id,
        order: item.order
      }]
      
      dispatch({
        type: ACTION_TYPES.ADD_FILTER,
        payload: { sortBy: updatedSortBy }
      })

    }

    function isSorted(id){
      let i = filters.sortBy.findIndex(s=>s.id === id)
      return i !== -1
    }


    return data.map((item: any)=>(
      <span
        onClick={()=>setSortHandler(item)}
        key={item.key}
        className={["inline-nav", isSorted(item.id) ? "inline-nav__active" : ""].join(" ")}
      >
        {item.label}
      </span>
    ))
  }

  function handlePagination(pageNumber){
    let updatedPaginations =[...paginations]
    let findex = updatedPaginations.findIndex(pg=>pg.where==="filter_products_page")
    if(findex !== -1){
      updatedPaginations[findex].currentPage = pageNumber
    } else {
      updatedPaginations.push({
        currentPage: pageNumber,
        where: "filter_products_page",
        perPage: 3
      })

    }
    dispatch({
      type: "SET_PAGINATIONS",
      payload: updatedPaginations
    })
  }
  
  React.useEffect(()=>{

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

  }, [location.search, props.appState.ui_categories])

  function callbackHandler(jsx) {
    ss=jsx
    return null
  }

  function renderLoader(where){
    let loadingState = loadingStates.find(ls=>ls.where === where)
    return (
      <div className="">
        { loadingState && loadingState.isLoading
        && <Spin size={30} loaderColor="#502cff" borderWidth={4}  />
        }
      </div>
    )
  }

  let pagination = getPagination(paginations, PaginationWhereEnum.filter_products_page)

  return (
    <div >

      <div className="spin-fixed top-1/4 ">
        {/*<div className="backdrop-filter backdrop-blur-md w-52 h-20 flex items-center justify-center">*/}
        {renderLoader("product-filter")}
      {/*</div>*/}
      </div>

      <div className="product-filter-page--layout">
        <div className="sidebar">
          {/*{ss}*/}
          <CategoryList />
          <BrandList />
        </div>

        <div className="content content-container">
          {/*<RenderBreadcrumb*/}
          {/*  dispatch={dispatch}*/}
          {/*  selectedCatSections={selectedCatSections}*/}
          {/*/>*/}

          {/*<h4>{currentNestedSubCategory._id && currentNestedSubCategory._id }</h4>*/}
          {/**/}
          <div className="row my-5">
            {/*<h4>{currentCategorySelected.name}<span className="sm-text">*/}
            {/*  {`(Showing 1 – ${(pagination.perPage*pagination.currentPage) > totalFilterAbleProductCount ? totalFilterAbleProductCount : pagination.perPage*pagination.currentPage} products of ${totalFilterAbleProductCount} products)`}*/}
            {/*  </span>*/}
            {/*</h4>*/}
          </div>

          <div className="row my-5 sorting_btn_section">
            Sort By
            {renderSortingBtn()}
          </div>

          {renderProducts()}

          <div>
            <Pagination
              totalItem={totalProduct}
              perPage={paginate.perPage}
              currentPage={paginate.currentPage}
              onChange={handlePagination}
            />
          </div>

        </div>
      </div>

    </div>
  )
  // return (
  //   <h1>sdfsddddd</h1>
  // )
}


function mapStateToProps(state: RootState){
 
  return {
    productState: state.productState,
    appState: state.appState
  }
}



export default connect(mapStateToProps, {toggleLoader,toggleAppMask})(ProductFilter)

