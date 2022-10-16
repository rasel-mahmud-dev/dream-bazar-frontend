import React, {FC, HTMLAttributes, useRef} from 'react'
import staticImagePath from "src/utills/staticImagePath.js";
import {BiCloud} from "react-icons/all";


interface Props extends HTMLAttributes<HTMLInputElement>{
    label?: string,
    name: string,
    preview?: string,
    labelClass?: string
    inputClass?: string
    previewImageClass?: string
    defaultValue?: string
    errorMessage?: string
    onChange: any
}

const FileUpload:FC<Props> = (props)=>{
    
    const {name, previewImageClass="", label, preview=true, inputClass="", labelClass="", defaultValue, errorMessage, placeholder, onChange, className} = props
    
    const imageInputRef = useRef()
    

    const [base64, setBase64] = React.useState("")


    function handleChange(e){
        let file = e.target.files[0];

        let reader = new FileReader()
        reader.onload = function(event){
            setBase64(event.target.result as string);
            onChange({target: { name, value: file, base64: event.target.result }});
        }
        reader.readAsDataURL(file)
    }

    function handleCompress(e) {

    }

    function chooseImage(){
        imageInputRef.current && (imageInputRef.current as HTMLInputElement).click()
    }

  return (
        <div>
            <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <label htmlFor={name}  className={`block w-40 font-medium  mb-2 md:mb-0 ${labelClass}`} >{label}</label>

                <div className="w-full">
                
                    <div
                        onClick={chooseImage}
                        className={`input flex items-center ${inputClass} text-[15px] rounded px-2 py-1.5 w-full text-gray-800 `}
                        >
                         <BiCloud className="mr-3 text-lg" />
                        {placeholder}
                  </div>
                
                <input
                    ref={imageInputRef}
                    name={name}
                    hidden={true}
                    type="file" 
                    id={name}
                    placeholder={placeholder} 
                    onChange={handleChange}
                />
                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error">{errorMessage}</span> }
                </div>

                { preview && base64 && (
                    <img onLoad={handleCompress} src={base64} className={previewImageClass}  alt="" />
                ) }
                { defaultValue && typeof defaultValue === "string" && !base64 && (
                    <img src={staticImagePath(defaultValue)} className={previewImageClass}  alt=""/>
                ) }

            </div>
        </div>

            
        

        </div>
    )
}

export default FileUpload