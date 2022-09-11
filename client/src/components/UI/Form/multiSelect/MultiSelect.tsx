import React, {FC} from 'react'


interface Props{
    inputClass?: string
    labelClass?: string
    name: string, value?: any[], label?: string, placeholder?: string, className: string,
    onChange: (args: any)=>any,
    options: (args: any)=> React.ReactNode, errorMessage?: string
    dataKey: {title: string, key: string}
}

import "./styles.scss";

const MultiSelect :FC<Props> = ({ inputClass, dataKey, labelClass, name, value, label, placeholder, className, onChange, options, errorMessage }) =>{

    const [isOpen, setOpen] = React.useState(false)
    const [state, setState] = React.useState([])
    
    React.useEffect(()=>{
        if(value && Array.isArray(value) && value.length){
            setState(value)
        }
    }, [])

    function onClick(item, e){
        e && e.stopPropagation();
        let updateState = [...state]
        
        let index = updateState.findIndex(v=>v[dataKey.key] === item[dataKey.key]);
        
        if(index === -1){
            updateState.push(item)
        } else {
            updateState.splice(index, 1)
        }
        
        setState(updateState)
        onChange && onChange({target: {value: updateState, name: name}})
    }
    
    console.log(state)
    

    function deleteSelectedInput(item){
        let newState = state && state.filter(v=>v[dataKey.key] !== item[dataKey.key])
        setState(newState)
        onChange && onChange({target: {value: newState, name: name}})
    }

    function handleToggleSelect(e){
        setOpen(!isOpen)
    }

    return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <label htmlFor={name}  className={`block w-40 font-medium text-gray-200 mb-2 md:mb-0 ${labelClass}`} >{label}</label>
            <div className="w-full">

                {state && state.length ? <div className="flex flex-wrap gap-x-1 gap-y-1 mb-2">
                    {state.map((v, i) => (
                        <li key={i} className="list-none flex items-center px-2 py-2 bg-secondary-300 rounded ">
                            <span className="mr-2 text-white">{v[dataKey.title]}</span>
                            <svg
                                onClick={() => deleteSelectedInput(v)}
                                className="w-2 fill-white cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z" /></svg>
                        </li>
                    ))}
                </div> : "" }

                <div  className={`input flex relative items-center ${inputClass} text-[15px] rounded px-2 py-1.5 w-full text-gray-800 `}
                    onClick={handleToggleSelect}
                >
                    {placeholder}
                    {isOpen && <ul className="absolute top-12 left-0  w-full p-4 ">
                        {options(onClick)}
                    </ul>}
                </div>
                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error">{errorMessage}</span>}
                </div>
            </div>
        </div>
    )
}

export default MultiSelect