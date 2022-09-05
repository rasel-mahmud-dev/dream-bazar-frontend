import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux"
import { Link,  useParams } from "react-router-dom"
import {Button,  Pagination, Tooltip} from "src/components/UI"
import {changePagination, fetchOneTypeProductLength, fetchOneTypeProduct} from "src/store/actions/productAction"
import fullLink from "src/utills/fullLink";
import "./oneTypeProducts.scss"
import calculateDiscount from "src/utills/calculateDiscount";


const OneTypeProducts = (props) => {
  
  const {
    homePageSectionsData,
    oneTypeFetchProducts,
    oneTypeProductsLength,
    paginations
  } = props.productState
  
  // const history = useHistory()
  
  const params = useParams()
  
  const [isEntryLevel, setEntryLevel] = React.useState(false)
  const [ queryObject , setQueryObject] = React.useState<{
    slug?: string,
    id?: string,
    type?: string
  }>({})

// params type
// {name: "Top Popular Products", type: "products", filterBy: "top-views"}
  useEffect(()=>{
  
    let homePageSectionData = homePageSectionsData.find(homePage_data=>homePage_data.name === params.name)

    if(params && params.name){

      // 1. first know this section total items length  via api call
      // 2. second fetch this section item as pagination

      // 1.
      props.fetchOneTypeProductLength(homePageSectionData)

      // 2.
      const paginationIndex = paginations.findIndex(pg=>pg.where === "one_type_products")
      let pagination = paginations[paginationIndex]
      props.fetchOneTypeProduct(
        homePageSectionData,
        pagination.currentPage,
        pagination.perPage
      )
    }
  }, [params.name])

  
  useEffect(()=>{
    const paginationIndex = paginations.findIndex(pg=>pg.where === "one_type_products")
    let pagination = paginations[paginationIndex]
    
    props.fetchOneTypeProduct(
      params,
      pagination.currentPage,
      pagination.perPage
    )
  }, [paginations])
  
  function handlePushBack(){
    // history.back()
    // history.goBack()
  }
  
  
  function handlePagination(page){
    props.changePagination({where: "one_type_products", currentPage: page})
  }
  
  function shortName(name) {
    if(name) {
      let b = name.slice(0, 22)
      if (name.length >= 22) {
        b += "..."
      }
      return b
    }
  }

  return (
    <div >
      
      <div className="content-container">
        <div className="content-header">
          <Button onClick={handlePushBack}>Back To HomePage</Button>
          <h1 className="m-0 one-type-product__title">{oneTypeFetchProducts.name}</h1>
          <h4 className="m-0 text-lg text-center font-medium">{oneTypeProductsLength && (oneTypeProductsLength) }</h4>
        </div>
        
        <div >
          {oneTypeFetchProducts && oneTypeFetchProducts.values && oneTypeFetchProducts.values.length > 0 ? oneTypeFetchProducts.values.map(pp=>(
            <div className="justify-center d-flex">
              <div className="one-type-product__product m-1 mb-3">
                <div>
                  <Link className="product-detail-link" to={`/products/${pp._id}`}>
                    <div className="product_image_div relative">
                      <div className="product_image_wra relative">
                        <img src={fullLink(pp.cover_photo)} alt=""/>
                      </div>
                    </div>
                    {/*<Image className="m-auto" src={fullLink(pp.cover_photo)} maxWidth={100} />*/}
                  </Link>
            
                  <Tooltip delay={300} theme="simple-white" tooltip={<a>{params.type === "categories"
                    ? pp.name
                    : params.type === "brands"
                      ? pp.name
                      : pp.title}</a>}
                  >
                    <h4 className="mt-2 title">
                      <Link to={`/products/${pp._id}`}>{
                        shortName(params.type === "categories"
                          ? pp.name
                          : params.type === "brands"
                            ? pp.name
                            : pp.title)
                      }
                      </Link>
                    </h4>
                  </Tooltip>
                </div>
                { params.type === "products"
          
                && (
                  <div>
                    <h5 className="text-lg font-medium text-center">TK {calculateDiscount(pp.discount, pp.price)}</h5>
                    <div className="mt-2 flex items-center text-center justify-center">
                      <h5 className="ml-3 product_price">TK.{pp.price}</h5>
                      <h5 className="">-{pp.discount}%</h5>
                      {/*<Button>Add To Cart</Button>*/}
                    </div>
                  </div>
                )
                }
              </div>
            </div>
          )) : (
            <h1>No Product Found</h1>
          )}
  
        </div>
  
  
        <div className="mt-10">
          <Pagination
            onChange={handlePagination}
            totalItem={oneTypeProductsLength}
            perPage={5}
            currentPage={1}
          />
        </div>
      </div>
      
    </div>
  )
  
}

function mapToStateProps(state){
  return {
    productState: state.productState
  }
}

export default connect(mapToStateProps, {
  changePagination,
  fetchOneTypeProduct,
  fetchOneTypeProductLength
})(OneTypeProducts)