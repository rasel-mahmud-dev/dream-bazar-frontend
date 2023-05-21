import React from 'react';
import CarouselView from "components/Product/CarouselView";
import ProductCartView from "components/Product/ProductCartView";


const brands = [
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/1.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/2.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/3.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/4.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/5.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/6.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/7.png"},
]


const TopBrandsCarousel = ({sectionProduct}) => {
    return (
        <div>
            <div className="offer-remain-time mt-10">
                {/*<div className="flex items-center justify-between mb-2 mt-5">*/}
                {/*    <h2 className="font-semibold text-lg dark:text-dark-40 text-dark-800">Biggest Deals on Top Brands</h2>*/}
                {/*    /!*<Link to="/" className="font-medium text-primary-450">See all</Link>*!/*/}
                {/*</div>*/}


                <div className="">
                    <CarouselView
                        slidesPerView={2}
                        spaceBetween={10}
                        centeredSlides={false}
                        loop={true}
                        lazy={true}
                        // rebuildOnUpdate={true}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,

                            },
                            1024: {
                                slidesPerView: 3,

                            },
                            1190: {
                                slidesPerView: 4,

                            },
                            1300: {
                                slidesPerView: 5,

                            },
                        }}

                        renderItems={() => (
                            sectionProduct?.data && Array.isArray(sectionProduct.data) && sectionProduct.data.map((product => (
                                    <ProductCartView product={product}/>
                                ))
                            ))}
                    />

                </div>
            </div>
        </div>
    );
};

export default TopBrandsCarousel;