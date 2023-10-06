import React, {CSSProperties, FC} from "react";
import Item from "./Item"
import {Animation} from "UI/index";
import { FaAngleRight, FaAngleUp} from "react-icons/fa";
interface SubMenuProps {
  selectedKeys?: string[]
  defaultOpenKeys?: string[]
  onClick?: any
  onClickOnItem?: any
  children: any
  label: any
  id?: string
  className?: string
  style?: CSSProperties
  onMouseOver?: any
  onMouseLeave?: any
  onMouseEnter?: any
  inline?: boolean,
  parent?: JSX.Element
  key?: string
  activeId?: string,
  item: {icon: any, id: string, name: string}
  renderInlineMode?: (isInline: boolean, item: any)=>React.ReactNode
}


const SubMenu: FC<SubMenuProps> = (props)=>{
  const {
    label,
    activeId,
    renderInlineMode,
    item,
    parent,
    inline=false,
    id,
    onClickOnItem,
    defaultOpenKeys=[],
    selectedKeys=[]
  } = props
  
  
  // console.log(props.children)
  let subMenuJsx = null
  if(props.children[1]){
    subMenuJsx = props.children[1];
  }
  
  
  function isExpandSubMenu(){
    return selectedKeys.indexOf(id as string) !== -1
  }
  
  
  function menuItem(){
    return (
        <>
          {/******** submenu label *********/}
          {label}
        
          {/*******submenu item ************/}
          <Item onClick={()=>subMenuJsx && onClickOnItem(id)} className={`flex justify-between items-center ${activeId === id ? "active-menu-item" : ""} ${props.children[0].props.className}
           ${ isExpandSubMenu() ? 'sub-menu-item__expanded' : ''} ` } >
            {props.children[0].props.children}
            { subMenuJsx && (isExpandSubMenu() ? <FaAngleUp /> :  <FaAngleRight/> ) }
          </Item>
      </>
      )
    }
    
    function renderInline(){
      return (
        <div className="text-red-500">
          { inline && renderInlineMode(inline, item) }
        </div>
      )
    }
  
    return (
        <>
          { inline
            ? renderInline()
            : (
                <li
                    key={id}
                    className={["menu_item text-white", props.className, isExpandSubMenu()
                      ? "menu_item--activated" : ""].join(" ")}
                >
                
                  {menuItem()}
  
                  {subMenuJsx && <div className={`sub_menu `} >
                      <Animation baseClass="sub_menu_animation" inProp={(!inline && selectedKeys.indexOf(id as string) !== -1)}>
                        <div className={`${subMenuJsx.props.className}`}>
                          {subMenuJsx.props.children.map(subItem=>(
                              <Item className={`${subItem.props.className ? subItem.props.className   : ""}  ${activeId == subItem.key ? "active-menu-item" : ""} `}>
                                {subItem.props.children}
                              </Item>
                          ))}
                        </div>
                      </Animation>
                    </div>
                  }
                </li>
              )
            }
        </>
    )
}

SubMenu.displayName = "SubMenu"
export default SubMenu

