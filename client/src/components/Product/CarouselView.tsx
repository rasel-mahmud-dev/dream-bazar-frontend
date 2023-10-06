import React, {FC, ReactElement} from 'react';
import {Swiper, SwiperProps, SwiperSlide} from "swiper/react";
import ProductCartView from "components/Product/ProductCartView";


interface Props extends SwiperProps {
    renderItems: () => ReactElement[]
}

const CarouselView: FC<Props> = ({renderItems,  slidesPerView = 2, spaceBetween = 10, className = "", ...attr}) => {

    let items = renderItems && renderItems() || []
    return (
        <div>
            <div className="flex items-center">

                <Swiper
                    // width={300}
                    slidesPerView={slidesPerView}
                    spaceBetween={spaceBetween}
                    className={className}
                    {...attr}
                >

                    {items.map(item => (
                        <SwiperSlide>
                            {item}
                        </SwiperSlide>
                    ))}

                    {/*{data.map(deal => (*/}
                    {/*    <SwiperSlide>*/}
                    {/*        <ProductCartView product={deal}/>*/}
                    {/*    </SwiperSlide>*/}
                    {/*))}*/}


                </Swiper>
            </div>
        </div>
    );
};

export default CarouselView;