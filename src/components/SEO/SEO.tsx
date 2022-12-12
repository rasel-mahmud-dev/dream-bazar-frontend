import React, {FC, ReactNode} from 'react';
import {Helmet} from "react-helmet";

interface Props{
    title?: string,
    description?: string
    children?: ReactNode
}
const SEO:FC<Props> = (props) => {
    return (
        <Helmet>
            <meta charSet="utf-8"/>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            {props.children}
        </Helmet>
    
    );
};

export default SEO;