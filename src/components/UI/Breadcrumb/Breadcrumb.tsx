import React from "react";
import "./Breadcrumb.scss" 
import Item from "./Item"


const Breadcrumb = (props)=>{
  const { children, className, ...attributes} = props 
   
  function renderItem(ch){ 
    if(ch){
      return <Item {...ch.props}/>
    }
  }
  function renderBreadcrumb(){
    return children && Array.isArray(children) ? children.map((ch, i)=> {
      if(ch && ch.props && ch.props.children){
      return (
        <div className="breadcrumb_item">
          { i !== 0 && <i className="slash">/</i> }
          { renderItem(ch)}
          </div>
        )
      }
      }) : (
          children.props.children && <div className="breadcrumb_item">
           <i className="slash">/</i> 
          { renderItem(children)}
          </div>
        )
  }
  
  
  return (
    <div className="breadcrumb">
      { renderBreadcrumb()}
    </div>
  )
}

Breadcrumb.Item = Item

export default Breadcrumb



    //    <Breadcrumb>
    //       <Breadcrumb.Item>
    //         <i className="far fa-home" />
    //         Home
    //       </Breadcrumb.Item>
    //       <Breadcrumb.Item>
    //         <i className="fa fa-heart" />
    //         <a href="">Heart</a>
    //       </Breadcrumb.Item>
    //       <Breadcrumb.Item>
    //         <a href="">Application Center</a>
    //       </Breadcrumb.Item>
    //       <Breadcrumb.Item>
    //         <a href="">Application List</a>
    //       </Breadcrumb.Item>
    //       <Breadcrumb.Item>An Application</Breadcrumb.Item>
    //     </Breadcrumb> 
  