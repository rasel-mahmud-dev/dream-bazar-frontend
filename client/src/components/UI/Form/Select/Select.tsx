import React, {useState, FC, ChangeEvent} from 'react'
import classnames from 'classnames'

import './select.scss'

interface SelectPropsType {
  ref?: any
  name?: string,
  pos?: any,
  label?: string,
  inputDisable?: boolean,
  error?: any,
  touched?: boolean,
  options?: any[],
  optionsName?: { key: string, name: string },
  selectedOptions?: {}[],
  value?: any,
  placeholder?: string,
  onChange?: any,
  onClick?: any,
  toggleOptionClick?: any,
  onBlur?: any,
  onRemoveSelectedItem?: any,
  firstOption?: string
  type?: string
  defaultValue?: any
  children: any
}


const Select = React.forwardRef<any, SelectPropsType>((props, ref)=>{
  
  const {
    name,
    pos,
    label,
    inputDisable,
    type = "text",
    error,
    touched,
    options = [],
    optionsName = null,
    selectedOptions=[],
    value,
    placeholder,
    onChange,
    onClick,
    toggleOptionClick,
    onBlur,
    onRemoveSelectedItem,
    firstOption
  } = props
  
  const [isShowSuggetion, setShowSuggetion] = useState<boolean>(false)
  const [isInputTouched, setInputTouched] = useState<boolean>(false)
  const [isInputError, setInputError] = useState<string>('')
  
  const classes = classnames("input_group2 select")
  
  let chevronStyle: any = {}
  if (pos) {
    if (pos.top) chevronStyle.top = pos.top
    if (pos.bottom) chevronStyle.bottom = pos.bottom
    if (pos.right) chevronStyle.right = pos.right
    if (pos.left) chevronStyle.left = pos.left
  }
  
  React.useEffect(() => {
    if (error) {
      setInputError(error)
    } else {
      setInputError('')
    }
  }, [error])
  
  function handleShowSuggetion(e: any) {
    onClick && onClick(e)
    setShowSuggetion && setShowSuggetion(!isShowSuggetion)
    toggleOptionClick && toggleOptionClick(!isShowSuggetion)
  }
  
  function handleInputClick(e: any) {
    setInputTouched(true)
    onClick && onClick(e)
    setShowSuggetion && setShowSuggetion(!isShowSuggetion)
    toggleOptionClick && toggleOptionClick(!isShowSuggetion)
    
    // if (inputDisable) {
    //   setShowSuggetion(true)
    // }
  }
  
  function handleInputChange(e: any) {
    if (onChange) {
      if(optionsName) {
        onChange({target: {name: e.target.name, value: {name: "", _id: ""}}})
      } else {
        onChange({target: {name: name, value: e.target.value}})
      }
    }
  }
  
  function handleInputBlur() {
    setInputTouched(false)
  }
  
  function handleChooseOptionValue(item: any) {
    console.log(item)
    if(!item){
      setShowSuggetion(false)
      return
    }
    if (onChange) {
      if(optionsName){
        onChange({target: {name: name, value: {name: item[optionsName.name], _id: item[optionsName.key]}}})
      } else{
        onChange({target: {name: name, value: item}})
      }
    }
    setShowSuggetion(false)
  }
  
  function renderOptionList(){
    let filteredOptions: any = []
    if(selectedOptions && selectedOptions.length > 0){
      options.forEach((item: any)=> {
        if (optionsName) {
          if (selectedOptions.findIndex((o: any) => o[optionsName.key] === item[optionsName.key]) === -1) {
            // @ts-ignore
            filteredOptions.push(item)
          }
        } else {
          if(selectedOptions.indexOf(item) === -1){
            // @ts-ignore
            filteredOptions.push(item)
          }
        }
      })
    } else {
      filteredOptions = options
    }
    
    return (
      <div className="select_options_list">
        {firstOption && <li onClick={(e) => handleChooseOptionValue("")}>{firstOption}</li>}
        {filteredOptions && filteredOptions.map(option => {
          return <li onClick={(e) => handleChooseOptionValue(option)}>
            { optionsName ? option[optionsName.name] : option }
          </li>
        })}
      </div>
    )
  }
  
  function removeFromSelectedItem(item: any | string  ){
    if(optionsName) {
      onRemoveSelectedItem && onRemoveSelectedItem({
        target: {
          name: name, value: {name: item[optionsName.name], _id: item[optionsName.key]}
        }
      })
      
    } else {
      onRemoveSelectedItem && onRemoveSelectedItem({
        target: {
          name: name, value: item
        }
      })
    }
  }
  
  
  
  return (
    <div className={classes}>
      
      <label className={["select_label", isInputError ? "select_label_error" : ""].join(" ")}
             htmlFor={name}>{label}</label>
      <div className={["error_msg", error ? 'error_msg_show' : 'error_msg_hide'].join(" ")}>{error}</div>
      
      <div className="selected_values">
        { selectedOptions && selectedOptions.map((selectedCat: any)=>(
          <li onClick={()=>removeFromSelectedItem(selectedCat)} className="selected_values__name">{ optionsName ? selectedCat[optionsName.name] : selectedCat }</li>
        )) }
      </div>
      
      <div className="input_wrapper">
        <div className={["input_border", isInputTouched ? "input_border_focus" : "", isInputError ? "input_border_error" : ""].join(" ")}/>
        <div onClick={handleInputClick}
             className={["input", isInputTouched ? "input_focus" : "", isInputError ? "input_error" : ""].join(' ')}>
          <input
            style={{cursor: inputDisable ? "pointer" : "unset"}}
            type={type}
            name={name}
            disabled={inputDisable}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onClick={handleInputClick}
          />
        </div>
        <div style={chevronStyle} onClick={handleShowSuggetion} className="switch_select">
          <i className={['fa fa-chevron-up', isShowSuggetion ? 'chevron_up' : 'chevron_down'].join(" ")} aria-hidden="true"/>
        </div>
        {isShowSuggetion && options && options.length > 0 && renderOptionList()}
      </div>
    </div>
  )
})
export default Select
