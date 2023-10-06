import React, {FC} from 'react'


interface Props {
    inputClass?: string
    labelClass?: string
    onClick?: () => any
    name: string,
    label?: string,
    placeholder?: string,
    className: string,
    onChange: (args: any) => any,
    options: () => React.ReactNode,
    errorMessage?: string
    state: { [key: string]: { value?: string | number | any, errorMessage?: string } }
    required?: boolean
}


const SelectGroup: FC<Props> = ({name, onClick, required, inputClass, labelClass, state, label, placeholder, className, onChange, options,}) => {
    return (
        <div className={["input-group", className].join(" ")}>
            <label htmlFor={name} className={`flex items-center font-medium mb-2 md:mb-0 ${labelClass}`}>
                <span>{label}</span>
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="w-full input">
                <select
                    onClick={onClick ? onClick : () => {
                    }}
                    className={inputClass}
                    name={name}
                    value={state[name].value}
                    id={name}
                    placeholder={placeholder}
                    onChange={onChange}>
                    {options()}
                </select>

                {state[name]?.errorMessage && <div className="mt-1"><span className="text-red-500 ">{state[name].errorMessage}</span></div>}

            </div>
        </div>
    )
}

export default SelectGroup