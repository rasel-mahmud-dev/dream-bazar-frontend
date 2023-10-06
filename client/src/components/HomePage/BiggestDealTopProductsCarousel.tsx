import React from 'react';
import CarouselView from "components/Product/CarouselView";
import ProductCartView from "components/Product/ProductCartView";
import {Autoplay} from "swiper";


const brands = [
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/1.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/2.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/3.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/4.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/5.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/6.png"},
    {title: "", img: "https://themes.pixelstrap.com/multikart-app/assets/images/brand-logos/7.png"},
]


const TopBrandsCarousel = ({sectionProducts}) => {
    return (
        <div>
            <div className="offer-remain-time mt-10">
                {/*<div className="flex items-center justify-between mb-2 mt-5">*/}
                {/*    <h2 className="font-semibold text-lg dark:text-dark-40 text-dark-800">Biggest Deals on Top Brands</h2>*/}
                {/*    /!*<Link to="/" className="font-medium text-primary-450">See all</Link>*!/*/}
                {/*</div>*/}


                <div className="py-">
                    <CarouselView
                        slidesPerView={2}
                        spaceBetween={10}
                        centeredSlides={false}
                        autoplay={{
                            delay: 0,
                            // waitForTransition: true,
                            disableOnInteraction: false,
                        }}
                        speed={5000}
                        loop={true}
                        lazy={true}
                        modules={[Autoplay]}
                        // rebuildOnUpdate={true}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,

                            },
                            1024: {
                                slidesPerView: 4,

                            },
                            1190: {
                                slidesPerView: 5,

                            },
                            1300: {
                                slidesPerView: 5,

                            },
                        }}

                        renderItems={() => (
                            sectionProducts && Array.isArray(sectionProducts) && sectionProducts.map((product => (
                                    <div className="p-2">
                                        <ProductCartView className="sliderview" product={product}/>
                                    </div>
                                ))
                            ))}
                    />


                </div>
            </div>
        </div>
    );
};

export default TopBrandsCarousel;