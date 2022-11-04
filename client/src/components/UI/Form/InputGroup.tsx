import {FC, InputHTMLAttributes, ReactNode} from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    state?: {[key: string]: {value?: string | number | any, errorMessage?: string}}
    label?: string
    labelAddition?: ()=>ReactNode
    inputClass?: string
    labelClass?: string
    onChange?: (e: any)=> void
    className?: string
    value?: string
    required?: boolean
}



const InputGroup: FC<Props> = ({name,value, required, labelAddition, state, type="text", label, inputClass, labelClass, placeholder, onChange, className, ...attr}) => {
    console.log(state)
    return (
        <div className={twMerge(`mt-4 flex items-start flex-col md:flex-row`, className)} >
            {label && <div className={`flex flex-wrap items-center gap-x-2 mb-2 md:mb-0 ${labelClass}`} >
                { label && (
                    <label htmlFor={name}  className={twMerge(`block font-medium text-gray-900  flex items-center`)}>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                {labelAddition && labelAddition()}
            </div> }
            
            <div className="w-full">
                <input
                    {...attr}
                    name={name}
                    value={state ? state[name]?.value : value ? value : undefined}
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    onChange={onChange && onChange}
                    className={twMerge(`text-[15px] rounded-md px-2 py-2 w-full placeholder:text-gray-400 text-gray-800 outline-none`, ' bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200 ', inputClass)}
                />
                
                {state && state[name]?.errorMessage && <div className="mt-1"> <span className="text-red-500 ">{state[name].errorMessage}</span> </div> }
           
            </div>
        </div>
    )
}

export default InputGroup