import React, {lazy} from "react";
import "./HomePage.scss";
import {ACTION_TYPES} from "store/types";
import {Link, useNavigate} from "react-router-dom";
import {fetchHomePageSectionProducts} from "actions/productAction";
import {Button, Image} from "UI/index";
import fullLink from "src/utills/fullLink";


import staticImagePath from "src/utills/staticImagePath";
import useLanguage from "src/hooks/useLanguage";
import {BiCart, BiUser, CiShoppingCart, MdFavorite} from "react-icons/all";
import { HiOutlineHome} from "react-icons/hi2";
import SEO from "components/SEO/SEO";
import useScrollTop from "src/hooks/useScrollTop";
import useAppSelector from "src/hooks/useAppSelector";
import useAppDispatch from "src/hooks/useAppDispatch";
import {HiOutlineHeart} from "react-icons/hi2";
import {FreeMode} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

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


    const {
        appState,
        productState: {
            homePageSectionsData,
            homePageSectionProducts: productSectionsWithProduct,
            // products,
            // loadingStates,
            // paginations,
            // fetchedData,
        }
    } = useAppSelector(state => state)


    const {selectedLang, lang} = appState;

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

        dispatch(fetchHomePageSectionProducts());

        // let fetchedDataa =  fetchedData.find(fd=>fd.where === "home_page")
        // console.log(fetchedDataa)
        // if(!fetchedDataa.isFetched) {
        //   props.fetchHomePageSectionProducts()
        // } else {
        //
        // }
    }, []); // with watch when change paginations currentPage

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

    function handleJumpOneTypeProductPage(sectionName, productSectionsWithProduct) {
        let n;
        // homePageSectionsData.map((item) => {
        //     if (item.name === sectionName && !item.id) {
        //         // history.push(`/prod/${item.name}/${item.type}/${item.params}`)
        //         navigate(`/prod/${item.name}`);
        //     } else if (item.name === sectionName && item.id) {
        //         navigate(`/products/?slug=${item.name}&type=${item.filterBy}&id=${item.id}`);
        //     }
        // });
    }


    //! this a Bug
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


    const brands = [
        {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/1.png"},
        {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/2.png"},
        {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/3.png"},
        {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/4.png"},
        {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/5.png"},
        {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/6.png"},
        {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/7.png"},
    ]

    return (
        <div className="homepage">
            <SEO title={`Dream Bazar online ecommerce shop`} description="Product filter"/>

            <HomeCategoryNav/>

            <div className="homepage-carousel ">
                <SliderSection/>
            </div>

            <div className="day-deals px-2 mt-6">

                <div className="flex items-center justify-between mb-2 mt-5">
                    <h2 className="font-semibold text-lg dark:text-dark-40 text-dark-800">Deals of the day</h2>
                    <Link to="/" className="font-medium text-primary-450">See all</Link>
                </div>

                <div className="products-list">
                    {dayDeals.map(deal => (
                        <div className="product-list-view">

                            <div className="fav-icon">
                                <HiOutlineHeart/>
                            </div>


                            <div className="img-root">
                                <img src={staticImagePath(deal.thumb)} alt=""/>
                            </div>
                            <div className="product-meta">
                                <h3 className="p-title">{deal.title}</h3>
                                <p className="p-seller">{deal.seller.shopName}</p>

                                <div className="p-price-row">
                                    <h4 className="p-price">{deal.price}</h4>
                                    <h4 className="p-discount">SAVE {deal.discount}% </h4>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="day-deals px-2 mt-10">

                <div className="flex items-center justify-between mb-2 mt-5">
                    <h2 className="font-semibold text-lg dark:text-dark-40 text-dark-800">Deals of the day</h2>
                    <Link to="/" className="font-medium text-primary-450">See all</Link>
                </div>

                <div className="products-grid">
                    {dayDeals.map(deal => (
                        <div className="product-list-view product-card">

                            <div className="fav-icon">
                                <HiOutlineHeart/>
                            </div>


                            <div className="img-root">
                                <img src={staticImagePath(deal.thumb)} alt=""/>
                            </div>
                            <div className="product-meta">
                                <h3 className="p-title">{deal.title}</h3>
                                <p className="p-seller">{deal.seller.shopName}</p>

                                <div className="p-price-row">
                                    <h4 className="p-price">{deal.price}</h4>
                                    <h4 className="p-discount">SAVE {deal.discount}% </h4>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>


                <div className="offer-remain-time mt-10">
                    <div className="flex items-center justify-between mb-2 mt-5">
                        <h2 className="font-semibold text-lg dark:text-dark-40 text-dark-800">Biggest Deals on Top Brands</h2>
                        {/*<Link to="/" className="font-medium text-primary-450">See all</Link>*/}
                    </div>


                    <div className="flex items-center">

                        <Swiper
                            slidesPerView={3}
                            spaceBetween={10}
                            freeMode={true}
                            modules={[FreeMode]}
                            className="mySwiper"
                        >

                            {brands.map(brand => (
                                <SwiperSlide>
                                    <div className="brand-item">
                                        <img src={staticImagePath(brand.img)} alt=""/>
                                    </div>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </div>

                </div>


                <div className="offer-remain-time mt-10">
                    <div className="flex items-center justify-between mb-2 mt-5">
                        <h2 className="font-semibold text-lg dark:text-dark-40 text-dark-800">Biggest Deals on Top Brands</h2>
                        {/*<Link to="/" className="font-medium text-primary-450">See all</Link>*/}
                    </div>


                    <div className="flex items-center">

                        <Swiper
                            // width={300}
                            slidesPerView={2}
                            spaceBetween={10}
                            freeMode={true}
                            centeredSlides={false}
                            modules={[]}
                            className="mySwiper"
                        >

                            {dayDeals.map(deal => (
                                <SwiperSlide>
                                    <div className="product-list-view product-card product-wide">

                                        <div className="fav-icon">
                                            <HiOutlineHeart/>
                                        </div>


                                        <div className="img-root">
                                            <img src={staticImagePath(deal.thumb)} alt=""/>
                                        </div>
                                        <div className="product-meta">
                                            <h3 className="p-title">{deal.title}</h3>
                                            <p className="p-seller">{deal.seller.shopName}</p>

                                            <div className="p-price-row">
                                                <h4 className="p-price">{deal.price}</h4>
                                                <h4 className="p-discount">SAVE {deal.discount}% </h4>
                                            </div>

                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}


                        </Swiper>
                    </div>

                </div>
            </div>


            <div className="r max-w-8xl mx-auto" onScroll={handleScroll}>
                <div className="my-20">
                    {Object.keys(productSectionsWithProduct) &&
                        Object.keys(productSectionsWithProduct).map((sectionName, index: number) => (
                            <div key={index}>
                                <div className="bg-body mt-10">
                                    <div
                                        className="flex items-center justify-between py-2 px-4 mb-8 border-b border-b-neutral-900/10 dark:border-neutral-600 ">
                                        <h1 className="text-neutral-800 dark:text-white font-medium text-md md:text-lg lg:text-2xl">
                                            {l(sectionName)}
                                        </h1>
                                        {productSectionsWithProduct[sectionName].type === "products" && null}
                                        <Button
                                            loading={false}
                                            className="bg-green-500 text-white"
                                            loaderClass="!border-l-white !border-b-white"
                                            onClick={() => handleJumpOneTypeProductPage(sectionName, productSectionsWithProduct)}
                                        >
                                            {l("More")}
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                        {productSectionsWithProduct[sectionName] &&
                                        productSectionsWithProduct[sectionName].values &&
                                        productSectionsWithProduct[sectionName].values.length > 0 ? (
                                            productSectionsWithProduct[sectionName].values.map((pp, index) => (
                                                <div className="product bg-red-100 p-4" key={index}>
                                                    {productSectionsWithProduct[sectionName].type === "brands" ||
                                                    productSectionsWithProduct[sectionName].type === "categories" ? (
                                                        <div className="product_image small">
                                                            <img src={fullLink(pp.logo)} alt=""/>
                                                        </div>
                                                    ) : (
                                                        <Link to={`/${pp.slug}`}>
                                                            <div className="product_image_div">
                                                                <div className="product_image_wra">
                                                                    <img src={staticImagePath(pp.coverPhoto)} alt="cover"/>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )}

                                                    <div className="desc mt-4">
                                                        <h4 className="text-neutral-700 hover:text-secondary-400 dark:text-neutral-100">
                                                            <Link to={`/${pp.slug}`}>
                                                                {productSectionsWithProduct[sectionName].type === "categories"
                                                                    ? pp.name
                                                                    : productSectionsWithProduct[sectionName].type === "brands"
                                                                        ? pp.name
                                                                        : shortTitle(pp.title)}
                                                            </Link>
                                                        </h4>

                                                        {productSectionsWithProduct[sectionName].type === "products" && (
                                                            <>
                                                                <h5 className="mt-2 text-green-450 font-medium">${pp.price}</h5>
                                                                {/*<Button onClick={()=>handleAddToCart(pp)}>{ isEn(selectedLang) ? 'Add To Cart': lang.add_to_cart}</Button>*/}
                                                                {/*<Link className="Product-detail-link" to={`/products/${pp._id}`}> { isEn(selectedLang) ? 'Details' : lang.details}</Link>*/}
                                                            </>
                                                        )}

                                                        <div className="flex justify-center gap-x-2 items-center mt-2">
                                                            <div className="bg-gray-400/20 p-1.5 rounded-full">
                                                                <MdFavorite className="text-sm text-red-500"/>
                                                            </div>
                                                            <div className="bg-gray-400/20 p-1.5 rounded-full">
                                                                <BiCart className="text-sm"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="product-404">
                                                <h1 className="product-404__title">Product Not Found</h1>
                                                <ul className="product-404__causes">
                                                    <li>May be product not found from database.</li>
                                                    <li>May be network problem.</li>
                                                    <li>May not added these type of product from admin.</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    <Button className="!mx-auto text-green-500 mt-10">Load More Section</Button>
                </div>
            </div>

        </div>
    );
};

// function mapStateToProps(state) {
//     return {
//         appState: state.appState,
//         productState: state.productState,
//     };
// }

export default HomePage

// export default connect(mapStateToProps, {
//     fetchProducts,
//     fetchHomePageSectionProducts,
//     addToCart,
//     closeNotify,
// })(HomePage);
