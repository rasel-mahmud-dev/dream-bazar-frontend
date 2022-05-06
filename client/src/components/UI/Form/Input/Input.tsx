import React, {ChangeEvent, ChangeEventHandler, FC} from "react"

import "./Input.scss"
import Menu from "./Menu";

// /** This basic props required for input and textarea. */
interface BasicProps {
  prefixCls?: string;
  inputType?: "text" | "input";
  value?: any;
  allowClear?: boolean;
  element?: React.ReactElement;
  handleReset?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange?: any;
  onKeyUp?: any;
  onKeyDown?: any;
  onKeyPress?: any;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  direction?: any;
  focused?: boolean;
  readOnly?: boolean;
  bordered?: boolean;
  label?: string
  placeholder?: string
  type?: string,
  name?: string,
  checked?: boolean
}

/** This props only for input. */
export interface ClearableInputProps extends BasicProps {
  size?: "sm" | "lg";
  suffix?: React.ReactElement;
  prefix?: React.ReactElement;
  addonBefore?: React.ReactElement;
  addonAfter?: React.ReactElement;
  triggerFocus?: () => void;
}

function isSuffixOrPrefix(prefix, suffix){
  return !!(prefix || suffix)
}
function isAddon(addonBefore, addonAfter){
  return !!(addonBefore || addonAfter)
}


const Input = (props: ClearableInputProps)=>{
  const { 
    className,
    value,
    label, 
    type="text", 
    name,
    placeholder,
    suffix, prefix, addonAfter, addonBefore,
    ...otherAttribute
  } = props
  
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  function inputTypeClass(){
    if(type === "radio"){
      return `input-group__${type}`
    }
    if(type === "checkbox"){
      return `input-group__${type}`
    }
  }  
  
  // function renderPrefix(){
  //   let prefixElProps = {
  //     onClick: ()=> inputRef.current.focus(),
  //     className: "prefix-icon " + prefix.props.className
  //   }
  //   return React.cloneElement(prefix, prefixElProps)
  // }
  //
  // function renderSuffix(){
  //    let suffixElProps = {
  //     className: "suffix-icon " + suffix.props.className
  //   }
  //   return React.cloneElement(suffix, suffixElProps)
  // }
  
  function renderAffixAddon(){
  
  }
  
  function renderWithAddon(inputEle: JSX.Element){
    if(!isAddon(addonBefore, addonAfter)){
      return inputEle
    }
    
    let addonWrapperCls = ["input-addon-wrapper"].join(" ")
    
    let renderAddonNodeBefore;
    let renderAddonNodeAfter;
    if(addonAfter){
      renderAddonNodeAfter = <div className="addon-after">
        {React.cloneElement(addonAfter, {...addonAfter.props})}
      </div>
    }
    
    if(addonBefore){
      renderAddonNodeBefore = <div className="addon-before">
        {React.cloneElement(addonBefore, {...addonBefore.props})}
      </div>
    }
    
    return (
      <div className={addonWrapperCls}>
        { !!addonBefore && renderAddonNodeBefore }
        {inputEle}
        { !!addonAfter && renderAddonNodeAfter }
      </div>
    )
    
  }
  
  function renderSuffixPrefix(inputEle: JSX.Element){
 
    if(!isSuffixOrPrefix(suffix, prefix)){
      return  inputEle
    }
    
    let renderSuffixNode;
    let renderPrefixNode;
    if(suffix){
      renderSuffixNode = (
        <div className="suffix-icon">
          { React.cloneElement(suffix, {...suffix.props})}
        </div>
      )
    }
    if(prefix){
      renderPrefixNode = (
        <div className="prefix-icon">
          { React.cloneElement(prefix, {...prefix.props})}
        </div>
      )
    }
    
    return (
      <div className="input-suffix-prefix-wrapper">
        {prefix && renderPrefixNode}
        {inputEle}
        {suffix && renderSuffixNode}
      </div>
    )
    
  }
  
  function renderCoreInput(){
    return (
      isSuffixOrPrefix(suffix, prefix) || isAddon(addonBefore, addonAfter) ? (
        <input
          placeholder={placeholder}
          type="text"
          ref={inputRef}
          value={value && value}
          onChange={props.onChange}
          onKeyUp={props.onKeyUp}
          onKeyDown={props.onKeyDown}
          onKeyPress={props.onKeyPress}
          className="input"
        />
      ) : (
        <div className="input-base">
          <input
            ref={inputRef}
            value={value && value}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onKeyPress={props.onKeyPress}
            type={type}
            className="input"
          />
        </div>
      )
    )
  }
  
  return renderWithAddon(renderSuffixPrefix(renderCoreInput()))
}


Input.Menu = Menu
Menu.displayName = 'Input-Dropdown-Menu';

export default Input
