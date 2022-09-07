import React, {FC, HTMLAttributes} from "react";
import "./Menu.scss"


export interface ItemProps extends HTMLAttributes<HTMLLIElement>{
  key?: string,
  id?: string,
  icon?: string,
  inline?: boolean
  onClick?: any
  onMouseOver?: any
  onMouseLeave?: any
  onMouseEnter?: any
  selectedKeys?: string[]
  defaultOpenKeys?: string[]
}


const Item: FC<ItemProps> = (props)=>{
  
  const {key, icon, id, className, inline=false, selectedKeys, children, ...attributes} = props
  
    function renderSubMenu(children: any) {
      return selectedKeys && selectedKeys.indexOf(id as string) !== -1 && <div className="sub_menu inline-mode--sub_menu ">
        <div className="menu_item">
          <div className="sub_menu__title">
            {children}
          </div>
        </div>
      </div>
    }
    
    function handleClick(e, id){
      e.stopPropagation()
      props.onClick && props.onClick(id)
    }
    
    
    // console.log(inline, icon)
    return (
      <li
          {...attributes}
            onClick={(e)=>handleClick(e, id)}
            onMouseOver={()=>props.onMouseOver && props.onMouseOver(id)}
            onMouseEnter={()=>props.onMouseEnter && props.onMouseEnter(id)}
            onMouseLeave={()=> props.onMouseLeave && props.onMouseLeave(id)}
            className={`menu_item no-sub ${className}`}>
        
           {children}
        
        {/*{inline ? (*/}
        {/*  icon ? (*/}
        {/*    <div className="menu_icon">*/}
        {/*      { icon && <i className={[icon, "menu_icon"].join(" ")} /> }*/}
        {/*      {renderSubMenu(children)}*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <div className=""><span>{children}</span></div>*/}
        {/*  )*/}
        {/*) : (*/}
        {/*  // <div onClick={(e)=>handleClick(e, id)} className={`item`}>*/}
        {/*     <span>{children}</span>*/}
        {/*  // </div>*/}
        {/*  )}*/}
      </li>
    )
}


Item.displayName = "Item"
export default Item