import React from "react"
import {Button, File, Input, Popup, Modal, Tabs} from "components/UI"
import fullLink from "src/utills/fullLink"
import apis from "src/apis";

const { TabPane } = Tabs

let files: string | any[] = []

const BrandController = (props) =>{
  
  const [totalBrands, setTotalBrands] = React.useState<number>(0)
  const [brands, setBrands] = React.useState<any[]>([])
  const [staticImages, setStaticImages] = React.useState([]) 
  
  const [isShowForm, setShowForm] = React.useState("")
  const [isShowLogoHandler, setShowLogoHandler] = React.useState(false)
  
  
  const [brandData, setBrandData] = React.useState<any>({
    name: "", 
    logo: ""
  })
  
  const [updatedBrandCopy, setUpdateBrandCopy] = React.useState<any>({})

  const d = [
      {
        name: "name", 
        label: "Brand Name", 
        required:true
      },
      {
        name: "logo", 
        type: 'image', 
        fileName: "",
        label: "Brand Logo", 
        required: false
      }
    ]
  
  React.useEffect(()=>{
    (async function () {
      const {data} = await apis.get("/api/brands/count")
      setTotalBrands(data.count)
  
      const dd = await apis.get("/api/brands")
      setBrands(dd.data.brands)
    }())
    
  }, [])


  function brandFetchForUpdate(brand){
    setShowForm("update");
    let updatedBrandData = {...brandData}
    for(let i=0; i<d.length; i++){
      if(brand[d[i].name]){
          updatedBrandData[d[i].name] = brand[d[i].name]
      }
    }
    
    setBrandData(updatedBrandData)
    setUpdateBrandCopy(brand)
  }
  
  function deleteItem(id: any){
    apis.delete(`/api/brands/${id}`).then(response=>{
      setBrands(brands.filter(b=>b._id !== id))

    })
  }
  
  function handleChange(e){ 
    if(e.target.type === "image"){
      setBrandData({ 
        ...brandData,
        [e.target.name]: e.target.file,
        fileName: e.target.fileName,
      })   
    } else{
      setBrandData({
        ...brandData,
        [e.target.name]: e.target.value
      })    
    }
  }
  
  async function handleSave(){
    if(isShowForm === "new"){
      // let { data } = await api.post("/api/brands", {...brandData})
      // setBrands([...brands, data.brands[0]])
      if(brandData.logo){
        // need form data to send blob to backend 
        let formData = new FormData() 
        for(const key in brandData){
          formData.append(key, brandData[key])
        }
        let {data} = await apis.post("/api/brands/with-image-upload", formData)
        setBrands([...brands, ...data.brands])
      }
      
      // console.log(brandData)
      
    } else{
        let updatedBrands = [...brands]  
        let { _id, ...otherProperties } = updatedBrandCopy 
        let formData = new FormData()  
        
        let b = {...otherProperties, ...brandData}
        // upload with string logo path 
        for(let key in b){
          if(key !== "fileName"){ 
            formData.append(key, b[key])
          }
        }
        // console.log(b)
        let { data } = await apis.put(`/api/brands/${_id}`, formData)
   
      

      // if(updatedBrands.logo){
      // let { data } = await api.put(`/api/brands/${_id}`, {...otherProperties, ...brandData})
      // let index = updatedBrands.findIndex(b=>b._id === _id )
      // updatedBrands[index] = data.brand
      // setBrands(updatedBrands)
    }
  }

//  load all static files...
function fetchStaticFiles(){
  apis.get("/api/static-file").then(response=>{
    setStaticImages(response.data)
  })
}

// click static file from static images
  function chooseImageFromStatic(url){ 
    setBrandData({
      ...brandData, 
      logo: "upload/" + url
    })
  }
  // when choose new image form modal inside File Input
  function handleChangeLogo(e){
    if(e.target.type === 'file'){
      setBrandData({
        ...brandData,
        [e.target.name]: e.target.file,
        fileName: e.target.fileName,
      })

    } else{
      setBrandData({
        ...brandData,
        [e.target.name]: e.target.value
      })
    }
  }
  
  // render photo handler modal that an image can upload or get cdn link
  function showPhotoHandler(){ 
     // key ===  2 contains all static image files
     function handleTabChange(key){
       if(key === "2") fetchStaticFiles()
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
                        onClick={()=>chooseImageFromStatic(path)} 
                        src={fullLink(path)} />
                    </div>
                  ))}
                </div>
            </TabPane>
          </Tabs>
          
          <Button onClick={()=>setShowLogoHandler(false)}>Cancel</Button>
          <Button>Save</Button>
        </Modal>
        
  }
  
  function addProduct(){
    return (
      <div>
        <h2>{isShowForm === "new" ? "Add New Brand" : "Update Brand"}</h2>
        { d && d.map(pData=>(
          <div className="form-control">
            { pData.type === "image" ? (
              
              <div>
                <Button onClick={()=> setShowLogoHandler(!isShowLogoHandler) }>
                  Upgrade Logo
                </Button>
                { isShowLogoHandler && showPhotoHandler()}
              </div>
              
            ) : (
            
             <Input
              name={pData.name} 
              label={pData.label}
              value={brandData[pData.name]}  
              onChange={handleChange}
            /> 
            
            )   }
            
          </div>
        ))}
        
          
          
        <Button onClick={handleSave}>{ isShowForm === "new" ? "Save Brand" : "Update Brand" }</Button>
        
      
      </div>
    )
  }
  
  function handleTabChange(id){
    alert(id)
  }
  
  return (
      <div className="container">
        
        
        
      {  isShowForm === "" ? <Button onClick={(e)=> setShowForm("new")}>Add New Brand</Button>
      : <Button onClick={(e)=> setShowForm("")}>Cancel</Button>
      }

      { isShowForm !== "" &&  addProduct() }
      
        <h3>Brands fetch {brands.length} of {totalBrands} </h3>
        <table>
          <thead> 
              <tr>
                <th className="t-start">Logo</th>
                <th className="t-start">Name</th>
                <th>Added</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
          </thead>
          <tbody>
          { brands.map(b=>(
              <tr key={b._id}  >
                <td className="">
                  { b.logo &&
                  <div className="brand_logo">
                    <img src={fullLink(b.logo)}  />
                  </div>
                  }
                </td>
              
                <td className="">{b.name}</td>
                <td className="t-center">{new Date(Number(b.created_at)).toDateString() }</td>
                <td className="t-center">{new Date(Number(b.updated_at)).toDateString() }</td>
                <td className="t-center">
                  <button
                    onClick={(e)=> brandFetchForUpdate(b) }
                    ><i className="fal fa-pen"/>
                  </button>
                  <button 
                    onClick={()=>deleteItem(b._id)}>
                      <i className="fal fa-trash"/>
                  </button>
                </td>
              </tr>
          )) }
          </tbody>
            
        </table>
          
      </div>
    )
}

export default BrandController