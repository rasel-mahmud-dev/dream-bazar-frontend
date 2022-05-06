import React, {FC} from 'react';
import {Breadcrumb} from "UI/index";
import {LastSelectedCategoryProps, SelectedCatSectionType} from "reducers/productReducer";
import { Dispatch } from "redux";

interface RenderBreadcrumbProps {
  lastSelectedCategory?: LastSelectedCategoryProps,
  selectedCatSections : SelectedCatSectionType,
  dispatch: Dispatch,
  history: { replace: any }
}

const RenderBreadcrumb: FC<RenderBreadcrumbProps> = (props) => {
  
  const { selectedCatSections, lastSelectedCategory, dispatch, history}  = props
  
  // console.log(selectedCatSections)
  
  
  function handleClickBreadcrumbItem(item, forLevel){
    // if(typeof selected_cat !== "boolean") {
    //   dispatch({
    //     type: "SET_LAST_SELECTED_CATEGORY",
    //     payload: {
    //       name: selected_cat.name,
    //       id: selected_cat.id,
    //       _id: selected_cat._id,
    //       _ids: selected_cat._ids,
    //     }
    //   })
    // }
  
    let updatedSelectedCatSection: SelectedCatSectionType = {...selectedCatSections }

    if(item){
      dispatch({
        type: "SET_LAST_SELECTED_CATEGORY",
        payload: { name: item.name, id: item.id, _id: item._id, _ids: item._ids }
      })
    }
    
  
    if(forLevel === "oneLevel") {
      updatedSelectedCatSection["twoLevel"] = null
      updatedSelectedCatSection["threeLevel"] = null
      updatedSelectedCatSection["fourLevel"] = null
      updatedSelectedCatSection["fiveLevel"] = null
      
    } else if(forLevel === "twoLevel") {
      if (updatedSelectedCatSection[forLevel]) {
        updatedSelectedCatSection[forLevel] = null
        updatedSelectedCatSection["threeLevel"] = null
        updatedSelectedCatSection["fourLevel"] = null
        updatedSelectedCatSection["fiveLevel"] = null
      } else {
        updatedSelectedCatSection[forLevel] = item
      }
    } else if(forLevel === "threeLevel"){
      if (updatedSelectedCatSection[forLevel]) {
        updatedSelectedCatSection[forLevel] = null
        updatedSelectedCatSection["fourLevel"] = null
        updatedSelectedCatSection["fiveLevel"] = null
      } else {
        updatedSelectedCatSection[forLevel] = item
      }

    } else if(forLevel === "fourLevel"){
      if (updatedSelectedCatSection[forLevel]) {
        updatedSelectedCatSection[forLevel] = null
        updatedSelectedCatSection["fiveLevel"] = null
      } else {
        updatedSelectedCatSection[forLevel] = item
      }

    } else {
      if (updatedSelectedCatSection[forLevel]) {
        updatedSelectedCatSection[forLevel] = null
      } else {
        updatedSelectedCatSection[forLevel] = item
      }
    }

    dispatch({
      type: "SET_SELECTED_CATEGORY_SECTIONS",
      payload: updatedSelectedCatSection
    })
    
    if(item && updatedSelectedCatSection.oneLevel){
      let u = `/p?cat=${updatedSelectedCatSection.oneLevel.id}`
      if (item.id) {
        u = u + `&cat_tree=${item.id}`
      }
      history.replace(u)  // replace browser url
    }
  }
  
  return (
    <div className="mt-2">
      <Breadcrumb>
        {selectedCatSections.oneLevel && (
          <Breadcrumb.Item key="oneLevel" onClick={()=>handleClickBreadcrumbItem(selectedCatSections.oneLevel, "oneLevel")} >
            <i className='far fa-home'/>
            {selectedCatSections.oneLevel.name}
          </Breadcrumb.Item>
        )}
        {selectedCatSections.twoLevel && (
          <Breadcrumb.Item key="twoLevel" onClick={()=>handleClickBreadcrumbItem(selectedCatSections.twoLevel, "twoLevel")}>{selectedCatSections.twoLevel.name}</Breadcrumb.Item>
        )}
        {selectedCatSections.threeLevel && (
          <Breadcrumb.Item key="threeLevel" onClick={()=>handleClickBreadcrumbItem(selectedCatSections.threeLevel, "threeLevel")}>{selectedCatSections.threeLevel.name}</Breadcrumb.Item>
        )}
        {selectedCatSections.fourLevel && (
          <Breadcrumb.Item key="fourLevel" onClick={()=>handleClickBreadcrumbItem(selectedCatSections.fourLevel, "fourLevel")}>{selectedCatSections.fourLevel.name}</Breadcrumb.Item>
        )}
        {selectedCatSections.fiveLevel && (
          <Breadcrumb.Item key="fiveLevel" onClick={()=>handleClickBreadcrumbItem(selectedCatSections.fiveLevel, "fiveLevel")}>{selectedCatSections.fiveLevel.name}</Breadcrumb.Item>
        )}
      </Breadcrumb>
      
    </div>
  );
};

export default RenderBreadcrumb;