import React, {FC, InputHTMLAttributes, ReactNode, useRef, useState} from "react";
import "./multipleFileChooser.scss";
import blobToBase64 from "src/utills/blobToBase64";
import staticImagePath from "src/utills/staticImagePath";
import {twMerge} from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    labelAddition?: () => ReactNode;
    inputClass?: string;
    labelClass?: string;
    onChange: (e: any) => void;
    className?: string;
    required?: boolean;
}


const MultipleFileChooser: FC<Props> = (props) => {
    
    const {name, label, labelAddition, labelClass, required, className = "", onChange} = props
    
    const input = useRef<HTMLInputElement>(null)
    
    const [state, setState] = useState({})
    
    function handleChooseFile() {
        input.current.click()
    }
    
    function handleChange(e) {
        if (e.target.files && e.target.files.length) {
            let file = e.target.files[0];
            blobToBase64(file, (data) => {
                setState(prevState => ({
                    ...prevState,
                    [file.name]: data
                }))
            })
        }
    }
    
    return (
        <div className={twMerge(`mt-4`, className)}>
            <div className={`flex items-center gap-x-2 mb-2 md:mb-0 ${labelClass}`}>
                {label && (
                    <label htmlFor={name} className={twMerge(`block font-medium text-gray-900  flex items-center`)}>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                {labelAddition && labelAddition()}
            </div>
            
            <input onChange={handleChange} hidden={true} type="file" accept="image/jpeg" ref={input}/>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {state && Object.keys(state).map((key) => (
                    <div className="">
                        <img className="border-2 border-dashed p-1 w-full" src={state[key]} alt=""/>
                    </div>
                ))}
    
                <div className="" onClick={handleChooseFile}>
                <img src={staticImagePath("photo-thumb.jpg")} className="border-2 border-dashed p-1 w-full" alt=""/>
            </div>
            
            </div>
            
            
            
            
            
        </div>
    );
};

export default MultipleFileChooser;
