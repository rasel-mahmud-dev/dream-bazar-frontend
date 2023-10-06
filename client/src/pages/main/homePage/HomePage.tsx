import React, {lazy, useEffect} from "react";
import "./HomePage.scss";
import {ACTION_TYPES} from "store/types";
import {Link, useNavigate} from "react-router-dom";
import {fetchHomePageSection, fetchHomePageSectionProducts} from "actions/productAction";
import {Button, Image} from "UI/index";
import useLanguage from "src/hooks/useLanguage";
import SEO from "components/SEO/SEO";
import useScrollTop from "src/hooks/useScrollTop";
import useAppSelector from "src/hooks/useAppSelector";
import useAppDispatch from "src/hooks/useAppDispatch";
import RenderHomeSection from "components/HomePage/RenderHomeSection";
import apis from "src/apis";
import {HomePageSectionProduct} from "reducers/productSlice";

const HomeCategoryNav = lazy(() => import("pages/main/homePage/HomeCategoryNav/HomeCategoryNav"));
const SliderSection = lazy(() => import("pages/main/homePage/SliderSection"));


const HomePage = (props) => {

    useScrollTop()

    const dispatch = useAppDispatch();


    const navigate = useNavigate();

    const l = useLanguage();


    const dayDeals = [
        {
            title: "Pink Hoodie t-shirt full",
            seller: {shopName: "Mango"},
            price: "32.00", discount: 20,
            thumb: "https://themes.pixelstrap.com/multikart-app/assets/images/products/1.jpg"
        }, {
            title: "Pink Hoodie t-shirt full",
            seller: {shopName: "Mango"},
            price: "32.00", discount: 20,
            thumb: "https://themes.pixelstrap.com/multikart-app/assets/images/products/1.jpg"
        },
        {
            title: "Men Blue Denim Jacket",
            seller: {shopName: "Zara"},
            price: "32.00",
            discount: 20,
            thumb: "https://themes.pixelstrap.com/multikart-app/assets/images/products/2.jpg"

        },
        {
            title: "Pink Hoodie t-shirt full",
            seller: {shopName: "H&M"},
            price: "32.00", discount: 20,
            thumb: "https://themes.pixelstrap.com/multikart-app/assets/images/products/3.jpg"
        }
    ]


    const {homeSections, homeSectionData} = useAppSelector(state => state.productState)

    useEffect(() => {
        // if (homeSections && Array.isArray(homeSections)) {
        //     let homeSectionItemIds = homeSections?.map(sec => sec.id)
        //     if (!homeSectionItemIds) return;
        //     apis.post<HomePageSectionProduct>("/api/products/home-section-products", {
        //         sectionSlugs: [...homeSectionItemIds.slice(0, 22)]
        //     }).then(({data}) => {
        //         dispatch(fetchHomePageSectionProducts(data))
        //     }).catch(ex => {
        //         console.log(ex)
        //     })
        // }
    }, [homeSections])


    // const {selectedLang, lang} = appState;

    const [pagination, setPagination] = React.useState({perSection: 2, sectionNumber: 1});

    function loadMoreSection(where) {
        dispatch({
            type: ACTION_TYPES.UNLOCK_FETCHED_DATA,
            payload: "home_page",
        });

        dispatch({
            type: ACTION_TYPES.CHANGE_PAGINATION,
            payload: {where},
        });
    }

    function handler(e) {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }

    React.useEffect(() => {
        if (homeSections && Array.isArray(homeSections)) {
            let homeSectionItemIds = homeSections?.map(sec => sec.id)
            if (!homeSectionItemIds) return;
            dispatch(fetchHomePageSection(homeSectionItemIds));
        }
        // let fetchedDataa =  fetchedData.find(fd=>fd.where === "home_page")
        // console.log(fetchedDataa)
        // if(!fetchedDataa.isFetched) {
        //   props.fetchHomePageSectionProducts()
        // } else {
        //
        // }
    }, [homeSections]); // with watch when change paginations currentPage

    function handleScroll(e) {
        // let el = e.target
        // let offsetTop  = handler(e)
        // let tscroll = (el.scrollTop + el.clientHeight)
        // let sum = e.target.scrollHeight - tscroll
        // if(sum <= 0){
        //   setPagination({
        //     ...pagination,
        //     sectionNumber: pagination.sectionNumber + 1
        //   })
        // }
    }

    async function handleMoreItem(sectionName, obj) {
        // let old = {...productSectionsWithProduct}
        // let res;
        // if(obj[sectionName].type === "categories" || obj[sectionName].type === "brands"){
        //     // fetch more category or brand without change route
        //     // this means ... remove more item down this section
        //   if(obj[sectionName].type === "categories"){
        //     res = await api.get("/api/categories")
        //     old[sectionName].values.push(...res.data.categories)
        //   } else {
        //     res = await api.get("/api/brands")
        //     old[sectionName].values.push(...res.data.brands)
        //   }
        //   let arr = [...old[sectionName].values]
        //   let uniqArr = []
        //   for(let i=0; i<arr.length; i++){
        //     if(uniqArr.findIndex(p=>p._id === arr[i]._id  )  === -1 ) {
        //       uniqArr.push(arr[i])
        //     }
        //   }
        //   old[sectionName].values = uniqArr
        //   setProductSectionsWithProduct(old)
        // }
    }

    function renderProduct(product) {
        return (
            <div className="product">
                <Image className="w-16" src={"df"}/>
                <h5 className="product_name">{product.title}</h5>
                <h5 className="product_price">${product.price}</h5>
                <Button onClick={() => handleAddToCart(product)}>Add To Cart</Button>
                <Link to={`/products/${product._id}`}>Details</Link>
            </div>
        );
    }

    function handleAddToCart(pp) {
        props.closeNotify();
        props.addToCart(pp);
    }

    function shortTitle(str) {
        let deviceType = ""
        if (deviceType === "MOBILE") {
            return str.slice(0, 25) + "...";
        } else {
            return str;
        }
    }


    return (
        <div className="homepage">
            <SEO title={`Dream Bazar online ecommerce shop`} description="Product filter"/>

            <HomeCategoryNav/>

            <div className="homepage-carousel ">
                <SliderSection/>
            </div>

            <div className="container pb-20">
                {homeSections && Array.isArray(homeSections) && homeSections.map((section) => (
                    <RenderHomeSection key={section.id} sectionProducts={homeSectionData[section.id]} section={section}/>
                ))}
            </div>

        </div>
    );
};


export default HomePage
