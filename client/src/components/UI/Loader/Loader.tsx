import React, {FC} from "react";

import "./loader.scss";

import {ThreeCircles} from "react-loader-spinner"

type Props = {
    className?: string;
    title?: string;
    titleClass?: string;
    size?: "small"
};

const Loader: FC<Props> = ({titleClass = "", size, className = "", title = "Loading..."}) => {
    return (
        <div>
            <ThreeCircles
                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
        // <div className={className}>
		// 	<div>
        //         <div className={`loading ${size} `}>
		// 		<span></span>
		// 		<span></span>
		// 		<span></span>
		// 		<span></span>
		// 		<span></span>
		// 		<span></span>
		// 		<span></span>
		// 	</div>
		// 	<h1 className={`font-bold text-center mt-1 ${titleClass}`}>{title}</h1>
        //     </div>
		// </div>
    );
};

export default Loader;
