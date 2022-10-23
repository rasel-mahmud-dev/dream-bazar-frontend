import React, {FC, InputHTMLAttributes, useState} from 'react';
import "./style.scss"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    on?: boolean
    thumbClassName?: string
    onChange?: (e: any)=> void
    className?: string
}


const Switch: FC<Props> = (props) => {
    const {
        name,
        on,
        label,
        thumbClassName,
        onChange,
        className,
    } = props
    
    const [isOn, setOn] = useState(false)
    
    
    function toggle(e){
        e.stopPropagation();
        if(on === undefined) {
            setOn((!isOn))
            onChange && onChange({target: {name, value: !isOn}})
        } else{
            onChange && onChange({target: {name, value: !on}})
        }
    }
    
    return (
        <div className={`switch ${className} ${(on !== undefined) ? on ? "switch-on" : "" : isOn ? "switch-on" : ""}`} onClick={toggle}>
            <input type="checkbox"/>
            <span className={`thumb ${thumbClassName}`} onClick={toggle}></span>
         </div>
    );
};

export default Switch;