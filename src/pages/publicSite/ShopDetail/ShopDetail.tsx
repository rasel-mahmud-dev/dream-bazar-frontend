import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchProductStoreInfo} from "actions/productAction";
import {Shop} from "reducers/authReducer";
import staticImagePath from "src/utills/staticImagePath";
import Product from "components/Product/Product";
import RatingStar from "UI/RatingStar";


const ShopDetail = () => {

    const {shopName} = useParams()

    const [shopInfo, setSellerInfo] = useState<Shop>()


    useEffect(()=>{

        (async function(){
            fetchProductStoreInfo(`shopName=${shopName}`).then((data: any)=>{
                data && setSellerInfo(data)
            })
        }())

    }, [shopName])


    return (
        <div className="container">
             { shopInfo && (
                 <div>
                     <div className="shop-banner select-none">
                         <img className="w-full banner-img" src={shopInfo.shopBanner} alt="" />
                         <div className="shop-logo ">
                             <img src={staticImagePath(shopInfo.shopLogo)} className="rounded-full w-32" alt="" />
                         </div>
                     </div>

                     <div className="mt-14">
                         <div className=" ">
                             <div>
                                 <h2 className="heading-2">{shopInfo?.shopName}</h2>
                                <div className="flex items-center gap-x-1">
                                    <RatingStar rating={{rate: 5}} />
                                    <h4 className="font-semibold">({100})</h4>
                                </div>

                             </div>
                             <h4 className="heading-4 mt-10">Total Products ({shopInfo?.products.length})</h4>
                         </div>
                         <div className="grid grid-cols-5 gap-4">
                             {shopInfo.products && shopInfo.products.map(product=>(
                                 <Product product={product} />
                             ))}
                         </div>
                     </div>


                 </div>
             ) }
            </div>
    );
};

export default ShopDetail;