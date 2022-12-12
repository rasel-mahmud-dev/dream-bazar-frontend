import React, {FC} from "react"

import { fetchProduct, toggleLoader } from "actions/productAction"

import {ACTION_TYPES} from "store/types"


import { Button, Badge, Image, Typography, Spin} from "UI/index"
import {connect, useDispatch } from "react-redux"

let image = `images/products_images/c20-rmx3063-realme-original-imagfxfzjrkqtbhe.jpeg`
let image2 = `images/products_images/c20-rmx3063-realme-original-imagfxfzjrkqtbhe.jpeg`

import {useNavigate, useParams,} from "react-router-dom"
import "./productDetails.scss"

import { addToCart } from "actions/cartAction"

import apis from "src/apis"

// import avatar from "src/asserts/images/avatar/avatar-1.jpg"

import fullLink from "src/utills/fullLink";
// import {toggleAppMask} from "actions/appAction";
import calculateDiscount from "src/utills/calculateDiscount";

interface ProductDetailsProps{
  toggleLoader?: (loadingState: string, isLoading: boolean)=> any
  toggleAppMask?: (isOpen?: boolean)=> any;
  loadingStates?: any[]
  addToCart: (data: object)=>any
}

const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const params = useParams()
  
  const navigate = useNavigate()
  // let history = useHistory()
  
  // const {homePageSectionData} = props.productState
  
  const [isShowImage, setShowImage] = React.useState(0)
  
  const [ product, setProduct] = React.useState<{
    _id?: string
    title?: string
    price?: number
    qty?: number,
    views?: number,
    sold?: number,
    brand_id?: string,
    brand?: {},
    category_id?: string,
    category?: {},
    images?: string[],
    cover_photo?: string,
    price_off?: number
    discount?: number
    seller?: {
      shop_name: string
    }
    oldPrice?: string
    seller_rules?: string[]
  }>({
    _id: "3424",
    title: "realme C20 (Cool Grey, 32 GB)  (2 GB RAM)",
    price: 30000,
    price_off: 20,
    cover_photo: "",
    images: []
  })
  
  const [ productDescription, setProductDescription] = React.useState<{
    _id?: string
    product_id?: string
    description?: string,
    highlight?: string[],
    details?: {[key: string]: any}
    seller_rules?: string[]
  }>({})
  
  React.useEffect(()=>{
    
    (async function (){
  
      props.toggleAppMask && props.toggleAppMask(true)
      props.toggleLoader && props.toggleLoader("product_details", true)
      
      let response = await apis.get(`/api/products/${params.productId}`)
      if(response.data && response.data.product) {
        
        setProduct({...product, ...response.data.product})

        
        response = await apis.get(`/api/products/details/${response.data.product._id}`)
        props.toggleLoader && props.toggleLoader("product_details", false)
        props.toggleAppMask && props.toggleAppMask(false)
        setProductDescription(response.data)
      }
    }())
    
  }, [params.productId])
  
  const productImageListRef = React.useRef<HTMLDivElement>(null)
  const relatedDevices  = [
    {title: "Xiaomi Redmi Note 10S", _id: ""},
    {title: "Xiaomi Redmi Note 10 Pro", _id: ""},
    {title: "Xiaomi Redmi 10", _id: ""},
    {title: "Xiaomi Redmi Note 10 5G", _id: ""},
    {title: "Xiaomi Redmi Note 9", _id: ""},
    {title: "Xiaomi Redmi 9T", _id: ""},
  ]
  const productQuestions = [
    {
      qs: { username: "alex", avatar: "", text: "It supports jio sim", created_at: new Date().toString()},
      ans:{ text: "Yes, It's"},
    },
    {
      qs: { username: "antron", avatar: "", text: "It 5G", created_at: new Date()},
      ans:{ text: "Yes, It's"},
    },{
      qs: { username: "alex", avatar: "", text: "It supports jio sim", created_at: new Date().toString()},
      ans:{ text: "Yes, It's"},
    },
    {
      qs: { username: "antron", avatar: "", text: "It 5G", created_at: new Date()},
      ans:{ text: "Yes, It's"},
    },{
      qs: { username: "alex", avatar: "", text: "It supports jio sim", created_at: new Date().toString()},
      ans:{ text: "Yes, It's"},
    },
    {
      qs: { username: "antron", avatar: "", text: "It 5G", created_at: new Date()},
      ans:{ text: "Yes, It's"},
    },{
      qs: { username: "alex", avatar: "", text: "It supports jio sim", created_at: new Date().toString()},
      ans:{ text: "Yes, It's"},
    },
    {
      qs: { username: "antron", avatar: "", text: "It 5G", created_at: new Date()},
      ans:{ text: "Yes, It's"},
    },
  
  ]
  const reviews = [
    {
      ratings: 5,
      title: "day to day king",
      desc: "This is such a budget friendly product.It also makes a good first impression as the overall look of the device is really impressive. The device also provides a decent display and camera with a storage space of 32 GB.",
      username: "Rasel Mahmud",
      customer_photos: [],
      created_at: new Date()
    },
    {
      ratings: 5,
      title: "day to day king",
      desc: "This is such a budget friendly product.It also makes a good first impression as the overall look of the device is really impressive. The device also provides a decent display and camera with a storage space of 32 GB.",
      username: "Rasel Mahmud",
      customer_photos: [],
      created_at: new Date()
    }
  ]
  const rating = [
    {rating: 1, amount: 20},
    {rating: 2, amount: 30},
    {rating: 3, amount: 10},
    {rating: 4, amount: 20},
    {rating: 5, amount: 10},
  ]
  

  const dispatch = useDispatch()
  const { loadingStates } = props
  
  
  function handlePushBack(){
    navigate(-1)
  }
  
  function handleProductAction(type, prod){
    props.addToCart(prod)
  }
  
  
  function renderLoader(where){
    let loadingState = loadingStates && loadingStates.find(ls=>ls.where === where)
    return (
      <div className="text-center">
        { loadingState && loadingState.isLoading
        && <Spin  />
        }
      </div>
    )
  }
  
  
  
  function calculateRate(){
    let subTotalRate = 0
    let totalAmount = 0
    rating.map(rate=>{
      subTotalRate += (rate.rating * rate.amount)
      totalAmount += rate.amount
    })
    return (subTotalRate / totalAmount).toFixed(1)
  }
  
  function totalRating(){
    let totalAmount = 0
    rating.map(rate=>{
      totalAmount += rate.amount
    })
    return totalAmount
  }
  
  function scrollDownHandler(){
    let s = productImageListRef.current as HTMLDivElement
    s.scrollTop  = s.scrollTop + 45
  }
  
  function  addToCartHandler(product){
    props.addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      cover_photo: product.cover_photo,
    })
  }
  
  // get rate =  (rating * amount)n + (rating * amount)n / totalAmount
  
  let Title = Typography.Title.default
  
  
  function renderDeepDetails() {
    if(productDescription.details) {
      return Object.keys(productDescription.details).map(sectionKey=>{
        return ( <div className="description_section">
            <div  className="mt-5">
              <div className="description_key description_key_att" >{sectionKey}</div>
              <div className="description_value">
                {productDescription.details && productDescription.details[sectionKey] && Object.keys(productDescription.details[sectionKey]).map(sec=>(
                  <div className="description_section_row">
                    <li className="description_key--key">{sec}</li>
                    <li className="description_key--value">{productDescription.details && productDescription.details[sectionKey][sec]}</li>
                  </div>
                ))}
              </div>
            </div>
          </div>
        
        )
        
      })
    }
  }


  
  return (
    <div >
      <div className="product_details">
  
        <div className="spin-fixed top-1/4">
          {renderLoader("product_details")}
        </div>
        
        <div className="product_image_view-col">
          
          <div className="fixed_section">
            <div className="flex flex-col">
             <i className="add_wish_icon fa fa-heart" />
    
              <div className="product-photo--sidebar">
                <div ref={productImageListRef} className="image_list">
                  {product.images && product.images.map((g, i)=>(
                    <div onClick={()=>setShowImage(i+1)} className={[isShowImage == i ? "active_image" : "", "image_list_each-div"].join(" ")}>
                      <img src={fullLink(g)} alt="" />
                    </div>
                  ))}
                </div>
                
                <div onClick={scrollDownHandler} className="image_list_each-div bb text-center">
                  <i className="fa fa-angle-down"/>
                </div>
    
              </div>
              
              <div className="product_image_view-col--full-image">
                <img src={ isShowImage
                    ? fullLink( product.images ? product.images[isShowImage - 1] : "")
                    : fullLink(product.cover_photo ? product.cover_photo : "")
                } alt="" />
              </div>
              
              <div  className="mt-5">
                <Button onClick={()=>addToCartHandler(product)} >Add To Cart</Button>
                <Button >Buy Now</Button>
              </div>
            </div>
            
            <div  className="mt-5">
              <Title level={4} className="section_title mb-3">RELATED DEVICES</Title>
              <div className="flex flex-wrap justify-center">
                {relatedDevices && relatedDevices.map(dev=>(
                  <div className="w-32 m-2">
                    <div className="w-10 m-auto">
                      <Image className="m-auto" maxWidth={50} src={fullLink(image)}/>
                    </div>
                    <h4 className="mt-2 text-center font-medium text-xs">{dev.title}</h4>
                  </div>
                ))}
              </div>
              <Button className="text-primary" type="text">MORE RELATED DEVICES </Button>
            </div>
            
            <div className="mt-5">
              <Title level={4} className="section_title mb-3">POPULAR FROM XIAOMI</Title>
              <div className="flex flex-wrap">
                {relatedDevices.map(dev=>(
                  <div className="w-32 m-2">
                    <div className="w-10 m-auto">
                      <img src={fullLink(image)}/>
                    </div>
                    <h4 className="mt-2 text-center font-medium text-xs">{dev.title}</h4>
                  </div>
                ))}
              </div>
              <Button className="text-primary" type="text">MORE RELATED DEVICES </Button>
            </div>
            
          </div>
        
        </div>
        
        
        <div className="product_description_col">
          <h4 className="text-lg font-medium mb-2">{product.title}</h4>
          <div>
            <div className="rating_badge">
              <span>{calculateRate()}</span>
              <i className="fa fa-star" />
            </div>
            <h5 className="ml-2 text-sm"> 1,50,723 Ratings & 7,095 Reviews</h5>
          </div>
          <div className="pt-3 flex items-center">
            <h4 className="text-lg font-bold">TK { calculateDiscount(product.discount || 0, product.price || 0)}</h4>
            <h5 className="off-div d-flex ml-3 ">
              <span>TK{product.price}</span>
              <span>{product.discount}% off</span>
            </h5>
          </div>
          <h6>No Cost EMI</h6>
          
          <div>
            <div  className="mt-5">
              <div className="description_key" >
                <img style={{maxWidth: '20px'}} src={image} alt="" />
              </div>
              <h5 className="description_key--value">1 Year Warranty for Mobile and 6 Months for Accessories Know More</h5>
            </div>
            <div  className="mt-5">
              <div className="description_key" >
                <Title level={4} className="section_title">Highlights</Title>
              </div>
              
              <ul className="description_key--value highlights">
                {productDescription.highlight && productDescription.highlight.map(h=>(
                  <li className="highlight_item">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div  className="mt-5">
              <div className="description_key" >
                <Title level={4} className="section_title">Seller</Title>
              </div>
              <ul className="description_value description_key--value">
                <li className="flex items-center">
                  {product.seller && product.seller.shop_name}
                  <div className="rating_badge ml-2">
                    <span>{calculateRate()}</span>
                    <i className="fa fa-star" />
                  </div>
                </li>
                { productDescription.seller_rules && productDescription.seller_rules.map(rule=>(
                    <li>{rule}</li>
                ))}
              </ul>
            </div>
            
            <div  className="mt-5">
              <div className="description_key" >
                <Title level={4} className="section_title" >Description</Title>
              </div>
              <p className="description_value description_key--value">{productDescription.description}</p>
            </div>
          </div>
          
          <div>
            <Title level={4} className="section_title" >Specifications</Title>
            { renderDeepDetails() }
            {/*{descriptionAttributes.map(eachAttribute=>(*/}
            {/*  <div className="description_section">*/}
            {/*    <div ="mt-5">*/}
            {/*      <div className="description_key description_key_att" >{eachAttribute.name}</div>*/}
            {/*      <div className="description_value">*/}
            {/*        {eachAttribute.sections && eachAttribute.sections.map(sec=>(*/}
            {/*          <div className="description_section_row">*/}
            {/*            <li className="description_key--key">{sec.name}</li>*/}
            {/*            <li className="description_key--value">{sec.value}</li>*/}
            {/*          </div>*/}
            {/*        ))}*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*))}*/}
            <div className="p-5 disclimer">
              <p><span className="strong">Disclaimer</span>. We can not guarantee that the information on this page is 100% correct. Read more</p>
            </div>
            
            <div className="question_answer_section">
              <Title level={4} weight={500} className="section_title">Questions and Answers</Title>
              <div className="question_answer_root">
                {productQuestions.map(qs=>(
                  <div className="question_answer p-3">
                    <div >
                      <h5>Q: {qs.qs.text}</h5>
                    </div>
                    <h5 >A: {qs.ans.text}</h5>
            
                    <div className="mt-2" >
                      <div className="flex">
                        <Image  src={""} maxWidth={"avatar"}/>
                        <Title className="ml-2" level={5}>{qs.qs.username}</Title>
                      </div>
                      <Title level={6}>{new Date(qs.qs.created_at).toDateString()}</Title>
                    </div>
            
                  </div>
                ))}
              </div>
              <Button  className="text-primary" style={{marginLeft: 0}} type="text" >All Questions</Button>
            </div>
  
            <div className="rating_and_review">
              <Title level={2} weight={500} >Ratings & Reviews</Title>
  
            <div >
              <div className="d-flex mt-5">
                <div>
                  <div className="rating_badge bg-transparent rating-star big-rating ">
                    <span>{calculateRate()}</span>
                    <i className="fa fa-star" />
                  </div>
                  <h4 className="text-grey fs-14 mt-5" > {totalRating()} Total Ratings</h4>
                  <Title className="text-grey fs-14 t-center" level={4}>&</Title>
                  <h4 className="text-grey fs-14" > {reviews.length} Total Ratings</h4>
                </div>
                <div  className="ml-5">
                  { rating.map(rat=>(
                    <div className="rate">
                      <div className="rating_badge bg-transparent rating-star ">
                        <span>{rat.rating}</span>
                        <i className="fa fa-star" />
                      </div>
                      <span className="user_rate-wrapper">
                        <div style={{width: ((rat.amount * 100) / totalRating())+"%"} } className="user_rate"/>
                      </span>
                      <span className="rate-amount text-grey fs-14 ml-5">{rat.amount}</span>
                      
                    </div>
                  )) }
                  
                
                </div>
              </div>
              
              <div className="mt-5">
                <Title level={4}>Customer Gallery</Title>
                <div  className="customer_gallery flex-wrap">
                  { new  Array(30).fill("", 1, 30).map(a=>(
                    <div>
                      <Image className="m-2" maxWidth={25} src={image2} />
                    </div>
  
                  ))}
                </div>
              </div>
              
            </div>
              
              <div className="rating_root mt-5">
                
                {reviews.map(review=>(
                  <div className="rating">
                    <div className="flex items-center">
                      <div className="rating_badge">
                        <span>{review.ratings}</span>
                        <i className="fa fa-star" />
                      </div>
                      <Title level={4} className="ml-2">{review.title}</Title>
                    </div>
                    <Title level={5}>{review.desc}</Title>
                    <Image className="mt-5 mb-2" src={image2} maxWidth={30} />
                    
                    <div >
                      <Title level={5} className="mr-40">{review.username}</Title>
                      <h5 className="">
                        <i className="mr-2 fa fa-check-circle"/>
                        Certified Buyer</h5>
                      <Title level={6} className="ml-2 date">{new Date(review.created_at).toDateString()}</Title>
                    </div>
                  </div>
                ))}
              </div>

              <Button  className="text-primary" type="text" >All Review</Button>
              
            </div>
            
          </div>
        
        
        </div>
      </div>
    
    
    
    
    
    
    </div>
  );
}

function mapStateToProps(state){
  return {
    productDetails: state.productState.productDetails,
    loadingStates: state.productState.loadingStates
  }
}



export default connect(mapStateToProps, {
  fetchProduct,
  toggleLoader,
  // toggleAppMask,
  addToCart
})(ProductDetails)


// function calculateDiscount(): string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal {
//     throw new Error("Function not implemented.")
// }
//
