import React, {FC} from "react";

import "./loader.scss";

type Props = {
    className?: string;
    title?: string;
    titleClass?: string;
};

const Loader: FC<Props> = ({titleClass = "", className = "", title = "Loading..."}) => {
    return (
        <div className={className}>
			<div>
                <div className="loading">
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
