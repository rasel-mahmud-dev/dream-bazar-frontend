import React, {FC} from 'react'
import "./styles.scss";


interface Props {
    inputClass?: string
    labelClass?: string
    name: string,
    value?: any[],
    label?: string,
    placeholder?: string,
    className?: string,
    onChange: (args: any) => any,
    onClick?: (args: any) => any,
    options: (args: any) => React.ReactNode,
    errorMessage?: string
    dataKey: { title: string, key: string }
    state: { [key: string]: { value?: string | number, errorMessage?: string } }
}

const MultiSelect: FC<Props> = ({
        inputClass,
        state,
        dataKey,
        labelClass,
        name,
        value,
        label,
        placeholder,
        className,
        onChange,
        onClick,
        options,
        errorMessage
    }) => {
    
    const [isOpen, setOpen] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState([])
    
    React.useEffect(() => {
        if (value && Array.isArray(value) && value.length) {
            setSelectedItem(value)
        }
    }, [])
    
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
        setOpen(!isOpen)
    }
    
    return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")}>
            <label htmlFor={name} className={`block w-40 font-medium mb-2 md:mb-0 ${labelClass}`}>{label}</label>
            <div className="w-full">

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
    
                <div
                    className={`input flex relative items-center ${inputClass} text-[15px] rounded px-2 py-1.5 w-full text-gray-800 `}
                    onClick={handleToggleSelect}
                >
                    {placeholder}
                    {isOpen && <ul className="absolute top-12 left-0  w-full p-4 ">
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