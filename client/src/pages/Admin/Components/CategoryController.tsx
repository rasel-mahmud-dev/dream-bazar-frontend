import React from "react"
import {Button, Input, Select} from "components/UI"


const CategoryController = (props) =>{
 
 //
 //  // const [products, setProducts] = React.useState([])
 //  const [categories, setCategories] = React.useState<any>([])
 //  const [filterItems, setfilterItems] = React.useState([])
 // //const [brands, setBrands] = React.useState([])
 //  const [isShowForm, setShowForm] = React.useState("")
 //
 //  const [categoryCount, setCategoryCount] = React.useState<number>(0)
 //  const [categoryData, setCategoryData] = React.useState({})
 //  const [storeSelectedFilters, setStoreSelectedFilters] = React.useState<{name: string, value: string}>([])
 //  const [updateCategoryCopy, setUpdateCategoryCopy] = React.useState<any>({})
 //
 //  const filterItem_selectRef = React.useRef<HTMLSelectElement>(null)
 //
 //
 //  React.useEffect(()=>{
 //
 //    (async function (){
 //      const { data } = await api.get("/api/categories/count")
 //      setCategoryCount(data.count)
 //
 //
 //      const ddd = await api.get("/api/categories")
 //      setCategories(ddd.data.categories)
 //
 //
 //      const dd = await api.get("/api/filter_items")
 //      setfilterItems(dd.data.filter_items)
 //      // console.log(dd.data.filter_items)
 //    }())
 //
 //
 //  }, [])
 //
 //  function handleChange(e){
 //    if(e.target.name === "filters"){
 //      const childs = e.target.children
 //
 //      let storeSelected: any = []
 //      for(let i=0; i<childs.length; i++){
 //        if(childs[i].selected){
 //          storeSelected.push({
 //            name: childs[i].innerText,
 //            value: childs[i].value
 //          })
 //        }
 //      }
 //
 //      setStoreSelectedFilters(storeSelected)
 //
 //      // set array of object id inside filters
 //      setCategoryData({
 //        ...categoryData,
 //        [e.target.name]: storeSelected.map(p=> p.value)
 //      })
 //
 //    } else if(e.target.name === "last_level"){
 //      setCategoryData({
 //        ...categoryData,
 //        [e.target.name]: e.target.checked
 //      })
 //
 //    } else{
 //      setCategoryData({
 //        ...categoryData,
 //        [e.target.name]: e.target.value
 //      })
 //    }
 //  }
 //
 //  async function handleSave(){
 //     if(isShowForm === "new"){
 //      const { data } = await api.post("/api/categories", { ...categoryData })
 //      setCategories([...categories, data.categories[0]])
 //     } else{
 //        const { data } = await api.put(`/api/categories/${updateCategoryCopy._id}`, { ...categoryData })
 //        let oldCategories: any  = [...categories]
 //        let index = oldCategories.findIndex(p=>p._id === updateCategoryCopy._id )
 //        oldCategories[index] = data.category
 //        setCategories(oldCategories)
 //        // setCategories([...categories, data.categories[0]])
 //     }
 //     setShowForm("")
 //  }
 //
 //
 //  const d =  [
 //    {name: "name", label: "Category Name", type: "input", required:true},
 //    {
 //      name: "last_level",
 //      label: "IS Last Level",
 //      type: "checkbox",
 //      required: false
 //    },
 //    {
 //      name: "parent_id",
 //      label: "Select a parent Category",
 //      require: true,
 //      type: "select",
 //      values: categories,
 //      valueKey: { name: "name", id: "_id"}
 //    },
 //    {
 //      name: "filters",
 //      label: "Select filters items",
 //      require: false,
 //      type: "multi-select",
 //      values: filterItems,
 //      valueKey: { name: "name", id: "_id"}
 //    }
 //  ]
 //
 //  function categoryFetchForUpdate(category){
 //    setShowForm("update");
 //    let updatedCategoryData = {...categoryData}
 //    for(let i=0; i<d.length; i++){
 //      if(category[d[i].name]){
 //        if(d[i].name === "filters"){
 //          let ids: string[] = []
 //          category[d[i].name] && category[d[i].name].forEach(fil=>{
 //            ids.push(fil._id)
 //          })
 //          updatedCategoryData[d[i].name] = ids
 //        } else{
 //          updatedCategoryData[d[i].name] = category[d[i].name]
 //        }
 //
 //      }
 //    }
 //
 //    let g: any[] = []
 //    category.filters && category.filters.map(filterItem=>{
 //      g.push({name: filterItem.name, value: filterItem.value})
 //    })
 //
 //    setStoreSelectedFilters(g)
 //    setCategoryData(updatedCategoryData)
 //    setUpdateCategoryCopy(category)
 //  }
 //
 //
 //  function addProduct(){
 //    return (
 //      <div>
 //        <h2>{isShowForm === "new" ? "Add New Category" : "Update Category"}</h2>
 //        { d && d.map(pData=>(
 //          <div className="form-control">
 //
 //            { pData.type && pData.type === "select" ? (
 //              <Select
 //                name={pData.name}
 //                label={pData.label}
 //                defaultValue={categoryData[pData.name]}
 //                onChange={handleChange}
 //                >
 //                <option value="">{pData.label}</option>
 //                { pData.values && pData.values.map(item=>
 //                    <option
 //                      value={item[pData.valueKey.id]} >
 //                      {item[pData.valueKey.name]}
 //                    </option>
 //                  )}
 //              </Select>
 //            ) : pData.type && pData.type === "multi-select" ? (
 //            <div>
 //              <div className="selected_values">
 //                  { storeSelectedFilters && storeSelectedFilters.map(item=>(
 //                      <li className="selected_item">{item.name}</li>
 //                     ))
 //                   }
 //              </div>
 //               <Select
 //                ref={filterItem_selectRef}
 //                name={pData.name}
 //                label={pData.label}
 //                multiple={true}
 //                onChange={handleChange}>
 //                {pData.values && pData.values.map(item=>(
 //                  <option value={item[pData.valueKey.id]}>{item[pData.valueKey.name]}</option>
 //                  ))
 //                }
 //              </Select>
 //            </div>
 //            ) : pData.type && pData.type === "checkbox" ? (
 //              <div>
 //                <Input
 //                  label={pData.label}
 //                  id={pData.name}
 //                  name={pData.name}
 //                  type={pData.type}
 //                  checked={categoryData[pData.name]}
 //                  onChange={handleChange}
 //                />
 //              </div>
 //            ) : pData.type && pData.type === "input" &&  (
 //
 //              <Input
 //                label={pData.label}
 //                name={pData.name}
 //                value={categoryData[pData.name]}
 //                onChange={handleChange}
 //              />
 //            )}
 //          </div>
 //        ))}
 //
 //        <Button onClick={handleSave}>{ isShowForm === "new" ? "Save Category" : "Update Category" }</Button>
 //
 //
 //      </div>
 //    )
 //
 //  }
 //
 //
 //  function deleteItem(id){
 //    api.delete(`/api/categories/${id}`).then(response=>{
 //     // alert(JSON.stringify(response.data))
 //      setCategories(categories.filter(p=>p._id !== id))
 //    })
 //  }
 //  return (
 //      <div className="container">
 //
 //      {  isShowForm === "" ? <Button onClick={(e)=> setShowForm("new")}>Add New Category</Button>
 //      : <Button onClick={(e)=> setShowForm("")}>Cancel</Button>
 //      }
 //
 //      { isShowForm !== "" &&  addProduct() }
 //
 //
 //        <h3>Categories fetch {categories.length} of {categoryCount} </h3>
 //        <table>
 //          <thead>
 //              <tr>
 //                <th className="t-start">Logo</th>
 //                <th className="t-start">Name</th>
 //                <th>Added</th>
 //                <th>Last Level</th>
 //                <th>Filer Sections</th>
 //
 //                <th>Action</th>
 //              </tr>
 //          </thead>
 //            <tbody>
 //          { categories.map(cat=>(
 //              <tr>
 //                <td className="">{cat.name}</td>
 //                <td className="">
 //                { cat.logo &&
 //                  <div className="brand_logo">
 //                    <img src={fullLink(cat.logo)}  />
 //                  </div>
 //                }
 //                </td>
 //                <td className="t-center">{new Date(Number(cat.created_at)).toDateString() }</td>
 //                <td className="t-center">{cat.last_level ? "true" : "false"}</td>
 //                <td className="t-center">
 //                  { cat.filters.map(fi=>(
 //                      <span className="block">{fi.name}</span>
 //                    ))
 //                  }
 //                </td>
 //                <td className="t-center d-flex">
 //                  <button onClick={(e)=>categoryFetchForUpdate(cat)}>
 //                    <i className="fal fa-pen"  />
 //                  </button>
 //                  <button onClick={()=>deleteItem(cat._id)}>
 //                    <i  className="fal fa-trash"/>
 //                  </button>
 //                </td>
 //              </tr>
 //          )) }
 //            </tbody>
 //
 //        </table>
 //
 //
 //      </div>
 //    )
  return null
}

export default CategoryController