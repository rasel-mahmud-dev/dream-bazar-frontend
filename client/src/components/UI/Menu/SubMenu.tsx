import React, {CSSProperties, FC} from "react";
import Item from "./Item"
import {Animation} from "UI/index";
import {FaAngleDoubleRight, FaAngleRight, FaAngleUp} from "react-icons/all";
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
  item: {icon: any, id: string}
  renderInlineMode?: (isInline: boolean, item: any)=>React.ReactNode
}


const SubMenu: FC<SubMenuProps> = (props)=>{
  const { label, renderInlineMode, item, parent, inline=false, id, onClickOnItem, defaultOpenKeys=[], selectedKeys=[] } = props
  
  
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
          <Item onClick={()=>subMenuJsx && onClickOnItem(id)} className={`flex justify-between items-center ${props.children[0].props.className}
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
          {/*{  props.icon ?  (*/}
          {/*      <li*/}
          {/*        // onClick={()=>props.onClick && props.onClick(id)}*/}
          {/*        // onMouseOver={()=>props.onMouseOver && props.onMouseOver(id)}*/}
          {/*        // onMouseEnter={()=>props.onMouseEnter && props.onMouseEnter(id)}*/}
          {/*        // onMouseLeave={()=> props.onMouseLeave && props.onMouseLeave(id)}*/}
          {/*        className="text-xl">*/}
          {/*        */}
          {/*        {icon}*/}
          {/*        */}
          {/*        /!*{ selectedKeys.indexOf(id as string) !== -1 && <div className="sub_menu inline-mode--sub_menu ">*!/*/}
          {/*        /!*  <Item*!/*/}
          {/*        /!*    {...ch}*!/*/}
          {/*        /!*    children={(*!/*/}
          {/*        /!*      <span className="sub_menu__title" >{label.props.children && Array.isArray(label.props.children) && label.props.children[1]}</span>*!/*/}
          {/*        /!*    )}*!/*/}
          {/*        /!*    inline={inline}*!/*/}
          {/*        /!*    key={ch.key}*!/*/}
          {/*        /!*    id={ch.key}*!/*/}
          {/*        /!*  />*!/*/}
          {/*          */}
          {/*          /!*{props.children && Array.isArray(props.children) ?  props.children.map((ch_ch: any)=>(*!/*/}
          {/*          /!*    <Item*!/*/}
          {/*          /!*      {...ch_ch.props}*!/*/}
          {/*          /!*      inline={inline}*!/*/}
          {/*          /!*      key={ch_ch.key}*!/*/}
          {/*          /!*      id={ch_ch.key}*!/*/}
          {/*          /!*    />*!/*/}
          {/*          /!*  ))*!/*/}
          {/*          /!*  : (*!/*/}
          {/*          /!*    <Item*!/*/}
          {/*          /!*      {...ch.props}*!/*/}
          {/*          /!*      inline={inline}*!/*/}
          {/*          /!*      key={ch.key}*!/*/}
          {/*          /!*      id={ch.id}*!/*/}
          {/*          /!*    />*!/*/}
          {/*          /!*  )*!/*/}
          {/*          /!*}*!/*/}
          {/*          */}
          {/*        /!*</div>  }*!/*/}
          {/*      </li>*/}
          {/*    ) : "ASDDDDDDDDDD" }*/}
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
                              <Item className={subItem.props.className ? subItem.props.className   : ""}>
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

