import React from 'react' 
import {Link} from "react-router-dom"
import "./ProductCategoryDropdown.scss"


import {productDropdownNavData } from "src/store"

const ProductCategoryDropdown = (props) => {
    const [isHover, setHover]  = React.useState("")

    return (
        <ul className="category">
            { productDropdownNavData.map(category=>(
                <li className="category_item" onMouseLeave={()=>setHover("-1")} onMouseOver={()=>setHover( category.id)}>
                    <span className="category_item__name">{category.name}</span>
                    <ul className="sub_category_1 sub-category-panel">
                        { isHover === category.id && category.subCategory.map(subCat=>(
                            <li className="sub_category_1_items">
                                <span className="">
                                <Link       
                                    to={`/products/?type=${subCat.type}&id=${subCat.id}&slug=${subCat.name}`}>{subCat.name}</Link>     
                                </span>
                                <ul className="sub_category_2" >{subCat.subCategory.map(subCat2=>(
                                    <li className="sub_category_2_items">
                                        <span>
                                        <Link 
                                           
                                            to={`/products/?type=${subCat2.type}&id=${subCat2.id}&slug=${subCat2.name}`}>{subCat2.name}</Link>
                                        
                                        </span>
                                        <ul className="last-item_ul">{subCat2.items.map(item=>(
                                            <li className="last-item">
                                                <Link 
                                                    to={`/products/?type=${item.type}&id=${item.id}&slug=${item.name}`}>{item.name}</Link>
                                            </li>
                                            ))}
                                        </ul>
                                    </li>
                                    ))}
                                </ul>
                                </li>
                        ))  }
                    </ul>
                </li>
            )) }
        </ul>
    )
}

export default ProductCategoryDropdown
