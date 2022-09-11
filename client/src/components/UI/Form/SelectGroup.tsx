import React, {FC} from 'react'

interface Props{
    inputClass?: string
    labelClass?: string
    name: string, value?: any[], label?: string, placeholder?: string, className: string,
    onChange: (args: any)=>any,
    options: ()=> React.ReactNode, errorMessage?: string
    state: {[key: string]: {value?: string | number, errorMessage?: string}}
}


const SelectGroup:FC<Props> = ({ name, value, inputClass, labelClass, state, label, placeholder, className, onChange, options, }) =>{
    return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <label htmlFor={name}  className={`block w-40 font-medium mb-2 md:mb-0 ${labelClass}`} >{label}</label>
            <div className="w-full">
                <select
                    className={`input ${inputClass} text-[15px]  rounded px-2 py-1.5 w-full placeholder:text-gray-700 text-gray-800 outline-none`}
                    name={name}
                    value={value}
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