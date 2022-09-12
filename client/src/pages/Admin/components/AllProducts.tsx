import React from "react"
import { Button, Modal, Select,  File, Tabs } from "components/UI"
import api from "src/apis" 
import fullLink from "src/utills/fullLink"
import Table from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import {BsPencilSquare, FcEmptyTrash} from "react-icons/all";
import {useNavigate} from "react-router-dom";

  const { TabPane } = Tabs

  const AllProducts = (props) =>{
    
    const navigate = useNavigate();
  
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


  

  
  function deleteItem(id){
    api.delete(`/api/product/${id}`).then(response=>{
     if(response.status === 201) {
       setProducts(products.filter((p: any) => p._id !== id))
     }
    })
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
  
    
    const columns = [
      {
        title: "Image",
        dataIndex: "coverPhoto",
        render: (item) => (
            <div className="w-8">
                    <img src={staticImagePath(item.coverPhoto)} alt="" />
                </div>
        ),
      },
      { title: "Title", dataIndex: "title" },
      { title: "Added", dataIndex: "createdAt",  render: (item) => <span>{new Date(item.createdAt).toDateString()}</span> },
      { title: "Category", dataIndex: "categoryId" },
      { title: "Brand", dataIndex: "brandId" },
      { title: "Price", dataIndex: "price", render: (item) => <span>${item.price}</span> },
      { title: "Stock", dataIndex: "qty" },
      { title: "Sold", dataIndex: "sold" },
      {
        title: "Action",
        dataIndex: "",
        className: "text-center",
        render: (item) => (
            <div className="flex justify-center items-center gap-x-2">
                    <BsPencilSquare className="text-md cursor-pointer" onClick={()=>navigate("/auth/admin/dashboard/update-product/"+item._id)} />
                    <FcEmptyTrash className="text-xl cursor-pointer" onClick={()=>deleteItem(item._id)}/>
                </div>
        ),
      },
    ];
  
  
  return (
      <div className="container"> 
      
      
      {  isShowForm === "" ? <Button onClick={(e)=> setShowForm("new")}>Add New Product</Button>
      : <Button onClick={(e)=> setShowForm("")}>Cancel</Button>
      }
      
      { isShowForm !== "" &&  addProduct() }
      
      
        <h3>Products fetch {products.length} of {count} </h3>
        
         <div className="card">
            <Table dataSource={products ? products : []} columns={columns} tbodyClass={{td: "py-2 px-2", tr: "hover:bg-green-500/10"}} />
        </div>
      
      </div>
    )
}

export default AllProducts