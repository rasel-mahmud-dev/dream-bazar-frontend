import React, {FC, useEffect} from "react";

import {fetchProduct, fetchRelevantProductsAction} from "actions/productAction";

import {StatusCode} from "store/types";

import {Button, Spin} from "UI/index";
import {connect} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./productDetails.scss";

import {addToCart} from "actions/cartAction";

import apis from "src/apis";

// import avatar from "src/asserts/images/avatar/avatar-1.jpg"
import fullLink from "src/utills/fullLink";
// import {toggleAppMask} from "actions/appAction";
import calculateDiscount from "src/utills/calculateDiscount";
import staticImagePath from "src/utills/staticImagePath";
import SpecificationDetail from "pages/main/productDetails/SpecificationDetail";
import RatingReviews from "pages/main/productDetails/RatingReviews";
import Questions from "pages/main/productDetails/Questions";
import ProductDetailsSkeleton from "pages/main/productDetails/ProductDetails.Skeleton";
import {FaAngleDown} from "react-icons/fa";
import {BiStar} from "react-icons/bi";
import useScrollTop from "src/hooks/useScrollTop";
import useAppDispatch from "src/hooks/useAppDispatch";
import RelevantProducts from "pages/main/productDetails/RelevantProducts";
import {fetchShopDetail} from "actions/shopAction";
import Variants from "pages/main/productDetails/Variants";

let image = `images/products_images/c20-rmx3063-realme-original-imagfxfzjrkqtbhe.jpeg`;
let image2 = `images/products_images/c20-rmx3063-realme-original-imagfxfzjrkqtbhe.jpeg`;


interface ProductDetailsProps {
    toggleLoader?: (loadingState: string, isLoading: boolean) => any;
    toggleAppMask?: (isOpen?: boolean) => any;
    loadingStates?: any[];
    addToCart: (data: object) => any;
}

const FAKE_DESCRIPTION_ID = "60e03983c4db28a6a4fdcb80"


