import React, {FC} from 'react'

interface Props{
    inputClass?: string
    labelClass?: string
    name: string,
    label?: string,
    placeholder?: string,
    className: string,
    onChange: (args: any)=>any,
    options: ()=> React.ReactNode, errorMessage?: string
    state: {[key: string]: {value?: string | number, errorMessage?: string}}
    required?: boolean
}


const SelectGroup:FC<Props> = ({ name, required, inputClass, labelClass, state, label, placeholder, className, onChange, options, }) =>{
    return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <label htmlFor={name}  className={`flex items-center font-medium mb-2 md:mb-0 ${labelClass}`} >
                <span>{label}</span>
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="w-full">
                <select
                    className={`input ${inputClass} text-[15px]  rounded px-2 py-1.5 w-full placeholder:text-gray-700 text-gray-800 outline-none`}
                    name={name}
                    value={state[name].value}
                    id={name}
                    placeholder={placeholder}
                    onChange={onChange}>
                    {options()}
                </select>
                
                {state[name]?.errorMessage && <div className="mt-1"> <span className="text-red-500 ">{state[name].errorMessage}</span> </div> }
           
            </div>
        </div>
    )
}

export default SelectGroup