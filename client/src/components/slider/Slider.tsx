import React from 'react';
import fullLink from "src/utills/fullLink";
import SlickSlider from  "react-slick"
import "slick-carousel/slick/slick.css";
import "./slider.scss"

const Slider = (props) => {
  
  const {config: initialConfig, images} = props
  
  function renderPrevBtn(){
    return (
      <div className="carousel-btn">
        <i className="far fa-angle-left" />
      </div>
    )
  }
  function renderNextBtn(){
    return (
      <div className="carousel-btn">
        <i className="far fa-angle-right" />
      </div>
    )
  }
  
  let config = {
    autoPlay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // slidesToScroll: 1,
    nextArrow: renderNextBtn(),
    prevArrow: renderPrevBtn(),
    ...initialConfig
  }
  
  return (
    <SlickSlider {...config}>
      {images && images.length > 0 && images.map(img=>(
        <div>
          <img src={fullLink(img)}  alt={img}/>
        </div>
      ))}
    </SlickSlider>
  );
};

export default Slider;