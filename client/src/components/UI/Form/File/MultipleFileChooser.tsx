import React, {useRef, useState} from 'react';
import "./multipleFileChooser.scss";
import blobToBase64 from "src/utills/blobToBase64";

const MultipleFileChooser = (props) => {
    
    const input= useRef<HTMLInputElement>(null)
    
    const [state, setState] = useState({
    
    })
    
    
    function handleChooseFile(){
        input.current.click()
    }
    
    function handleChange(e){
        if(e.target.files && e.target.files.length) {
            let file = e.target.files[0];
            blobToBase64(file, (data)=>{
                setState(prevState=>({
                    ...prevState,
                    [file.name]: data
                }))
            })
        }
    }
    console.log(state)
    
    return (
        <div>
            <h1>{props.label}</h1>
            <input onChange={handleChange} hidden={true} type="file" accept="image/jpeg" ref={input}/>
            
            <div>
                { state && Object.keys(state).map((key)=>(
                    <div>
                        <img className="w-full" src={state[key]} alt=""/>
                    </div>
                )) }
            </div>
            
            <div className="choose-btn" onClick={handleChooseFile}></div>
        </div>
    );
};

export default MultipleFileChooser;
