import React from 'react';
import CarouselView from "components/Product/CarouselView";
import {Autoplay, FreeMode} from "swiper";
import staticImagePath from "src/utills/staticImagePath";

const TopBrandsCarousel = ({sectionProducts}) => {
    console.log(sectionProducts)
    return (
        <div>
            <div className="offer-remain-time mt-10">
                {/*<div className="flex items-center justify-between mb-2 mt-5">*/}
                {/*    <h2 className="font-semibold text-lg dark:text-dark-40 text-dark-800">Biggest Deals on Top Brands</h2>*/}
                {/*    /!*<Link to="/" className="font-medium text-primary-450">See all</Link>*!/*/}
                {/*</div>*/}


                <div className="">
                    <CarouselView
                        slidesPerView={3}
                        spaceBetween={10}
                        freeMode={true}
                        autoplay={{}}
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
                            1240: {
                                slidesPerView: 6,

                            },
                        }}
                        modules={[Autoplay, FreeMode]}
                        className="mySwiper"
                        renderItems={() => (
                            sectionProducts && Array.isArray(sectionProducts) && sectionProducts.map((brand => (
                                    <div className="brand-item">
                                        <img src={staticImagePath(brand.logo)} alt=""/>
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