import React, { FC, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

import "./Button.scss";


interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {
    loading?: boolean | { delay?: number };
    className?: string;
    children?: React.ReactNode;
    to?: string;
    type?: any,
    href?: string;
    loaderClass?: string
}


const Button: FC<BaseButtonProps> = (props) => {
    const { loading, to, href, loaderClass, className, ...attributes } = props;

    if (to) {
        return (
            // @ts-ignore
            <Link to={to} {...attributes} className={`btn rounded ${className}`}>
                {loading && <div className={`btn-loading-circle mr-1.5 dark:bg-red-500 ${loaderClass}`}>
                    <LoadingIcon />
                </div> }
                {props.children && <span>{props.children}</span>}
            </Link>
        );
    } else if (href) {
        return (
            // @ts-ignore
            <a href={href} {...attributes} className={`btn rounded ${className}`}>
                {loading && <div className={`btn-loading-circle mr-1.5 dark:bg-red-500 ${loaderClass}`}>
                    <LoadingIcon />
                </div> }
                {props.children && <span>{props.children}</span>}
            </a>
        );
    } else {
        return (
            <button {...attributes} className={`btn rounded ${className} ${loading ? "btn-disable": "" }`}>
                {loading && <div className={`btn-loading-circle mr-1.5 dark:bg-red-500 ${loaderClass}`}>
                    <LoadingIcon />
                </div> }
                {props.children && <span>{props.children}</span>}
            </button>
        );
    }
};

const LoadingIcon = () => {
    return (
        <div>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default Button;
