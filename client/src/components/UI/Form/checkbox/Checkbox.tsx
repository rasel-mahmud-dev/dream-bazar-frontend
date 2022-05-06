import React, {FC, useState} from "react"

import  "./checkbox.scss"


const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

interface CheckboxProps{
  disabled?: boolean
  label?: string
  name?: string
  className?: string
  reverse?: boolean;
  checked?: boolean;
  onChange?: any
  onClick?: any
}


const Checkbox: FC<CheckboxProps> = (props)=>{
  const [checked2, setChecked2] = useState<boolean>(false);
  
    React.useEffect(()=>{
    if(typeof props.checked !== "undefined"){
      setChecked2(props.checked)
    }
  }, [props.checked])
  
  function handleClick(e){
    if(typeof props.checked === "undefined") {
      setChecked2(!checked2)
    }
    props.onClick && props.onClick()
  }
  
  function renderCheckbox() {
    const { name, label, className, reverse, checked, ...attribute } = props
  
    return (
      <div className={["checkbox-root", reverse ? "checkbox-reverse" : "", className].join(" ")}>
        <div className={[
          "checkbox-input-wrapper", checked2 ? "checkbox-input-wrapper__checked": "" ].join(" ")}>
          <input
            {...attribute}
            onChange={props.onChange && props.onChange}
            onClick={handleClick}
            type="checkbox"
            id={name}
            checked={checked2 }
            name={name}
          />
          <div className="checkbox-mask" />
        </div>
        <label className="checkbox-label" htmlFor={name}>{label}</label>
      </div>
    )
    
  }

  return renderCheckbox()
  
}


Checkbox.displayName = 'Checkbox';

export default Checkbox
