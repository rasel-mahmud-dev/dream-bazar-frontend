import React, {useEffect} from "react"
import apis, {getApi} from "src/apis";
import Circle from "src/components/UI/Circle/Circle"

const SellerProducts = ()=>{
    
    useEffect(()=>{
        getApi().get("/api/seller/products").then(({data, status})=>{
            console.log(data)
        })
        
    }, [])
    
    
    return (
        <div className="p-4">
            <h1 className="heading-4 flex items-center gap-x-2">Products
                <Circle className="!text-xs rounded-xl">22</Circle>
            </h1>
            
        </div>
    )
    
}



export default SellerProducts;