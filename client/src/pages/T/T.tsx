import React from 'react';
import "./t.scss";

interface ExpandSubMenuProps {
  id: string,
  name: string,
  isExpand: boolean
  sub_menu: {
    id: string,
    _id: string,
    name: string,
    isExpand: boolean
    sub_menu: {
      _id: string,
      id: string,
      name: string,
      isExpand: boolean
    }
  }
}

interface eachCat {
  name: string,
  id: string,
  _id?: string,
  sub_menu?: eachCat[]
}

interface SelectedCatSectionType {
  oneLevel?: eachCat,
  twoLevel?: eachCat,
  threeLevel?: eachCat,
  fourLevel?: eachCat,
  fiveLevel?: eachCat
}

const T = (props) => {

  return "df"
  
  //
  // const categoires = [
  //   {
  //     name: "Footwear",
  //     id: "Footwear",
  //     sub_menu: [
  //       {
  //         name: "Women's Footwear",
  //         id: "Women's Footwear",
  //         sub_menu: [
  //           {"name": "Flats", "id": "", "_id": ""},
  //           {"name": "Heels", "id": "", "_id": ""},
  //           {"name": "Wedges", "id": "", "_id": ""},
  //           {"name": "Sports Shoes", "id": "", "_id": ""},
  //           {"name": "Casual Shoes", "id": "", "_id": ""},
  //           {"name": "Boots", "id": "", "_id": ""},
  //           {"name": "Ballerinas", "id": "", "_id": ""},
  //           {"name": "Ethnic Shoes", "id": "", "_id": ""},
  //           {"name": "Formals", "id": "", "_id": ""},
  //           {"name": "Slippers & Flip Flops", "id": "", "_id": ""},
  //           {"name": "Sports Sandals", "id": "", "_id": ""}
  //         ]
  //       },
  //       {
  //         "name": "Kids' & Infant Footwear",
  //         "id": "kids-infant-footwear",
  //         "sub_menu": [
  //           {
  //             "name": "Boys Footwear",
  //             "id": "boys-footwear",
  //             "_id": "boys-footwear",
  //             "sub_menu": [
  //               {
  //                 "name": "Sandals",
  //                 "id": "sandals",
  //                 "_id": "sandals",
  //                 sub_menu: [
  //                   {name: "Sandals A", "id": "Sandals-A", "_id": "Sandals-A"},
  //                   {name: "Sandals B", "id": "", "_id": ""},
  //                   {name: "Sandals C", "id": "", "_id": ""},
  //                   {name: "Sandals D", "id": "", "_id": ""},
  //                   {name: "Sandals E", "id": "", "_id": ""}
  //                 ]
  //               },
  //               {"name": "Ethnic Shoes", "id": "", "_id": ""},
  //               {"name": "Clogs", "id": "", "_id": ""},
  //               {"name": "Casual Shoes", "id": "", "_id": ""},
  //               {"name": "Sports Shoes", "id": "", "_id": ""},
  //               {"name": "School Shoes", "id": "", "_id": ""},
  //               {"name": "Slippers & Flip Flops", "id": "", "_id": ""}
  //             ]
  //           },
  //           {
  //             "name": "Girls Footwear",
  //             "id": "girls-footwear",
  //             "_id": "girls-footwear",
  //             "sub_menu": [
  //               {"name": "Ethnic Shoes", "id": "", "_id": ""},
  //               {"name": "Sandals", "id": "", "_id": ""},
  //               {"name": "Clogs", "id": "", "_id": ""},
  //               {"name": "Flats & Bellies", "id": "", "_id": ""},
  //               {"name": "Casual Shoes", "id": "", "_id": ""},
  //               {"name": "Sports Shoes", "id": "", "_id": ""},
  //               {"name": "School Shoes", "id": "", "_id": ""},
  //               {"name": "Slippers & Flip Flops", "id": "", "_id": ""}
  //             ]
  //           },
  //           {
  //             "name": "Infants",
  //             "id": "Infants",
  //             "_id": "Infants",
  //             "sub_menu": [
  //               {"name": "Baby Boys Footwear", "id": "", "_id": ""},
  //               {"name": "Baby Girls Footwear", "id": "", "_id": ""},
  //               {"name": "Booties", "id": "", "_id": ""}
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         name: "Men's Footwear",
  //         id: "men-footwear",
  //         "sub_menu": [
  //           {"name": "Casual Shoes", "id": "", "_id": ""},
  //           {"name": "Sports Shoes", "id": "", "_id": ""},
  //           {"name": "Formal Shoes", "id": "", "_id": ""},
  //           {"name": "Sandals & Floaters", "id": "", "_id": ""},
  //           {"name": "Slippers & Flip Flops", "id": "", "_id": ""},
  //           {"name": "Ethnic Shoes", "id": "", "_id": ""},
  //           {"name": "Shoe Care", "id": "", "_id": ""}
  //         ]
  //       }
  //     ]
  //   }
  // ]
  //
  // const [lastSelectedCategory, setLastSelectedCategory] = React.useState<{id: string, _id: string, name: string}>({})
  //
  // const [selectedCatSection, setSelectedCatSection] = React.useState<SelectedCatSectionType>({
  //   oneLevel: null,
  //   twoLevel: null,
  //   threeLevel: null,
  //   fourLevel: null,
  //   fiveLevel: null,
  // })
  //
  //
  // React.useEffect(()=>{
  //   setSelectedCatSection({
  //     ...selectedCatSection,
  //     oneLevel: {
  //       name: categoires[0].name,
  //       id: categoires[0].id,
  //       sub_menu: categoires[0].sub_menu
  //     }
  //   })
  // }, [])
  //
  // function chooseCategoryHandler(forLevel, cat_item, selected_cat=false){
  //   if(selected_cat) {
  //     setLastSelectedCategory({
  //       name: selected_cat.name,
  //       id: selected_cat.id,
  //       _id: ""
  //     })
  //   }
  //
  //   let updatedSelectedCatSection = {...selectedCatSection}
  //   if(forLevel === "twoLevel") {
  //     if (updatedSelectedCatSection[forLevel]) {
  //       updatedSelectedCatSection[forLevel] = null
  //       updatedSelectedCatSection["threeLevel"] = null
  //       updatedSelectedCatSection["fourLevel"] = null
  //       updatedSelectedCatSection["fiveLevel"] = null
  //     } else {
  //       updatedSelectedCatSection[forLevel] = cat_item
  //     }
  //   } else if(forLevel === "threeLevel"){
  //     if (updatedSelectedCatSection[forLevel]) {
  //       updatedSelectedCatSection[forLevel] = null
  //       updatedSelectedCatSection["fourLevel"] = null
  //       updatedSelectedCatSection["fiveLevel"] = null
  //     } else {
  //       updatedSelectedCatSection[forLevel] = cat_item
  //     }
  //   } else if(forLevel === "fourLevel"){
  //     if (updatedSelectedCatSection[forLevel]) {
  //       updatedSelectedCatSection[forLevel] = null
  //       updatedSelectedCatSection["fiveLevel"] = null
  //     } else {
  //       updatedSelectedCatSection[forLevel] = cat_item
  //     }
  //
  //   } else {
  //     if (updatedSelectedCatSection[forLevel]) {
  //       updatedSelectedCatSection[forLevel] = null
  //     } else {
  //       updatedSelectedCatSection[forLevel] = cat_item
  //     }
  //   }
  //   setSelectedCatSection(updatedSelectedCatSection)
  // }
  //
  // console.log(selectedCatSection, lastSelectedCategory)
  //
  //
  // return (
  //   <div>
  //     <h1>MultiCategory Sidebar</h1>
  //     <ul>
  //       {selectedCatSection.oneLevel && (
  //         <>
  //           <h4 className={["menu-item",
  //             lastSelectedCategory
  //             && lastSelectedCategory.id === selectedCatSection.oneLevel.id ? "active-current__cat": "" ].join(" ")}
  //               onClick={()=>chooseCategoryHandler("twoLevel", {}, selectedCatSection.oneLevel)}>
  //             <i className="fa fa-chevron-right" />
  //             <span>{selectedCatSection.oneLevel.name}</span>
  //           </h4>
  //           { !selectedCatSection.twoLevel &&
  //             <div className="two-level-cat">{selectedCatSection.oneLevel.sub_menu.map(sm => (
  //               <li className="menu-item" onClick={() => chooseCategoryHandler("twoLevel", sm, sm)}>
  //                 <i className="fa fa-chevron-right" />
  //                 <span>{sm.name}</span>
  //               </li>
  //             ))}</div>
  //           }
  //         </>
  //       )}
  //
  //       {selectedCatSection.twoLevel && selectedCatSection.twoLevel.name && (
  //         <>
  //           <h4
  //             className={["two-level-cat menu-item",
  //               lastSelectedCategory
  //               && lastSelectedCategory.id === selectedCatSection.twoLevel.id ? "active-current__cat": "" ].join(" ")}
  //               onClick={()=>chooseCategoryHandler("threeLevel", {}, selectedCatSection.twoLevel)}>
  //             {selectedCatSection.twoLevel.name && <i className="fa fa-chevron-right" />}
  //             <span>{selectedCatSection.twoLevel.name}</span>
  //           </h4>
  //           { !selectedCatSection.threeLevel && (
  //             <div className="three-level-cat">
  //               {selectedCatSection.twoLevel.sub_menu && selectedCatSection.twoLevel.sub_menu.map(sm3=>(
  //                 <li className="menu-item" onClick={()=>chooseCategoryHandler("threeLevel", sm3, sm3)}>
  //                   <i className="fa fa-chevron-right" />
  //                   <span>{sm3.name}</span>
  //                 </li>
  //               ))}
  //             </div>
  //           )}
  //         </>
  //       )}
  //
  //
  //       {selectedCatSection.threeLevel && selectedCatSection.threeLevel.name && (
  //         <>
  //           <h4
  //             className={["three-level-cat menu-item",
  //             lastSelectedCategory
  //             && lastSelectedCategory.id === selectedCatSection.threeLevel.id ? "active-current__cat": "" ].join(" ")}
  //             // className={["three-level-cat menu-item",
  //             //   lastSelectedCategory
  //             //   && lastSelectedCategory.id === selectedCatSection.threeLevel.id ? "active-current__cat": "" ].join(" ")}
  //             onClick={()=>chooseCategoryHandler("threeLevel", {}, selectedCatSection.threeLevel)}>
  //             {selectedCatSection.twoLevel.name && <i className="fa fa-chevron-right" />}
  //             <span>{selectedCatSection.threeLevel.name}</span>
  //           </h4>
  //           { !selectedCatSection.fourLevel &&
  //             <div className="four-level-cat">
  //               {selectedCatSection.threeLevel.sub_menu && selectedCatSection.threeLevel.sub_menu.map(sm4=>(
  //                 <li className="menu-item" onClick={()=>chooseCategoryHandler("fourLevel", sm4, sm4)}>
  //                   <i className="fa fa-chevron-right" />
  //                   <span>{sm4.name}</span>
  //                 </li>
  //               ))}
  //             </div>
  //           }
  //         </>
  //       )}
  //
  //       {selectedCatSection.fourLevel && (
  //         <>
  //           <h4
  //             className={["four-level-cat menu-item",
  //               lastSelectedCategory && lastSelectedCategory.id === selectedCatSection.fourLevel.id ? "active-current__cat": "" ].join(" ")}
  //             // className={["three-level-cat menu-item",
  //             //   lastSelectedCategory
  //             //   && lastSelectedCategory.id === selectedCatSection.threeLevel.id ? "active-current__cat": "" ].join(" ")}
  //             onClick={()=>chooseCategoryHandler("fiveLevel", {}, selectedCatSection.fourLevel)}>
  //             {selectedCatSection.twoLevel.name && <i className="fa fa-chevron-right" />}
  //             <span>{selectedCatSection.fourLevel.name}</span>
  //           </h4>
  //           { !selectedCatSection.fiveLevel &&
  //             <div className="five-level-cat">
  //               {selectedCatSection.fourLevel.sub_menu && selectedCatSection.fourLevel.sub_menu.map(sm4=>(
  //                 <li className="menu-item" onClick={()=>chooseCategoryHandler("fiveLevel", sm4, sm4)}>
  //                   <i className="fa fa-chevron-right" />
  //                   <span>{sm4.name}</span>
  //                 </li>
  //               ))}
  //             </div>
  //           }
  //         </>
  //       )}
  //
  //       {selectedCatSection.fiveLevel && (
  //         <>
  //           <h4
  //             className={["five-level-cat menu-item",
  //               lastSelectedCategory && lastSelectedCategory.id === selectedCatSection.fiveLevel.id ? "active-current__cat": "" ].join(" ")}
  //             // className={["three-level-cat menu-item",
  //             //   lastSelectedCategory
  //             //   && lastSelectedCategory.id === selectedCatSection.threeLevel.id ? "active-current__cat": "" ].join(" ")}
  //             >
  //             {selectedCatSection.fiveLevel.name && <i className="fa fa-chevron-right" />}
  //             <span>{selectedCatSection.fiveLevel.name}</span>
  //           </h4>
  //         </>
  //       )}
  //
  //     </ul>
  //     {/*<h1>{lastSelectedCategory && lastSelectedCategory.name}</h1>*/}
  //   </div>
  // );
};


export default T;
