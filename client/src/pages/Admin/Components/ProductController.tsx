import React from "react"
import { Button, Modal, Select, Input, File, Tabs } from "components/UI"
import api from "src/apis" 
import fullLink from "src/utills/fullLink"

  const { TabPane } = Tabs

  const ProductController = (props) =>{
  
  const [count, setCount] = React.useState()
  const [products, setProducts]  = React.useState<any[]>([])
  const [categories, setCategories] = React.useState([])
  const [brands, setBrands] = React.useState([])
  const [isShowForm, setShowForm] = React.useState("")
  const [staticImages, setStaticImages] = React.useState([]) 
  const [isShowCoverPhotoHandler, setShowCoverPhotoHandler] = React.useState(false)
  
  React.useEffect(()=>{
    (async function (){
      const countRes = await api.get(`/api/products/count`)
      setCount(countRes.data.count)
      const { data } = await api.get("/api/products/?_for=admin")
      setProducts(data.products)
  
      const d = await api.get("/api/categories/?type=lastLevel")
      setCategories(d.data.categories)
  
      const dd = await api.get("/api/brands")
      setBrands(dd.data.brands)
    }())
  }, [])
  
  const [productData, setProductData] = React.useState({})
  const [updatedProductCopy, setUpdateProductCopy] = React.useState<any>({})
  
  function productFetchForUpdate(product){
    setShowForm("update");
    let updatedProductData = {...productData}
    for(let i=0; i<d.length; i++){
      if(product[d[i].name]){
          updatedProductData[d[i].name] = product[d[i].name]
        }
      }
    setProductData(updatedProductData)
    setUpdateProductCopy(product)
  }  

  const d =  [
    {name: "title", type:"input", label: "Product Name", required:true},
    {name: "cover_photo", type: "file", label: "Product Cover Photo", required:true},
    {name: "price", type:"input", label: "Product Unit Price", required:true},
    {name: "qty", type:"input", label: "Product Quantity", require: true},
    {
      name: "category_id", 
      type: "select",
      label: "Select a category", 
      require: true,
      values: categories,
      valueKey: { name: "name", id: "_id"}
    },
    {
      name: "brand_id", 
      type: "select",
      label: "Select a Brand", 
      require: true,
      values: brands,
      valueKey: { name: "name", id: "_id"}
    }
  ]
  
  function handleChange(e){ 
    setProductData({
      ...productData, 
      [e.target.name]: e.target.value 
    })
  }
  
  function deleteItem(id){

    api.delete(`/api/products/${id}`).then(response=>{
      alert(JSON.stringify(response.data)) 
    })
    setProducts(products.filter((p: any)=>p._id !== id))
  }
  
  async function handleSave(){
    
    let oldProducts: any = [...products]
    
    if(isShowForm === "new"){ 
      let g = {
       ...productData,
        sold: 0,
        views: 0
      } 
      let response = await api.post("/api/products", {...g})
      let returnProduct: any = response.data
      setProducts([returnProduct])
    
    } else if(isShowForm === "update"){
      let g: any = {
        ...updatedProductCopy,
        ...productData,
      }
      const {brand, category, _id, ...rest} = g

      let { data } = await api.put(`/api/products/${updatedProductCopy._id}`, {...rest})
      let index = oldProducts.findIndex(p=>p._id === updatedProductCopy._id )
      oldProducts[index] = data.product
      setProducts(oldProducts) 
    }
    
  }
  
  
  
//  load all static files...
function fetchStaticFiles(){
  api.get("/api/static-file").then(response=>{
    setStaticImages(response.data)
  })
}

  // when choose new image form modal inside File Input
  function handleChangeLogo(e){
    if(e.target.type === 'file'){
      setProductData({
        ...productData,
        [e.target.name]: e.target.file,
        fileName: e.target.fileName,
      })

    } else{
      setProductData({
        ...productData,
        [e.target.name]: e.target.value
      })
    }
  }
  
  // render photo handler modal that an image can upload or get cdn link
  function showPhotoHandler(){ 
     // key ===  2 contains all static image files
     function handleTabChange(key){
      // if(key === "2") fetchStaticFiles()
     }
    return <Modal>
          <Tabs defaultActiveKey="1" onChange={handleTabChange}>
            <TabPane tab="Upload a new image" key="1">
              <Input 
                name="logo" 
                label="Logo image cdn link" 
                onChange={handleChangeLogo} 
                />
              <span>or</span>
              <File 
                type="file" 
                name="logo"
                onChange={handleChangeLogo} 
                label="Choose a photo" 
              />
            </TabPane>
            
            <TabPane tab="Images Gallery" key="2">
                <div className="d-flex">
                  {staticImages.map(path=>(
                    <div className="static-image-thumbs" >
                      <img 
                        // onClick={()=>chooseImageFromStatic(path)}
                        src={fullLink(path)} />
                    </div>
                  ))}
                </div>
            </TabPane>
          </Tabs>
          
          {/*<Button onClick={()=>setShowLogoHandler(false)}>Cancel</Button>*/}
          <Button>Save</Button>
        </Modal>
        
  }
  
  
  function addProduct(){
    return (
      <div>
        <h2>{isShowForm === "new" ? "Add New Product" : "Update Product"}</h2>
        { d && d.map((pData: any)=>(
          <div className="">
            { pData.type && pData.type === "select" ? (
              <Select defaultValue={productData[pData.name]} name={pData.name} onChange={handleChange}>
                <option value="">{pData.label}</option>
                { pData.values && pData.values.map(item=> 
                    <option 
                      value={item[pData.valueKey.id]} >
                      {item[pData.valueKey.name]}
                    </option> 
                  )}
              </Select>
            ) : pData.type && pData.type === "file" ? (
              <div>
                <img src={fullLink(pData.cover_photo)} alt={pData.cover_photo} />
                <Button onClick={()=> setShowCoverPhotoHandler(!isShowCoverPhotoHandler) }>
                  Upgrade Cover Photo
                </Button>
                { isShowCoverPhotoHandler && showPhotoHandler()}
              </div>
            ) : (
              <>
            <Input
                label={pData.label}
                name={pData.name} 
                value={productData[pData.name]}  
                onChange={handleChange}
              />
              </>
            )}
          </div>
        ))}
        
        <Button onClick={handleSave}>{ isShowForm === "new" ? "Save Product" : "Update Product" }</Button>
        
      
      </div>
    )
  }
  
  return (
      <div className="container"> 
      
      
      {  isShowForm === "" ? <Button onClick={(e)=> setShowForm("new")}>Add New Product</Button>
      : <Button onClick={(e)=> setShowForm("")}>Cancel</Button>
      }
      
      { isShowForm !== "" &&  addProduct() }
      
      
        <h3>Products fetch {products.length} of {count} </h3>
        <table>
          <thead> 
              <tr>
                <th className="t-start">Image</th>
                <th className="t-center">Title</th>
                <th>Added</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sold</th>
                <th>Action</th>
              </tr>
          </thead>
            <tbody>
          { products.map((p: any)=>(
              <tr>
                <td className="">
                  { p.logo &&
                  <div className="brand_logo">
                    <img src={fullLink(p.logo)}  />
                  </div>
                  }
                </td>
              
                <td className="t-center">{p.title}</td>
                <td className="t-center">{new Date(Number(p.created_at)).toDateString() }</td>
                <td className="t-center">{p.category && p.category.name}</td>
                <td className="t-center">{p.brand && p.brand.name}</td>
                <td className="t-center">${p.price}</td>
                <td className="t-center">{p.qty}</td>
                <td className="t-center">{p.sold}</td>
                <td className="t-center d-flex">
                  <button><i className="fal fa-pen" onClick={(e)=> productFetchForUpdate(p) } /></button>
                  <button><i onClick={()=>deleteItem(p._id)} className="fal fa-trash"/></button>
                </td>
              </tr>
          )) }
            </tbody>
            
        </table>
          
      
      </div>
    )
}

export default ProductController