import React, {FC, HtmlHTMLAttributes} from 'react';

interface Props extends HtmlHTMLAttributes<HTMLDivElement>{
    
}

const Circle: FC<Props> = (props) => {
    const {className, children, ...attributes} = props
    return (
        <div className={` ${className} hover:bg-gray-400/20 hover:dark:bg-body-dark w-9 h-9 flex items-center  justify-center rounded-full cursor-pointer `} {...attributes}>
           {children}
  </div>
    );
};

export default Circle;