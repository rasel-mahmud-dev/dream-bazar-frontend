import React from 'react';
import "./styles.scss"


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Lazy } from "swiper";
// Import Swiper styles

import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper styles
import 'swiper/css';

const Carousel = (props) => {
  const  {children} = props
  
  return (
    <Swiper
      slidesPerView={'auto'} // slider image width as slider-container content width not root container width
      lazy={true}
      spaceBetween={30}
      centeredSlides={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Lazy, Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      { children && children.map((c, i)=>(
        <SwiperSlide key={i}>{c}</SwiperSlide>
      ))}
  
    </Swiper>
  )
};

export default Carousel;