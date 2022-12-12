import React, {useState} from "react" 
import Input from "./Input/Input"


const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

const Password = (props)=>{
  const {visibilityToggle} = props
  const [visible, setVisible] = useState(false);

  const onVisibleChange = () => {
    const { disabled } = props;
    if (disabled) {
      return;
    }
    setVisible(!visible);
  };

  const getIcon = (prefixCls: string) => {
    const { action, iconRender = () => null } = props;
    const iconTrigger = ActionMap[action!] || '';
    const icon = iconRender(visible);
    const iconProps = {
      [iconTrigger]: onVisibleChange,
      className: `${prefixCls}-icon ${icon.props.className}`,
      key: 'passwordIcon',
      onMouseDown: (e: MouseEvent) => {
        // Prevent focused state lost
        // https://github.com/ant-design/ant-design/issues/15173
        e.preventDefault();
      },
      onMouseUp: (e: MouseEvent) => {
        // Prevent caret position change
        // https://github.com/ant-design/ant-design/issues/23524
        e.preventDefault();
      },
    };
    return React.cloneElement(icon, iconProps);
  };

  const suffixIcon = visibilityToggle && getIcon("input");  
  

  return (
    <Input 
      {...props} 
      suffix={suffixIcon} 
      type={visible ? "text" : "password"} 
    />
  )
}


Password.defaultProps = {
  action: 'click',
  visibilityToggle: true,
  iconRender: (visible: boolean) => (visible ? <i className="fal fa-eye" /> : <i className="fal fa-eye-slash"/>),
};

Password.displayName = 'Password';

export default Password


