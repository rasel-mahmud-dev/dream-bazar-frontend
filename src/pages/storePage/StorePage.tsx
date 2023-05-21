import React, {useEffect} from "react"
// import Slider from "components/slider/Slider";
import api from "src/apis"
import fullLink from 'src/utills/fullLink'
import "../shared/Shop/style.scss"
import Title from "UI/typography/Title";
import {Button,} from "components/UI";
import {Link} from "react-router-dom"
// import json from "src/breadcrumbData.json";
import {connect, useDispatch} from "react-redux"

interface storeType {
    store_id: string
    store_name: string
    name: string
    sections: {
        name: string,
        sliders: { slider_images: string[] }[],
        render_products: string[]
    }[],
    top_brands: string[],
    banner_image: string,
    cat_tree: string
    cat: string
    description: string
}


type StorePropsType = {
    // store: storeType
    currentCategoryRoot: object,
    currentCategorySelected: object
}

const Store = (props: StorePropsType) => {

    const {currentCategoryRoot, currentCategorySelected} = props


    let storeId: string = ""
    const [store, setStore] = React.useState<storeType | null>(null)

    const [render_products, setRenderProducts] = React.useState({})

    const topBrandRef = React.useRef<HTMLDivElement>(null)

    const [storeDesc, setStoreDesc] = React.useState<storeType>({
        description: "",
        cat: "",
        cat_tree: "",
        banner_image: "",
        name: "",
        sections: [],
        store_id: "",
        store_name: "",
        top_brands: [],
        ...store
    })

    const [isShowTopBrandBtn, setShowTopBrandBtn] = React.useState(false)

    const [queryObj, setQueryObj] = React.useState({cat: "", cat_tree: "", brand: ""})

    const dispatch = useDispatch()
    // const history  = useHistory()

    useEffect(() => {

        // let qs: any = qstring.parse(history.location.search)
        // setQueryObj(qs)
        // if(qs.cat){
        //   if(qs.cat.endsWith("-store")){
        //     storeId =  qs.cat
        //     let store: any = storeData.find(sd=>sd.store_id === storeId )
        //     if(store){
        //       // console.log(store)
        //       setStore(store)
        //     }
        //   } else{
        //     // let fCat = json ? json.find(c=>c.id === qs.cat) : null
        //     // dispatch({
        //     //   type: "SET_CURRENT_CATEGORY_ROOT",
        //     //   payload: fCat
        //     // })
        //   }
        // }

        // return ()=>{
        // setStore({name: "", sections: [], store_id: "", store_name: "", top_brands: []})
        // }

        // }, [history.location.search])
    }, [])


    useEffect(() => {
        if (store) {
            api.post("/api/fetch-brands", {brands: store.top_brands}).then(doc => {
                if (doc.data.brands && doc.data.brands.length > 0) {
                    setStoreDesc({
                        ...store,
                        top_brands: [
                            ...doc.data.brands,
                            {name: "Rasel", logo: ""},
                            {name: "Nokia", logo: ""},
                            {name: "Raju", logo: ""},
                            {name: "Hawei", logo: ""},
                            {name: "Apple", logo: ""},
                        ]
                    })
                }
            })
        }


        let updateRender_products = {}
        let i = 0;
        storeDesc.sections && storeDesc.sections.map((section, i) => {
            if (section.render_products) {
                // apis.post("/api/products/filter/v2", {product_ids: section.render_products}).then(r =>{
                //   updateRender_products[section.name] = r.data
                //   if(storeDesc.sections.length === (i + 1)){
                //     setRenderProducts(updateRender_products)
                //   }
                // }).catch(ex=>{
                //   console.log(ex)
                // })
            }
        })
    }, [store && store.store_id])


    function fetchStoreRenderProduct() {
        return (
            <div>
                <h1>This is an </h1>
            </div>
        )
    }

    function handleMouseOver() {
        setShowTopBrandBtn(true)
    }

    function handleMouseLeave() {
        setShowTopBrandBtn(false)
    }

    function renderTopBrand() {
        return (
            <div ref={topBrandRef} className="top-brands scroll-x-transparent">
                {storeDesc.top_brands && storeDesc.top_brands.map((brand: any) => (
                    <Link to={`/p?cat=${store?.cat}&cat_tree=${store?.cat_tree}&brand=${brand._id}`}>
                        <div className="brand">
                            <Title level={5}>{brand.name && brand.name}</Title>
                            <div className="brand_logo_div">
                                <div className="brand_logo">
                                    <img src={fullLink(brand.logo)} alt="brand_logo"/>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }

    function renderSectionProducts(sectionName) {
        return (
            <div className="product_section_header">
                {render_products[sectionName] && render_products[sectionName].length > 0 && (
                    <div className="product_section_header__header">
                        <h1>{sectionName}</h1>
                        <Button>Show More</Button>
                    </div>
                )}
                <div className="products_slider products_slider--store">
                    {render_products[sectionName] && render_products[sectionName].length > 0 && render_products[sectionName].map(p => (
                        <div className="product">

                            <div className="product_image_div">
                                <div className="product_image_wra">
                                    <img src={fullLink(p.cover_photo)} alt=""/>
                                </div>
                            </div>
                            <div className="desc">
                                <h4 className="product_name">
                                    <Link to="">{p.title} </Link>
                                </h4>
                                <>
                                    <h5 className="product_price">${p.price}</h5>
                                </>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    function renderStoreSectionProduct() {
        return (
            <div>
                {storeDesc.sections && storeDesc.sections.map(section => {
                    return (
                        <>
                            <div className="store-section">
                                <h2 className="t-center">{section.name.toUpperCase()}</h2>
                                <span className="span-underline"/>
                            </div>

                            {/*{section.sliders && section.sliders.map(sli=>(*/}
                            {/*  <Slider images={sli.slider_images} />*/}
                            {/*))}*/}

                            <div>{renderSectionProducts(section.name)}</div>

                            {/*{section.render_products && section.render_products.map(r_prod=>(*/}
                            {/*  // <h1>{render_products[r_prod]}</h1>*/}
                            {/*  */}
                            {/*))}*/}
                        </>
                    )
                })}
            </div>
        )
    }

    function renderStoreHeader() {
        return store && (
            <>
                <h4>{store.name}</h4>
                <p>{store.description}</p>
                <div className="shop-banner">
                    <h1>{store.store_name.toUpperCase()}</h1>
                </div>
            </>
        )
    }

    return (
        <div>

            {/*{renderStoreHeader()}*/}
            {/*{ store ? (*/}
            {/*    <div className="content-container">*/}

            {/*      <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseOver} className="top_brands_wrapper my-5 shadow-2">*/}
            {/*        {renderTopBrand()}*/}
            {/*        {isShowTopBrandBtn && <Button onClick={()=>topBrandRef.current.scrollLeft += 300 } hover={false} className="scroll_button" icon="next-brand-btn-icon fa fa-angle-right"  /> }*/}
            {/*      </div>*/}
            {/*      <div>*/}
            {/*        { storeDesc.banner_image && <Image src={fullLink(storeDesc.banner_image)}  maxWidth={100}/>}*/}
            {/*      </div>*/}
            {/*      <div className="store-sections">*/}
            {/*        { renderStoreSectionProduct() }*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  ) : null*/}
            {/*}*/}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentCategoryRoot: state.productState.currentCategoryRoot,
        currentCategorySelected: state.productState.currentCategorySelected
    }
}

export default connect(mapStateToProps, {})(Store)
