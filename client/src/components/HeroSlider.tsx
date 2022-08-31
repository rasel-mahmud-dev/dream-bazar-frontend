import {FaSolidAngleLeft, FaSolidAngleRight} from "solid-icons/fa";
import {createSignal} from "solid-js";


import "solid-slider/slider.css";
import {Slider, createSlider} from "solid-slider";
import autoplay from "solid-slider/plugins/autoplay";
import {staticImagePath} from "apis/index";

const HeroSlider = ({sliderData})=>{

    const options = { duration: 1000, loop: true };
    const [pause, togglePause] = createSignal(false);
    const [ slider, { current, next, prev } ] = createSlider(
        options, autoplay(2000, {
            pause,
            pauseOnDrag: true
        }));

    return (
        <div>
            <div class="relative ">
                <div use:slider>
                    {sliderData && sliderData.map((item, index)=>(
                        <div class={`h-72 bg-green-200 overflow-hidden  ${current() === index ? 'active-slider': ''} `}>
                            <div class="ml-auto w-72 mt-20 absolute right-28">
                                <img class="w-full" src={staticImagePath(item.img)} alt="" srcSet=""/>
                            </div>
                            <div class="slider-caption">
                                <h1 class="slider-title text-3xl font-medium">{item.title}</h1>
                                <p class="slider-p">{item.desc}</p>
                                <button class="bg-green-500 btn-rounded slider-button ">Buy now</button>
                            </div>
                        </div>
                    )) }
                </div>
                <button class="bg-white shadow-2 w-10 h-10 flex justify-center items-center rounded-full absolute left-8 top-1/2 transform -translate-x-1/2" onClick={prev}>
                    <FaSolidAngleLeft />
                </button>
                <button class="bg-white shadow-2 w-10 h-10 flex justify-center items-center rounded-full absolute right-0 top-1/2 transform -translate-x-1/2" onClick={next}>
                    <FaSolidAngleRight />
                </button>
            </div>
        </div>
    )
}
export default HeroSlider