import React, {FC, HtmlHTMLAttributes} from 'react';

interface Props extends HtmlHTMLAttributes<HTMLDivElement>{

}

const Box: FC<Props> = (props) => {
    const {className, children, ...attributes} = props
    return (
        <div className={` ${className} w-8 h-8 flex items-center justify-center rounded cursor-pointer `} {...attributes}>
           {children}
  </div>
    );
};

export default Box;