import React, {FC, useEffect, useState} from 'react'
import "./FilterSidebar.scss"
import {connect, useDispatch} from "react-redux"
import {ACTION_TYPES} from "store/types"
import {Button, Input} from "components/UI"


import {fetchBrandForCategory} from "actions/productAction";
import {LastSelectedCategoryProps, SelectedCatSectionType, UI_CATEGORY_INFO_TYPE} from "reducers/productReducer";

import getFilterItems from "src/utills/getFilterItems";
import { removeAllFilteredValue } from "actions/filterSidebar.action";
import qstring from "query-string";
import apis from "src/apis";
import {nonInitialEffect} from "src/reactTools/nonInitialEffect";
import {useLocation, useNavigate} from "react-router-dom";


interface FilterSidebarProps {
  category: {
    // filters: {name: string, values: {name: "string", value: any}[]}[]
    brands: {not_available: boolean, _id: string, name: string}[] // populated property from database brands collections
    is_top: any
    last_level: any
    name: string
    parent_id: string
    updated_at: string
    _id: string
  }
  filteredAttributes?:  {attribute_name: string, name: string, values: any[]}[]
  currentCategorySelected?: {name?: string, id: string, _id: string }
  currentCategoryRoot?: {name?: string, id: string, _id: string, sub_menu: [] }
  expandFilterItems_sectionIds?: string[]
  filterItem_sections_data?: { category_id: string, filterItem_sections: any[] }
  cb?: any
  brandsForCategory:  {id: string, brands: []}[],
  selectedCatSections?: SelectedCatSectionType
  currentNestedSubCategory?: LastSelectedCategoryProps;
  ui_filterItems?: any[]
  ui_category_info?: UI_CATEGORY_INFO_TYPE[]
  ui_categories?: any[]
  filters?: any
  removeAllFilteredValue?: any
  queryObject?: object
}


interface filterAttribute_From_cat_tree {
  id: string,
  renderProductAtt: string[],
  filter_items: {}[]
}

interface FilterAbleAttrProps {
  id?: string
  filter_items?: { attribute_name: string, name: string, values: any[]}[]
}

interface filterAttribute_From_ParentCatProps extends FilterAbleAttrProps{
  renderProductAtt?: string[],
}

let excludeArr = null

