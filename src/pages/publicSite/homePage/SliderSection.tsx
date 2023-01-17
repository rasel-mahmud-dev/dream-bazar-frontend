import React from 'react';
import {Button, Carousel} from "UI/index";
import staticImagePath from "src/utills/staticImagePath";
import useLanguage from "src/hooks/useLanguage";

const SliderSection = () => {
    const l = useLanguage()

    const carouselData = [
        {img:"gh11-banner copy.webp", desc: `
    Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Proin eget tortor risus.

Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
    `, title: "High Quality new brand Awesome phone"},
        {img:"h10-slider copy.webp", desc: `
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus.

Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
    `, title: "Strong Processor for Power gaming phone"},
        // {img:"ff548b9075708229.jpg", desc: "asdkfh asf hasdkfj haskdj fhasasd  asdfd asdf asdfas hsadjf asdjfh", title: "Awesome phone"},
        // {img:"a7f93e9e0f7b947f.jpg", desc: "asdkfh asf hasdkfj haskdj fhasasd  asdfd asdf asdfas hsadjf asdjfh", title: "Awesome phone"},
        // {img:"bf3d1c8a7696dfd9-1.jpg", desc: "asdkfh asf hasdkfj haskdj fhasasd  asdfd asdf asdfas hsadjf asdjfh", title: "Awesome phone"},
        // {img:"ff548b9075708229.jpg", desc: "asdkfh asf hasdkfj haskdj fhasasd  asdfd asdf asdfas hsadjf asdjfh", title: "Awesome phone"}
    ]

    return (
        <div className="homepage_slider">
            <Carousel>
                { carouselData.map((item, index)=>(
                    <div className="relative" key={index}>
                        <img src={staticImagePath(item.img)} alt=""/>
                        <div className="swiper-caption  w-full max-w-sm md:max-w-md " >
                            <h1 className="slider-title font-medium text-lg md:text-2xl lg:text-3xl xl:text-5xl text-white ">{item.title}</h1>
                            <h1 className="slider-para text-white ">{item.desc.substring(0, 100)}
                            <span className="hidden md:block">
                                {item.desc.substring(100)}
                            </span>
                            </h1>
                            <Button theme="primary" className="slider-btn mt-4">{l("Shop Now")}</Button>
                        </div>
                    </div>
                )) }
            </Carousel>
        </div>
    );
};

export default SliderSection;