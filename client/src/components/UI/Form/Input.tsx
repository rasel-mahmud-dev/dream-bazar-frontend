import React, {FC} from "react" 


import "./style.scss"

export function triggerFocus(
  element?: HTMLElement,
  option?: any){
    if (!element) return;
    element.focus(option);
  }

type InputStateType = {
  value: any;
  focused: boolean;
  /** `value` from prev props */
  prevValue?: any;
}
 
const Input = (props)=>{
  const { 
    className, 
    prefix,
    suffix,
    value, 
    type="text", 
    iconRender,
    ...otherAttribute
  } = props 
  
  const [state, setState] = React.useState<InputStateType>({
    focused: false,
    value: value
  })
  
  const inputRef = React.createRef<HTMLElement>();
  
  function inputTypeClass(){
    if(type === "radio"){
      return `input-group__${type}`
    }
    if(type === "checkbox"){
      return `input-group__${type}`
    }
  }  
  
  function handleReset(){
    
  }
  
  function focus(option?: any) {
    if(inputRef.current) {
      triggerFocus(inputRef.current, option);
    }
    setState({...state, focused: true})
  };

  function blur(option?: any) {
    inputRef.current.blur();
    setState({...state, focused: false})
  };
  
  
  function handleChange(e){
    const {onChange} = props
    setState({...state, value: e.target.value})
    onChange && onChange(e)
  }
  
  function renderInput(){
    return (
      <input 
        ref={inputRef}
        type={type} 
        onClick={focus}
        onChange={handleChange}
        onBlur={blur}
        value={state.value}
        className="input" 
        {...otherAttribute} 
      /> 
    )
  }
  
  
  return (
    "Empty Input"
  )
}


export default Input

