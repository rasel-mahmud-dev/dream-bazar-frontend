import React, {useEffect, useRef, useState} from 'react';

import "./menu-dropdown.scss"

const MenuDropdown = ({render, className = "", children}) => {

    const [isFocus, setFocus] = useState(false)

    function handleBlur() {
        setFocus(false)
    }

    const content = useRef()

    useEffect(() => {
        if (isFocus && content.current) {
            (content.current as HTMLDivElement).focus()
        }
    }, [isFocus]);


    return (
        <div className={`relative menu-dropdown ${className}`}>
            <span onClick={() => setFocus(!isFocus)}>{children}</span>
            {isFocus && <div ref={content} onBlur={handleBlur} tabIndex={-1} className="menu-dropdown-content absolute bg-dark-750 p-4 rounded">
                {render()}
            </div>}
        </div>
    )
}
export default MenuDropdown;