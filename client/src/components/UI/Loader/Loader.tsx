import React, {FC} from "react";

import "./loader.scss";

type Props = {
    className?: string;
    title?: string;
    titleClass?: string;
    size?: "small"
};

const Loader: FC<Props> = ({titleClass = "", size, className = "", title = "Loading..."}) => {
    return (
        <div className={className}>
			<div>
                <div className={`loading ${size} `}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<h1 className={`font-bold text-center mt-1 ${titleClass}`}>{title}</h1>
            </div>
		</div>
    );
};

export default Loader;
