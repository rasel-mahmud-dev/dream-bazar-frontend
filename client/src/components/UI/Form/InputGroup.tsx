import {FC, InputHTMLAttributes} from "react";


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    state: {[key: string]: {value?: string | number, errorMessage?: string}}
    label?: string
    inputClass?: string
    labelClass?: string
    onChange: (e: any)=> void
    className?: string
}


const InputGroup: FC<Props> = ({name, state, type="text", label, inputClass, labelClass, placeholder, onChange, className, ...attr}) => {

    return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            { label && <label htmlFor={name}  className={`${labelClass} cursor-pointer block w-40 font-medium text-gray-900 mb-2 md:mb-0`} >{label}</label> }
            <div className="w-full">
                <input
                    {...attr}
                    name={name}
                    value={state[name]?.value}
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`input ${inputClass} text-[15px]  rounded px-2 py-1.5 w-full placeholder:text-gray-700 text-gray-800 outline-none`}
                />
                
                {state[name]?.errorMessage && <div className="mt-1"> <span className="text-red-500 ">{state[name].errorMessage}</span> </div> }
           
            </div>
        </div>
    )
}

export default InputGroup