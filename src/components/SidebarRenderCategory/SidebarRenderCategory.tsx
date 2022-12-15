import React, {FC} from 'react';
import "./sidebarRenderCategory.scss";

import {connect, useDispatch} from "react-redux";
import {LastSelectedCategoryProps, SelectedCatSectionType} from "reducers/productReducer";
import {useLocation} from "react-router-dom";
import {RootState} from "src/store";


interface  FilterSidebarProps {
  selectedCatSections: SelectedCatSectionType
  lastSelectedCategory: LastSelectedCategoryProps
  ui_filterItems: any
}


const SidebarRenderCategory: FC<FilterSidebarProps> = (props) => {
  
  const location = useLocation()
  const dispatch = useDispatch()
  
    // const [lastSelectedCategory, setLastSelectedCategory] = React.useState<{id: string, _id: string, name: string}>({})
    // const [selectedCatSections, setSelectedCatSection] = React.useState<SelectedCatSectionType>({
    //   oneLevel: null,
    //   twoLevel: null,
    //   threeLevel: null,
    //   fourLevel: null,
    //   fiveLevel: null,
    // })
    
    const { selectedCatSections, lastSelectedCategory } = props



  
    function chooseCategoryHandler(forLevel, cat_item, selected_cat: LastSelectedCategoryProps | boolean = false){
      if(typeof selected_cat !== "boolean") {
        dispatch({
          type: "SET_LAST_SELECTED_CATEGORY",
          payload: {
            name: selected_cat.name,
            id: selected_cat.id,
            _id: selected_cat._id,
            _ids: selected_cat._ids,
          }
        })
      }
    
      let updatedSelectedCatSection = {...selectedCatSections }
      
      if(forLevel === "twoLevel") {
        if (updatedSelectedCatSection[forLevel]) {
          updatedSelectedCatSection[forLevel] = null
          updatedSelectedCatSection["threeLevel"] = null
          updatedSelectedCatSection["fourLevel"] = null
          updatedSelectedCatSection["fiveLevel"] = null
        } else {
          updatedSelectedCatSection[forLevel] = cat_item
        }
      } else if(forLevel === "threeLevel"){
        if (updatedSelectedCatSection[forLevel]) {
          updatedSelectedCatSection[forLevel] = null
          updatedSelectedCatSection["fourLevel"] = null
          updatedSelectedCatSection["fiveLevel"] = null
        } else {
          updatedSelectedCatSection[forLevel] = cat_item
        }
        
      } else if(forLevel === "fourLevel"){
        if (updatedSelectedCatSection[forLevel]) {
          updatedSelectedCatSection[forLevel] = null
          updatedSelectedCatSection["fiveLevel"] = null
        } else {
          updatedSelectedCatSection[forLevel] = cat_item
        }
        
      } else {
        if (updatedSelectedCatSection[forLevel]) {
          updatedSelectedCatSection[forLevel] = null
        } else {
          updatedSelectedCatSection[forLevel] = cat_item
        }
      }
      
      dispatch({
        type: "SET_SELECTED_CATEGORY_SECTIONS",
        payload: updatedSelectedCatSection
      })
  
      if(typeof selected_cat !== "boolean") {
        if (selected_cat && updatedSelectedCatSection.oneLevel) {
          let u = `/p?cat=${updatedSelectedCatSection.oneLevel.id}`
          if (selected_cat.id) {
            u = u + `&cat_tree=${selected_cat.id}`
          }
          // history.replace(u)  // replace browser url
        }
      }
    }
      
      return (
        <div className="filter_section">
          <div className="filter_section--each_section">
            <h4 className="filter_section__title">{"Categories".toUpperCase()}</h4>
            
            { selectedCatSections.oneLevel && (
              <>
                <h4 className={["menu-item",
                  lastSelectedCategory
                  && lastSelectedCategory.id === selectedCatSections.oneLevel.id ? "active-current__cat": "" ].join(" ")}
                    onClick={()=>chooseCategoryHandler("twoLevel", {}, selectedCatSections.oneLevel)}>
                  <i className="fa fa-chevron-right" />
                  <span>{selectedCatSections.oneLevel.name}</span>
                </h4>
                { !selectedCatSections.twoLevel &&
                <div className="two-level-cat">{selectedCatSections.oneLevel.sub_menu.map(sm => (
                  <li className="menu-item" onClick={() => chooseCategoryHandler("twoLevel", sm, sm)}>
                    <i className="fa fa-chevron-right" />
                    <span>{sm.name}</span>
                  </li>
                ))}</div>
                }
              </>
            )}
        
            { selectedCatSections.twoLevel && selectedCatSections.twoLevel.name && (
              <>
                <h4
                  className={["two-level-cat menu-item",
                    lastSelectedCategory
                    && lastSelectedCategory.id === selectedCatSections.twoLevel.id ? "active-current__cat": "" ].join(" ")}
                  onClick={()=>chooseCategoryHandler("threeLevel", {}, selectedCatSections.twoLevel)}>
                  {selectedCatSections.twoLevel.sub_menu && <i className="fa fa-chevron-right" />}
                  <span>{selectedCatSections.twoLevel.name}</span>
                </h4>
                { !selectedCatSections.threeLevel && (
                  <div className="three-level-cat">
                    {selectedCatSections.twoLevel.sub_menu && selectedCatSections.twoLevel.sub_menu.map(sm3=>(
                      <li className="menu-item" onClick={()=>chooseCategoryHandler("threeLevel", sm3, sm3)}>
                        <i className="fa fa-chevron-right" />
                        <span>{sm3.name}</span>
                      </li>
                    ))}
                  </div>
                )}
              </>
            )}
            
            {selectedCatSections.threeLevel && selectedCatSections.threeLevel.name && (
              <>
                <h4
                  className={["three-level-cat menu-item",
                    lastSelectedCategory
                    && lastSelectedCategory.id === selectedCatSections.threeLevel.id ? "active-current__cat": "" ].join(" ")}
                  // className={["three-level-cat menu-item",
                  //   lastSelectedCategory
                  //   && lastSelectedCategory.id === selectedCatSections.threeLevel.id ? "active-current__cat": "" ].join(" ")}
                  onClick={()=>chooseCategoryHandler("fourLevel", selectedCatSections.fourLevel, selectedCatSections.threeLevel)}>
                  {selectedCatSections.threeLevel.sub_menu && <i className="fa fa-chevron-right" />}
                  <span>{selectedCatSections.threeLevel.name}</span>
                </h4>
                { !selectedCatSections.fourLevel &&
                <div className="four-level-cat">
                  {selectedCatSections.threeLevel.sub_menu && selectedCatSections.threeLevel.sub_menu.map(sm4=>(
                    <li className="menu-item" onClick={()=>chooseCategoryHandler("fourLevel", sm4, sm4)}>
                      <i className="fa fa-chevron-right" />
                      <span>{sm4.name}</span>
                    </li>
                  ))}
                </div>
                }
              </>
            )}
        
            {selectedCatSections.fourLevel && (
              <>
                <h4
                  className={["four-level-cat menu-item",
                    lastSelectedCategory && lastSelectedCategory.id === selectedCatSections.fourLevel.id ? "active-current__cat": "" ].join(" ")}
                  // className={["three-level-cat menu-item",
                  //   lastSelectedCategory
                  //   && lastSelectedCategory.id === selectedCatSections.threeLevel.id ? "active-current__cat": "" ].join(" ")}
                  onClick={()=>chooseCategoryHandler("fiveLevel", {}, selectedCatSections.fourLevel)}>
                  {selectedCatSections.fourLevel.sub_menu && <i className="fa fa-chevron-right" />}
                  <span>{selectedCatSections.fourLevel.name}</span>
                </h4>
                { !selectedCatSections.fiveLevel &&
                <div className="five-level-cat">
                  {selectedCatSections.fourLevel.sub_menu && selectedCatSections.fourLevel.sub_menu.map(sm4=>(
                    <li className="menu-item" onClick={()=>chooseCategoryHandler("fiveLevel", sm4, sm4)}>
                      <i className="fa fa-chevron-right" />
                      <span>{sm4.name}</span>
                    </li>
                  ))}
                </div>
                }
              </>
            )}
        
            {selectedCatSections.fiveLevel && (
              <>
                <h4
                  className={["five-level-cat menu-item",
                    lastSelectedCategory && lastSelectedCategory.id === selectedCatSections.fiveLevel.id ? "active-current__cat": "" ].join(" ")}
                  // className={["three-level-cat menu-item",
                  //   lastSelectedCategory
                  //   && lastSelectedCategory.id === selectedCatSections.threeLevel.id ? "active-current__cat": "" ].join(" ")}
                >
                  {selectedCatSections.fiveLevel.name && <i className="fa fa-chevron-right" />}
                  <span>{selectedCatSections.fiveLevel.name}</span>
                </h4>
              </>
            )}
          </div>
        </div>
  );
};

function mapStateToProps(state: RootState){
  return {
    //@ts-ignore
    lastSelectedCategory: state.productState.lastSelectedCategory,
    // selectedCatSections: state.productState.selectedCatSections
  }
}

export default connect(mapStateToProps, {})(SidebarRenderCategory);