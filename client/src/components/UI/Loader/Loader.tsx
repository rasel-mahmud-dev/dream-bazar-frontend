import React from 'react';
import "./loader.scss"

const Loader = ({size = ""}: { size?: "sm" | "xs" | "" }) => {
    return (
        <div>
            <div className={`loading loader-size-${size}`}>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    );
};

export default Loader;