const ProductDetails: FC<ProductDetailsProps> = (props) => {

    useScrollTop();
    const params = useParams();


    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {loadingStates} = props;

    const [isShowImage, setShowImage] = React.useState(0);

    const [product, setProduct] = React.useState<{
        _id?: string;
        title?: string;
        price?: number;
        qty?: number;
        views?: number;
        sold?: number;
        brandId?: string;
        sellerId: string,
        brand?: {};
        categoryId?: string;
        category?: {};
        images?: string[];
        coverPhoto?: string;
        price_off?: number;
        discount?: number;
        seller?: {
            shop_name: string;
        };
        oldPrice?: string;
        seller_rules?: string[];
    }>(null as any);

    const [productDescription, setProductDescription] = React.useState<{
        _id?: string;
        product_id?: string;
        summary?: string;
        highlight?: string[];
        specification?: { [key: string]: any };
        seller_rules?: string[];
    }>({});

    const [sellerInfo, setSellerInfo] = React.useState<{
        _id?: string;
        shopName?: string;
        shopLogo?: string
        seller: { username: string }
    }>({} as any);


    useEffect(() => {
        (async function () {
            let {status, data} = await apis.get(`/api/v1/products?slug=${params.slug}`);

            if (status === StatusCode.Ok) {
                setProduct(data.product);

                // if (data) {
                //     let response = await apis.get(`/api/v1/products/detail/${data._id}`);
                //     if (response.data && response.status === StatusCode.Ok) {
                //         setProductDescription(response.data);
                //
                //         // fetch relevant brand
                //         dispatch(fetchRelevantProductsAction({
                //             slug: params.slug,
                //             title: data.title,
                //             brandId: data.brandId,
                //             categoryId: data.categoryId,
                //         }))
                //     }
                // }
            }
        })();
    }, [params.slug]);


    useEffect(() => {
        if (product?._id) {
            (async function () {
                // let { status, data } = await apis.get(`/api/product/detail/${FAKE_DESCRIPTION_ID}`);
                let {status, data} = await apis.get(`/api/product/detail/${product._id}`);
                if (status === StatusCode.Ok) {
                    setProductDescription(data);

                }
            })();
            if (product.sellerId) {
                fetchShopDetail(`sellerId=${product.sellerId}`).then((data: any) => {
                    data && setSellerInfo(data)
                })
            }
        }

    }, [product?._id]);

    const productImageListRef = React.useRef<HTMLDivElement>(null);


    const rating = [
        {rating: 1, amount: 20},
        {rating: 2, amount: 30},
        {rating: 3, amount: 10},
        {rating: 4, amount: 20},
        {rating: 5, amount: 10},
    ];
    const highlight = (productDescription && productDescription?.highlight) ? productDescription.highlight : [
        "Tur non nulla sit amet nisl tempus convallis quis ac lectus.",
        "Quisque velit nist tortor eget felis porttitor volutpat",
        " Pellentesque in ip nisl tempus convallis quis ac lectus.",
        "tur non nulla sit amet nisl tempus convallis quis ac lectus."
    ]


    function handlePushBack() {
        navigate(-1);
    }

    function handleProductAction(type, prod) {
        props.addToCart(prod);
    }

    function renderLoader(where) {
        let loadingState = loadingStates && loadingStates.find((ls) => ls.where === where);
        return <div className="text-center">{loadingState && loadingState.isLoading && <Spin/>}</div>;
    }

    function calculateRate() {
        let subTotalRate = 0;
        let totalAmount = 0;
        rating.map((rate) => {
            subTotalRate += rate.rating * rate.amount;
            totalAmount += rate.amount;
        });
        return (subTotalRate / totalAmount).toFixed(1);
    }

    function totalRating() {
        let totalAmount = 0;
        rating.map((rate) => {
            totalAmount += rate.amount;
        });
        return totalAmount;
    }

    function scrollDownHandler() {
        let s = productImageListRef.current as HTMLDivElement;
        s.scrollTop = s.scrollTop + 45;
    }

    function addToCartHandler(product) {
        props.addToCart({
            _id: product._id,
            title: product.title,
            price: product.price,
            coverPhoto: product.coverPhoto,
        });
    }

    // get rate =  (rating * amount)n + (rating * amount)n / totalAmount


    return (
        <div>
            <div className="">


                <div className="mt-4 container-1920">
                    {product ? (
                        <div className="block lg:grid lg:grid-cols-12 gap-x-6">
                            <div className="description-sidebar dashboard-card !shadow-xxs  col-span-3 custom_scrollbar">
                                <div className="">
                                    <div className="flex flex-col product-sidebar-image-div">
                                        <div className="product-photo--sidebar">
                                            {/*<BiHeart className="text-2xl" />*/}

                                            <div>
                                                <div ref={productImageListRef} className="image_list">
                                                    {Array.from({length: 10}).map((item)=>(
                                                        <div className="image_list_item">
                                                            <img src={staticImagePath(product?.coverPhoto)}/>
                                                        </div>
                                                    ))}
                                                    {/*{product.images &&*/}
                                                    {/*    product.images.map((g, i) => (*/}
                                                    {/*        <div*/}
                                                    {/*            onClick={() => setShowImage(i + 1)}*/}
                                                    {/*            className={[isShowImage == i ? "active_image" : "", "image_list_each-div"].join(" ")}*/}
                                                    {/*        >*/}
                                                    {/*            <img src={fullLink(g)} alt="" />*/}
                                                    {/*        </div>*/}
                                                    {/*    ))}*/}
                                                </div>
                                            </div>

                                            <div onClick={scrollDownHandler} className="image_list_each-div bb text-center">
                                                <FaAngleDown/>
                                            </div>
                                        </div>

                                        <div className="product_image_view-col--full-image">
                                            <img
                                                src={
                                                    isShowImage
                                                        ? staticImagePath(product.images ? product.images[isShowImage - 1] : "")
                                                        : staticImagePath(product.coverPhoto ? product.coverPhoto : "")
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 flex gap-x-4 w-full">
                                        <Button
                                            className="btn-primary w-full"
                                            onClick={() => addToCartHandler(product)}>Add To Cart</Button>
                                        <Button className="btn-primary w-full">Buy Now</Button>
                                    </div>
                                    {/********* relevant brand **********/}
                                    <div className="mt-5">
                                        <RelevantProducts product={{
                                            title: product?.title,
                                            brandId: product?.brandId,
                                            categoryId: product?.categoryId,
                                        }} slug={params.slug}
                                        />
                                    </div>


                                </div>
                            </div>
                            <div className="dashboard-card p-4 !shadow-xxs col-span-9">
                                <h4 className="text-lg heading-4 font-medium mb-2">{product.title}</h4>
                                <div className="flex items-center gap-x-1">
                                    <div className="flex items-center gap-x-1 bg-primary-600 px-2 py-1 text-white rounded-md w-max">
                                        <span>{calculateRate()}</span>
                                        <BiStar/>
                                    </div>
                                    <h5 className="ml-2 text-sm"> 1,50,723 Ratings & 7,095 Reviews</h5>
                                </div>
                                <div className="pt-3 flex items-center">
                                    <h4 className="text-lg font-bold">TK {calculateDiscount(product.discount || 0, product.price || 0)}</h4>
                                    <h5 className="off-div flex items-center ml-3 ">
                                        <span>TK{product.price}</span>
                                        <span>{product.discount}% off</span>
                                    </h5>
                                </div>
                                <h6>No Cost EMI</h6>


                                <Variants />

                                <div className="">
                                    <div className="mt-5">
                                        <div className="description_key">
                                            <img style={{maxWidth: "20px"}} src={image} alt=""/>
                                        </div>
                                        <h5 className="description_key--value text-dark-600 dark:text-dark-50">1 Year Warranty for Mobile and 6 Months
                                            for Accessories Know More</h5>
                                    </div>
                                    <div className="mt-5">
                                        <div className="description_key">
                                            <h4 className="section_title">Highlights</h4>
                                        </div>
                                        <ul className="description_key--value highlights">
                                            {highlight?.map((h) => <li className="highlight_item text-dark-600 dark:text-dark-50">{h}</li>)}
                                        </ul>
                                    </div>
                                    <div className="mt-5">
                                        <div className="description_key">
                                            <h4 className="section_title">Seller</h4>
                                        </div>
                                        <ul className="description_value description_key--value">
                                            <li className="flex items-center">

                                                {sellerInfo && (
                                                    <div>
                                                        <div className="flex items-center">
                                                            <div className="flex items-center bg-primary-600 text-white gap-x-1 px-2 py-1 rounded">
                                                                <span>{calculateRate()}</span>
                                                                <BiStar/>
                                                            </div>
                                                            <h5 className="heading-5">
                                                                <Link to={`/shop/${sellerInfo.shopName}`}>{sellerInfo.shopName}</Link>
                                                            </h5>

                                                        </div>
                                                        <div className="w-10 mt-2">
                                                            <img src={sellerInfo.shopLogo}/>
                                                        </div>
                                                    </div>
                                                )}

                                            </li>
                                            {productDescription.seller_rules && productDescription.seller_rules.map((rule) => <li>{rule}</li>)}
                                        </ul>
                                    </div>

                                    <div className="mt-5">
                                        <div className="description_key">
                                            <h4 className="section_title">Description</h4>
                                        </div>
                                        <p className="p-theme">{productDescription.summary || `Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt.

                                                Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat.

                                            Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.`}</p>
                                    </div>
                                </div>

                                <SpecificationDetail specification={productDescription?.specification}/>
                                <RatingReviews/>
                                <Questions/>
                            </div>
                        </div>
                    ) : (<ProductDetailsSkeleton/>)}
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        productDetails: state.productState.productDetails,
        loadingStates: state.productState.loadingStates,
    };
}

export default connect(mapStateToProps, {
    fetchProduct,
    // toggleAppMask,
    addToCart,
})(ProductDetails);
