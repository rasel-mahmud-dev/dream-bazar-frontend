import React from "react" 
import { Button } from "components/UI" 

import blobToBase64 from "src/utills/blobToBase64"

import "./File.scss"


const File = (props)=> {

  const { onChange, label, name, type, origin, defaultValue } = props 
    
  const imageInputRef = React.useRef(null)  
  
  const [selectedImage, setSelectedImage] = React.useState<{name: string, base64: string}>({name: "", base64: ""})
  
  React.useEffect(()=>{
    if(defaultValue){
      setSelectedImage({
        name: "file.name", 
        base64: origin+"/"+defaultValue
      })
    }
  }, [])
  
  function imageChangeHandler(e){ 
    const file = e.target.files[0] 
    blobToBase64(file, (base64: string)=>{
      setSelectedImage({name: file.name, base64: base64})
      onChange && onChange({ target: {name, type, file, fileName: file.name }})
    })
  }
  
  function chooseImage(e){
    imageInputRef.current.click()
  }
  
  return (
    <div className="input-group">
      <input 
        name={name}
        ref={imageInputRef}  
        type="file" 
        className="hide-input-image" 
        onChange={imageChangeHandler} 
      /> 
      <div className="preview_image">
          <label>{selectedImage.name}</label>
          <img src={selectedImage.base64}  alt="preview image"/>
      </div>
      
      { label && <label htmlFor={name}>{label}</label> }
      <Button className="file_upload_button" onClick={chooseImage}>
      Choose Image 
      <i className="far fa-cloud"></i>
      </Button>
      
     
      
    </div>
  )
}

export default File