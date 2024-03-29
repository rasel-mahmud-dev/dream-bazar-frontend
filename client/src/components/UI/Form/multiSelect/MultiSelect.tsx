import React, {FC, useEffect, useState} from 'react'
import "./styles.scss";
import {TiTimes} from "react-icons/ti";


interface Props {
    inputClass?: string
    labelClass?: string
    name: string,
    defaultValue?: any[],
    label?: string,
    placeholder?: string,
    className?: string,
    onChange: (args: any) => any,
    onClick?: (args: any) => any,
    options: (args: any) => React.ReactNode,
    dataKey: { title: string, key: string }
    state: { [key: string]: { value?: string | number, errorMessage?: string } }
}

const MultiSelect: FC<Props> = ({
        inputClass,
        state,
        dataKey,
        labelClass,
        name,
        defaultValue,
        label,
        placeholder,
        className,
        onChange,
        onClick,
        options
    }) => {
    
    const [isOpen, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    
    useEffect(() => {
        if (defaultValue && Array.isArray(defaultValue) && defaultValue.length) {
            setSelectedItem(defaultValue)
        }
    }, [defaultValue])
    
    
    function handleClick(item, e) {
        e && e.stopPropagation();
        
        let updateState = [...selectedItem]
        
        let index = updateState.findIndex(v => v[dataKey.key] === item[dataKey.key]);
        if (index === -1) {
            updateState.push(item)
        } else {
            updateState.splice(index, 1)
        }
        
        setSelectedItem(updateState)
        onChange && onChange({target: {value: updateState, name: name}})
    }
    
    
    function deleteSelectedInput(item) {
        let newState = selectedItem && selectedItem.filter(v => v[dataKey.key] !== item[dataKey.key])
        setSelectedItem(newState)
        onChange && onChange({target: {value: newState, name: name}})
    }
    
    function handleToggleSelect(e) {
        onClick && onClick(e)
    }

    function handleFocus(e){
        setOpen(true)
    }

    function toggle(e){
        e.stopPropagation();
        setOpen(!isOpen )
    }

    function handleBlur(e){
        console.log(e, "blur")
        setOpen(false)
    }


    return (
        <div className={["mt-4 input-group select flex items-start flex-col md:flex-row", className].join(" ")}>
            <label htmlFor={name} className={`block font-medium mb-2 md:mb-0 ${labelClass}`}>{label}</label>
            <div className="w-full" >
                {selectedItem && selectedItem.length ? <div className="flex flex-wrap gap-x-1 gap-y-1 mb-2">
                    {selectedItem.map((v, i) => (
                        <li key={i} className="list-none flex items-center px-2 py-2 bg-secondary-300 rounded ">
                            <span className="mr-2 text-white">{v[dataKey.title]}</span>
                            <svg
                                onClick={() => deleteSelectedInput(v)}
                                className="w-2 fill-white cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path
                                    d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"/></svg>
                        </li>
                    ))}
                </div> : ""}
    
                <div onClick={toggle}
                    tabIndex={-1} onBlur={handleBlur}  onFocus={handleFocus}
                    className={`input ${inputClass}`}
                    // onClick={handleToggleSelect}
                >
                    {placeholder}
                    {isOpen && <ul className="option-list absolute top-12 left-0  w-full p-4 ">
                        <span className="close-icon-btn"><TiTimes onClick={()=>setOpen(false)} /></span>
                        {options(handleClick)}

                    </ul>}
                </div>
    
                {state[name]?.errorMessage &&
		            <div className="mt-1"> <span className="text-red-500 ">{state[name].errorMessage}</span> </div>}
                
            </div>
        </div>
    )
}

export default MultiSelect