const FilterSidebar = (props: FilterSidebarProps) => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { 
    category,
    filteredAttributes,  // we got it from category collection in database...
    currentCategorySelected, 
    currentCategoryRoot,
    currentNestedSubCategory,
    selectedCatSections,
    expandFilterItems_sectionIds,
    filterItem_sections_data,
    brandsForCategory,
    filters,
    ui_category_info,
    ui_categories,
    cb
  } = props
  

  
  /**
  * if you store it on local state then lost expand filter sections.
  * */
  const [toggleShowMoreFilterItems, setToggleShowMoreFilterItems] = React.useState<{}>({})
  const [isCollapseIds, setCollapseIds] = useState(["brands"])
  
  const [filterItem_currentCategory, setFilterItem_currentCategory ] = React.useState<{
    attribute_name?:string,
    name?: string
    values?: any[]
    expand?: boolean
  }[]>([])
  
  
  useEffect(()=>{
    
    /**
     * this condition won't be change state if switch page unless page reload or change category
     *  */
    
    let defaultExpand = []
  
    // console.log(filterItem_sections_data, currentNestedSubCategory)
  
    // console.log(currentNestedSubCategory.id, filterItem_sections_data.category_id)
  
    // console.log(filterItem_sections_data)

    if(filterItem_sections_data && currentNestedSubCategory.id) {
      

      // collect filter items from root category............
      let firstLevelUICategoryFilterItems = [];
      if(selectedCatSections && selectedCatSections.oneLevel) {
        let findFirstLevelUICategory = props.ui_category_info && props.ui_category_info.find(c => c.id === selectedCatSections.oneLevel.id)

        if (findFirstLevelUICategory && findFirstLevelUICategory.filter_items) {
          if (findFirstLevelUICategory.default_expand) {
            defaultExpand = [...findFirstLevelUICategory.default_expand]
          }
          // product attribute filter items section that given root or first level category..........
          firstLevelUICategoryFilterItems = getFilterItems(props.ui_filterItems, [...findFirstLevelUICategory.filter_items])
        }
      }

      excludeArr = null
      // collect filter items from last selected categories
      let childCategoryFilterItems = []
      if(currentNestedSubCategory) {
        let findChildCategory = props.ui_category_info && props.ui_category_info.find(c => c.id === currentNestedSubCategory.id)
        if (findChildCategory && findChildCategory.filter_items) {
          childCategoryFilterItems = getFilterItems(props.ui_filterItems, [...findChildCategory.filter_items])
          excludeArr = findChildCategory.filter_items_exclude
          if (findChildCategory.default_expand) {
            defaultExpand = [...defaultExpand, ...findChildCategory.default_expand]
          }
        }
      }

      if (firstLevelUICategoryFilterItems && firstLevelUICategoryFilterItems.length > 0) {
        if (excludeArr && excludeArr.length > 0) {
          excludeArr.forEach(exItem => {
            let m = firstLevelUICategoryFilterItems.findIndex(aa => aa.attribute_name === exItem)
            if (m !== -1) {
              firstLevelUICategoryFilterItems.splice(m, 1)
            }
          })
        }
  
        firstLevelUICategoryFilterItems.push(...childCategoryFilterItems)

      } else {
        if (childCategoryFilterItems && childCategoryFilterItems.length > 0) {
          firstLevelUICategoryFilterItems = childCategoryFilterItems
        }
      }


      // initial expand filter Items
      firstLevelUICategoryFilterItems.forEach(item=>{
        let i = defaultExpand.indexOf(item.attribute_name);
        if(i !== -1){
          firstLevelUICategoryFilterItems[i] = {
            ...firstLevelUICategoryFilterItems[i],
            expand: true
          }
        }
      })

        /** We need ...
        * 1. compare both parent category filter attributes section and child category filter attributes section
        * 2. if exits child and parent category same filter section then overwrite to parent category
        *   filter item section.
        * */

        if(firstLevelUICategoryFilterItems){

        let unique = []
          for (let i = 0; i < firstLevelUICategoryFilterItems.length; i++) {
            const el = firstLevelUICategoryFilterItems[i];
            let ii = unique.findIndex(u=>u.attribute_name === el.attribute_name)
            if(ii !== -1){
              unique.push(el)
            }
          }
          console.log(unique);
        }
        

        dispatch({
          type: "SET_FILTER_ITEM_SECTIONS",
          payload: {category_id: currentNestedSubCategory.id, filterItem_sections: firstLevelUICategoryFilterItems}
        })
      // console.log(firstLevelUICategoryFilterItems)
      
      // make uniq list............ 

      
    }
  } ,[currentNestedSubCategory])
  let n = []
  function findReCur(items, cat_tree){
    for (let i = 0; i < items.length; i++) {
      if(items[i].sub_menu && items[i].sub_menu.length > 0){
        findReCur(items[i].sub_menu, cat_tree)
      } else {
        if(items[i].id === cat_tree){
          n.push(items[i].id)
        }
        console.log("end..........")
      }
    }
  }
  
  useEffect(()=>{
  
    (async function(){
      
      let { cat, cat_tree, brand } = qstring.parse(location.search)
      // find cat_tree all parent category
  
      let cIndex = ui_categories.findIndex(c=>c.id === cat )
      
      
      // if(cIndex !== -1) {
      //   findReCur(ui_categories[cIndex].sub_menu, cat_tree)
      //   console.log(n)
      // }
  
      // let ids = []
      // let names  = Object.keys(selectedCatSections)
      // names.forEach(name=>{
      //   if(selectedCatSections[name]) {
      //     ids.push(selectedCatSections[name].id)
      //   }
      // })
      
      // console.log(selectedCatSections)
      
      
      // let categoryInfoRes = await apis.post(`/api/ui-data/category-info`, {ids})
  
      // if(categoryInfoRes.status === 200){
      //
      //   let filter_items = []
      //   let i = []
      //   categoryInfoRes.data.category_info.forEach( (ci, index) => {
      //     (async function (){
      //       let filterItemsRes = await apis.post("/api/ui-data/filter-items", {attributeNames: ci.filter_items})
      //       if (filterItemsRes.status === 200) {
      //         ci.filter_items.forEach(item => {
      //           filterItemsRes.data.forEach(fItem => {
      //             if (item === fItem.attribute_name) {
      //               if(i.findIndex(item=> (item.attribute_name === fItem.attribute_name)) === -1){
      //                 i.push(fItem)
      //               }
      //             }
      //           })
      //         })
      //
      //         filter_items.push({
      //           ...ci,
      //           filter_items_populated: i
      //         })
      //       }
      //       if(categoryInfoRes.data.category_info.length === (index + 1)){
      //         dispatch({
      //           type: ACTION_TYPES.SET_UI_CATEGORY_INFO,
      //           payload: filter_items
      //         })
      //         // let uu = []
      //         // i.forEach(item=> uu )
      //         dispatch({
      //           type: ACTION_TYPES.SET_UI_FILTER_ITEM,
      //           payload: i
      //         })
      //       }
      //
      //     }())
      //
      //   })
      // }
      
    }())
    
  
    // setFilterItem_currentCategory({})
  }, [selectedCatSections])
  
  nonInitialEffect(()=>{
    let ids = []
    let names  = Object.keys(selectedCatSections)
    names.forEach(name=>{
      if(selectedCatSections[name]) {
        ids.push(selectedCatSections[name].id)
      }
    })
    let renderAttributesFilterSection = []
    let a = ui_category_info.filter(category_info=> ids.indexOf(category_info.id) !== -1 )
    a.forEach(item=>{
      item.filter_items_populated.forEach((po: any)=>{
        if(renderAttributesFilterSection.findIndex(rafs=>rafs.attribute_name === po.attribute_name) === -1){
          renderAttributesFilterSection.push(po)
        }
      })
      // console.log(item)
      // if(renderAttributesFilterSection.findIndex(re=>re.attribute_name === item.attribute_name) === -1){
      // renderAttributesFilterSection.push(...item.filter_items_populated)
      // }
    })
  
    setFilterItem_currentCategory(renderAttributesFilterSection)
  }, [ui_category_info])
  
  function toggleShowMoreFilterItems_Handler(filterItemId: { attribute_name: string, values: any[] }){
    setToggleShowMoreFilterItems({[filterItemId.attribute_name]: filterItemId.values.length })
  }
  
  /**
  * redux state change when toggle filter section...
  * */
  function toggleFilterItem_SectionHandler(attributeName: string){
  
    let updatedFilterItem_sections =  [...filterItem_sections_data.filterItem_sections]
    let clickMenuIndex = updatedFilterItem_sections.findIndex(fItem=>fItem.attribute_name === attributeName)
    if(clickMenuIndex !== -1){
      updatedFilterItem_sections[clickMenuIndex] = {
        ...updatedFilterItem_sections[clickMenuIndex],
        expand: !updatedFilterItem_sections[clickMenuIndex].expand
      }
    }
    
    dispatch({
      type: "SET_FILTER_SECTION_TOGGLE_EXPAND",
      payload: updatedFilterItem_sections
    })
    
    // console.log(updatedFilterItem_sections)
    
    // let updateCollapseIds = [...expandFilterItems_sectionIds]
    // let isExits = -1
    // for (let i = 0; i < updateCollapseIds.length; i++) {
    //   if(updateCollapseIds[i] === attributeName){
    //     isExits = i
    //     break;
    //   }
    // }
    // if (isExits !== -1){
    //   updateCollapseIds.splice(isExits, 1)
    // } else {
    //   updateCollapseIds.push(attributeName)
    // }
    // dispatch({
    //   type: "SET_FILTER_SECTION_TOGGLE_ATTRIBUTE_NAME",
    //   payload: updateCollapseIds
    // })
  }
  
  function toggleFilterItem_SectionHandler_For_LocalState(attributeName){
    let updateCollapseIds = [...isCollapseIds]
    let isExits = -1
    for (let i = 0; i < updateCollapseIds.length; i++) {
      if(updateCollapseIds[i] === attributeName){
        isExits = i
        break;
      }
    }
    if (isExits !== -1){
      updateCollapseIds.splice(isExits, 1)
    } else {
      updateCollapseIds.push(attributeName)
    }
    setCollapseIds(updateCollapseIds)
  }
  
  
  function handleChange(p: { attribute_name: string, name: string, value: any}) {
    let updatedFilteredAttributes = [...filteredAttributes]
    
    let alreadyFiltered = updatedFilteredAttributes.findIndex(attr=> attr.attribute_name === p.attribute_name)
    // if this section already chosen
  
    if(alreadyFiltered !== -1){
      let findAttrObj = updatedFilteredAttributes[alreadyFiltered]
      let existAttrValue = findAttrObj.values.findIndex(attrVal=> attrVal.name === p.name )
      if(existAttrValue !== -1) {
        // remove values of item if already clicked
        findAttrObj.values.splice(existAttrValue, 1)
      } else{
        findAttrObj.values.push({name: p.name, value: p.value})
      }

    // if click any product filter section that not already clicked
    } else {
      updatedFilteredAttributes = [
        ...updatedFilteredAttributes,
        {
          attribute_name: p.attribute_name,
          name: p.name,
          values: [{value: p.value, name: p.name}]
        }
      ]
    }
    console.log(updatedFilteredAttributes)
    // update global state
    dispatch({
      type: ACTION_TYPES.SET_filtered_Attributes,
      payload: updatedFilteredAttributes
    })
  }

  function handleChangeBrand(brand) {
    let updatedBrands = [...filters.brands]
    let selectedBrandIndex = updatedBrands.findIndex(br=>br._id ===brand._id)
    if(selectedBrandIndex !== -1){
      updatedBrands.splice(selectedBrandIndex, 1)
    } else{
      updatedBrands.push(brand)
    }
    
    // update global state
    dispatch({
      type: ACTION_TYPES.ADD_FILTER,
      payload: { brands: updatedBrands }
    })
  }
              
  function removeFilteredAttr(attribute_name, name, _id){
    if(_id){ // if exist _id that  is brand 
      let updatedBrands = [...filters.brands]
      let selectedBrandIndex = updatedBrands.findIndex(br=>br._id === _id) 
      if(selectedBrandIndex !== -1){
        updatedBrands.splice(selectedBrandIndex, 1)
      }
      // update global state
      dispatch({
        type: ACTION_TYPES.ADD_FILTER,
        payload: { brands: updatedBrands }
      })
    } else {
      
    let updatedFilteredAttributes = [...filteredAttributes]
      const findRemoveItemAttrIndex = updatedFilteredAttributes.findIndex(attr=> attr.attribute_name === attribute_name ) 
      if(findRemoveItemAttrIndex !== -1){
        const removeAttrValIndex = updatedFilteredAttributes[findRemoveItemAttrIndex].values.findIndex(attrVal=>attrVal.name === name)
        if(removeAttrValIndex !== -1){
          updatedFilteredAttributes[findRemoveItemAttrIndex].values.splice(
            updatedFilteredAttributes[findRemoveItemAttrIndex].values[removeAttrValIndex],
            1
          )
        }
      }
      // setFilteredAttributes(updatedFilteredAttributes)
      // update global state
       dispatch({
        type: ACTION_TYPES.SET_filtered_Attributes,
        payload: updatedFilteredAttributes
      })
    }
  }
  
  
  
  
  /**
  *
  * */
  function calculateChecked(attribute_name, name, section=false){
    //  if( typeof section === "string" && section === "brand"){
    //     let selectedBrandIndex = category && category.brands && category.brands.findIndex(br=>br._id === attribute_name)
    //     return selectedBrandIndex !== -1;
    //  }
    // let updatedFilteredAttributes = [...filteredAttributes]
    //   const findRemoveItemAttrIndex = updatedFilteredAttributes.findIndex(attr=> attr.attribute_name === attribute_name )
    //   if(findRemoveItemAttrIndex !== -1){
    //     const removeAttrValIndex = updatedFilteredAttributes[findRemoveItemAttrIndex].values.findIndex(attrVal=>attrVal.name === name)
    //     return removeAttrValIndex !== -1;
    //   }
      
   }
   
   
  /**
  * Filter Items Section these get from category.json file.
  */
  
  function renderFilterSection(){
  
    // filteredAttributes: [
    //   { attribute_name: "", values: [{name: "", value: ""}]}
    // ],
    // console.log(filteredAttributes)
  
    
    
    function isChecked(attributeName, valueLabel){
      if(filteredAttributes && filteredAttributes.length >  0){
        let i = filteredAttributes.findIndex(f=>f.attribute_name === attributeName)
        
        if(i !== -1){
          return filteredAttributes[i].values.findIndex(v => v.name === valueLabel) !== -1;
        }
        return  false
        
      } else {
        return false
      }
    }
    
    // console.log(isChecked("customer_rate", "3★ & above"))
    
    return filterItem_sections_data && filterItem_sections_data.filterItem_sections &&  filterItem_sections_data.filterItem_sections.length > 0 && filterItem_sections_data.filterItem_sections.map(filter_item=>(
       filter_item.values && filter_item.values.length > 0 && <div className="filter_section--each_section">
         <div onClick={()=>toggleFilterItem_SectionHandler(filter_item.attribute_name)}  className="filter_section--header"  >
          <h4  className="filter_section__title">{filter_item.name.toUpperCase()}</h4>
          <div className="collapse_icon">
            <i
              onClick={()=>toggleFilterItem_SectionHandler(filter_item.attribute_name)}
              className={["fa", filter_item.expand ? "fa-chevron-up" : "fa-chevron-down"].join(" ")} />
          </div>
        </div>
         
         <div className={["ml-2 mt-3", filter_item.expand ? "show" : "hide"].join(" ")} >
          { filter_item.values && filter_item.values.slice(0, toggleShowMoreFilterItems[filter_item.attribute_name] ? toggleShowMoreFilterItems[filter_item.attribute_name] : 5).map(item=>(
            <div className="input_item">
              <input
                disabled={item.not_available}
                  onChange={(e)=>handleChange({
                  attribute_name: filter_item.attribute_name,
                  value: item.value,
                  name: item.name
                })}
                type="checkbox"
                checked={isChecked(filter_item.attribute_name, item.name)}
                name={item._id}
                id={item.name}
              />
              <label className={item.not_available ? "disabled": ""} htmlFor={item.name}>{item.name}</label>
            </div>
          ))
          }
           { filter_item.values.length >= toggleShowMoreFilterItems[filter_item.attribute_name] ? ""
             : (
               filter_item.values.length > 6 && <Button
                 type="text"
                 className="pl-1 ml-0"
                 onClick={() => toggleShowMoreFilterItems_Handler(filter_item)}>More
                 <span className="ml-2">{filter_item.name[0].toUpperCase() + filter_item.name.slice(1, filter_item.name.length).toLowerCase() }</span>
              </Button>
            )
           }
        </div>
       </div>
    ))
  }
  
  
  
  
  
  /**
   * Product Filter attributes that store in category info json file .
   */
  
  function renderFilterAttributes(){
    
    // filteredAttributes: [
    //   { attribute_name: "", values: [{name: "", value: ""}]}
    // ],
    // console.log(filteredAttributes)
  
    function toggleFilterAttribute(attribute_name: string){
      let updatedFilterItem_currentCategory = [...filterItem_currentCategory]
      let findIndex = updatedFilterItem_currentCategory.findIndex(i=>i.attribute_name === attribute_name)
      if(findIndex !== -1){
        updatedFilterItem_currentCategory[findIndex].expand =  !updatedFilterItem_currentCategory[findIndex].expand
      }
      setFilterItem_currentCategory(updatedFilterItem_currentCategory)
    }
  
    function isChecked(attributeName, valueLabel){
      if(filteredAttributes && filteredAttributes.length >  0){
        let hasEachAttributeIndex = filteredAttributes.findIndex(f=>f.attribute_name === attributeName)
       
        if(hasEachAttributeIndex !== -1){
          return filteredAttributes[hasEachAttributeIndex].values.findIndex(v => v.name === valueLabel) !== -1;
        }
        return  false

      } else {
        return false
      }
    }
  
    return (
      <div>
        { filterItem_currentCategory.map((filterItem:  any)=>  (
          <div className="filter_section--each_section">
              <div
                onClick={() => toggleFilterAttribute(filterItem.attribute_name)}
                className="filter_section--header">
                <h4 className="filter_section__title">{filterItem.name.toUpperCase()}</h4>
                <div className="collapse_icon">
                  <i
                    onClick={() => toggleFilterAttribute(filterItem.attribute_name)}
                    className={["fa", filterItem.expand ? "fa-chevron-up" : "fa-chevron-down"].join(" ")}/>
                </div>
              </div>
      
              <div className={["ml-2 mt-3", filterItem.expand ? "show" : "hide"].join(" ")}>
                { filterItem.values && filterItem.values.slice(0, toggleShowMoreFilterItems[filterItem.attribute_name] ? toggleShowMoreFilterItems[filterItem.attribute_name] : 5).map(item=>(
                   <div className="input_item">
                     <input
                       disabled={item.not_available}
                       onChange={(e)=>handleChange({
                         attribute_name: filterItem.attribute_name,
                         value: item.value,
                         name: item.name
                       })}
                       type="checkbox"
                       checked={isChecked(filterItem.attribute_name, item.name)}
                       name={item._id}
                       id={item.name}
                     />
                     <label className={item.not_available ? "disabled": ""} htmlFor={item.name}>{item.name}</label>
                   </div>
                 ))
                 }
                { filterItem.values.length >= toggleShowMoreFilterItems[filterItem.attribute_name] ? ""
                     : (
                    filterItem.values.length > 6 && <Button
                  	type="text"
                  	className="pl-1 ml-0"
                  	onClick={() => toggleShowMoreFilterItems_Handler(filterItem)}>More
                  	<span className="ml-2">{filterItem.name[0].toUpperCase() + filterItem.name.slice(1, filterItem.name.length).toLowerCase() }</span>
                  </Button>
                     )
                   }
              </div>
    
            </div>
          
          ))}
        
        {/*{ ui_category_info.map(category_info=> {
          
            return category_info.filter_items_populated && (
              <div>
                {category_info.filter_items_populated.map((item: any) => (
                  <div className="filter_section--each_section">
                    <div
                      onClick={() => toggleFilterAttribute(item.attribute_name)}
                      justify="between" align="center" className="filter_section--header">
                      <h4 className="filter_section__title">{item.name.toUpperCase()}</h4>
                      <div className="collapse_icon">
                        <i
                          onClick={() => toggleFilterAttribute(item.attribute_name)}
                          className={["fa", item.expand ? "fa-chevron-up" : "fa-chevron-down"].join(" ")}/>
                      </div>
                    </div>
            
                    <div className={["ml-2 mt-3", item.expand ? "show" : "hide"].join(" ")}>
            
                    </div>
          
                  </div>
                ))}
              </div>
            )
          }
        ) }*/}
      
      </div>
    )
    
    
    // function isChecked(attributeName, valueLabel){
    //   if(filteredAttributes && filteredAttributes.length >  0){
    //     let i = filteredAttributes.findIndex(f=>f.attribute_name === attributeName)
    //
    //     if(i !== -1){
    //       return filteredAttributes[i].values.findIndex(v => v.name === valueLabel) !== -1;
    //     }
    //     return  false
    //
    //   } else {
    //     return false
    //   }
    // }
    
    // console.log(isChecked("customer_rate", "3★ & above"))
    
    // return filterItem_sections_data && filterItem_sections_data.filterItem_sections &&  filterItem_sections_data.filterItem_sections.length > 0 && filterItem_sections_data.filterItem_sections.map(filter_item=>(
    //   filter_item.values && filter_item.values.length > 0 && <div className="filter_section--each_section">
		// 		<div onClick={()=>toggleFilterItem_SectionHandler(filter_item.attribute_name)} justify="between" align="center" className="filter_section--header"  >
		// 			<h4  className="filter_section__title">{filter_item.name.toUpperCase()}</h4>
		// 			<div className="collapse_icon">
		// 				<i
		// 					onClick={()=>toggleFilterItem_SectionHandler(filter_item.attribute_name)}
		// 					className={["fa", filter_item.expand ? "fa-chevron-up" : "fa-chevron-down"].join(" ")} />
		// 			</div>
		// 		</div>
		//
		// 		<div className={["ml-2 mt-3", filter_item.expand ? "show" : "hide"].join(" ")} >
    //       { filter_item.values && filter_item.values.slice(0, toggleShowMoreFilterItems[filter_item.attribute_name] ? toggleShowMoreFilterItems[filter_item.attribute_name] : 5).map(item=>(
    //         <div className="input_item">
    //           <input
    //             disabled={item.not_available}
    //             onChange={(e)=>handleChange({
    //               attribute_name: filter_item.attribute_name,
    //               value: item.value,
    //               name: item.name
    //             })}
    //             type="checkbox"
    //             checked={isChecked(filter_item.attribute_name, item.name)}
    //             name={item._id}
    //             id={item.name}
    //           />
    //           <label className={item.not_available ? "disabled": ""} htmlFor={item.name}>{item.name}</label>
    //         </div>
    //       ))
    //       }
    //       { filter_item.values.length >= toggleShowMoreFilterItems[filter_item.attribute_name] ? ""
    //         : (
    //           filter_item.values.length > 6 && <Button
		// 						type="text"
		// 						className="pl-1 ml-0"
		// 						onClick={() => toggleShowMoreFilterItems_Handler(filter_item)}>More
		// 						<span className="ml-2">{filter_item.name[0].toUpperCase() + filter_item.name.slice(1, filter_item.name.length).toLowerCase() }</span>
		// 					</Button>
    //         )
    //       }
		// 		</div>
		// 	</div>
    // ))
  }
  
  
  
  
  
  
  
  
  
  /**
  * Filter Items Section only for Brand
  */
  
  function handleEnterButton(brand){
    handleChangeBrand(brand)
  }
  
  
  function renderBrandFilterSection(){
    
    function isChecked(brand_id: string){
      if(filters.brands){
        let selectedBrandIndex = filters.brands.findIndex(b=>b._id === brand_id)
        return selectedBrandIndex !== -1;
      }
      return false
    }
  
    let findBrands = brandsForCategory.find(bc=>bc.id === currentNestedSubCategory.id)
    if(findBrands) {
      return findBrands.brands && findBrands.brands.length > 0 && (
        <div className="filter_section">
          <div className="filter_section--each_section">
            <div onClick={() => toggleFilterItem_SectionHandler_For_LocalState("brands")}
                  className="filter_section--header">
              <h4 className="filter_section__title">{"Brands".toUpperCase()}</h4>
              <div className="collapse_icon">
                <i
                  className={["fa", isCollapseIds.indexOf("brands") === -1 ? "fa-chevron-right" : "fa-chevron-down"].join(" ")}/>
              </div>
            </div>
        
            <div
              className={["ml-2 mt-3", isCollapseIds.indexOf("brands") === -1 ? "hide" : "show"].join(" ")}>
          
              <div className="brand_search_input_row">
                <div className="div">
                  <Input.Menu
                    placeholder="Search brands..."
                    addonAfter={<i className="far fa-search"/>}
                    dropdownMenu={findBrands.brands ? findBrands.brands : []}
                    handleEnterButton={handleEnterButton}
                    // suffix={<i className="fa fa-search"/>}
                    // prefix={<i className="fa fa-search"/>}
                    // addonBefore={<i className="fal fa-search"/>}
                  />
            
                </div>
              </div>
          
              {findBrands.brands && findBrands.brands.slice(0, toggleShowMoreFilterItems["brands"] ? toggleShowMoreFilterItems["brands"] : 5).map((brand: any) => (
                <div className="input_item">
                  <input
                    onChange={(e) => handleChangeBrand(brand)}
                    type="checkbox"
                    checked={isChecked(brand._id)}
                    name={brand._id}
                    id={brand.name}
                  />
                  <label className={brand.not_available ? "disabled" : ""} htmlFor={brand.name}>{brand.name}</label>
                </div>
              ))
              }
              {findBrands.brands.length >= toggleShowMoreFilterItems["brands"] ? ""
                : (
                  findBrands.brands.length > 6 && <Button
										type="text"
										className="pl-1 ml-0"
										onClick={() => toggleShowMoreFilterItems_Handler({
                      attribute_name: "brands",
                      values: findBrands.brands ? [...findBrands.brands] : []
                    })}>More
										<span className="ml-2">Brands</span>
									</Button>
                )
              }
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h4>No dsf</h4>
        </div>
      )
    }
  }
  
  function removeAllFilteredAttr(){
    let updatedFilters = {...filters}
    updatedFilters.brands = []
    props.removeAllFilteredValue && props.removeAllFilteredValue({
      filteredAttributes: [],
      filters: updatedFilters
    })
    // dispatch({
    //   type: "REMOVE_ALL_FILTER_VALUE",
    //   payload: {
    //     filteredAttributes: [],
    //     filters: updatedFilters
    //   }
    // })
    
  }
  
  function selectedFilterItems(){
    return (
      <div className="filter_section">
        <div className="filter_section--each_section filter_section__selected_values">
          <div className="flex justify-between items-center filter_section--header"  >
            <h4 className="filter_section__title">Filter</h4>
            <button onClick={removeAllFilteredAttr} className={
              [
                "filter_section__title clear-btn",
                filters.brands && filters.brands.length < 1 && filteredAttributes.length < 1 ? "disabled" : ""
              ].join(" ")}>Clear All</button>
          </div>
          <div className={["ml-2 mt-3 show selected_filter--list"].join(" ")} >
            { filteredAttributes.map(attr=>{
              return attr.values.map(value=>(
                <div className="__item">
                  <span className="selected_filter">{value.name}</span>
                  <i onClick={()=>removeFilteredAttr(
                    attr.attribute_name,
                    value.name,
                    undefined
                  )} className="fa fa-times"/>
                </div>
              ))
            }) }
          </div>
      
          <div className={["ml-2 show selected_filter--list"].join(" ")} >
            { filters.brands && filters.brands.length > 0 && filters.brands.map(brand=>(
              <div className="__item">
                <span className="selected_filter">{brand.name}</span>
                <i onClick={()=>removeFilteredAttr(
                  "",
                  "",
                  brand._id
                )} className="fa fa-times"/>
              </div>
            ))}
      
          </div>
        </div>
      </div>
    )
  }
  
  return (
      <div className="product_sidebar">

        {/*
          selected all filter attributes like selected brands, product attributes
          pass this render-able jsx via callback in parent component
        */}
        {cb(selectedFilterItems())}
        
        
        {renderBrandFilterSection()}

        
        {/****** Filter Item From Database Category */}
          {/*<div className="filter_section">
            { category  &&
              category.filters && category.filters.map(fields=>(
              <div className="filter_section--each_section">
                <div onClick={()=>toggleFilterItem_SectionHandler(fields.name)} justify="space-between" align="center" className="filter_section--header"  >
                  <h4  className="filter_section__title">{fields.name.toUpperCase()}</h4>
                  <div className="collapse_icon">
                    <i
                      onClick={()=>toggleFilterItem_SectionHandler(fields.name)}
                      className={["fa", isCollapseIds.indexOf(fields.name) === -1 ? "fa-chevron-right" : "fa-chevron-down"].join(" ")} />
                  </div>
                </div>
                <div className={["ml-4 mt-3", isCollapseIds.indexOf(fields.name) === -1 ? "hide" : "show"].join(" ")} >
                  { fields.values.map(value=>(
                      <div className="input_item">
                        <input
                          onChange={(e)=>handleChange({
                            attribute_name: fields.attribute_name,
                            value: value.value,
                            name: value.name
                          })}
                          checked={calculateChecked(fields.attribute_name, value.name)}
                          type="checkbox"
                          name={value.name}
                          id={value.name}
                        />
                        <label htmlFor={value.name}>{value.name}</label>
                      </div>
                    ))
                  }
                </div>
              </div>
            )) }
          </div>*/}
        
          {/* Filter Item From Patent Category using inheritance */}
          <div className="filter_section">
            {renderFilterSection()}
            {renderFilterAttributes()}
          </div>
        </div>
    )
}



function mapStateToProps(state){
  return {
    filteredAttributes: state.productState.filteredAttributes,
    filters: state.productState.filters,
    brandsForCategory: state.productState.brandsForCategory,
    ui_category_info: state.productState.ui_category_info,
    ui_categories: state.productState.ui_categories,
    category: state.productState.category ? state.productState.category : { brands: [] },
    expandFilterItems_sectionIds: state.productState.expandFilterItems_sectionIds,
    filterItem_sections_data: state.productState.filterItem_sections_data,
    ui_filterItems: state.appState.ui_filterItems,
    selectedCatSections: state.productState.selectedCatSections
  }
}

export default connect(mapStateToProps, {
  fetchBrandForCategory,
  removeAllFilteredValue
})(FilterSidebar)
