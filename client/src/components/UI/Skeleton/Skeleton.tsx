import React, {FC, HTMLAttributes} from 'react';
import "./style.scss"
import Line from "./Line";
import Circle from "./Circle";

interface Props extends HTMLAttributes<HTMLDivElement>{

}

interface CustomFC<T> extends FC<T>{
    Line: React.FC<any>
    Circle: React.FC<any>
}

const Skeleton:CustomFC<Props> = ({className, children, ...other}) => {
    return (
        <div className={className + " skeleton"} {...other}>
            {children}
        </div>
    );
};


Skeleton.Line = Line

Skeleton.Circle = Circle

export default Skeleton;