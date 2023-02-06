import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Shop} from "reducers/authReducer";
import staticImagePath from "src/utills/staticImagePath";
import Product from "components/Product/Product";
import RatingStar from "UI/RatingStar";
import Pagination from "components/Pagination/Pagination";
import {ProductType} from "reducers/productReducer";
import {fetchShopDetail, fetchShopProducts} from "actions/shopAction";


interface ShopWithPopulate extends Shop{
    totalProducts: number
}

const ShopDetail = () => {

    const {shopName} = useParams()

    const [shopInfo, setSellerInfo] = useState<ShopWithPopulate>()

    const [shopProducts, setShopProducts] = useState<{[key: string]: ProductType[]}>({})

    const [ pagination, setPagination ] = useState<{
        perPage: number,
        pageNumber: number,
    }>({
        perPage: 10,
        pageNumber: 1,
    })

    async function handlePageChange(currentPageNumber: number, sellerId?: string){
        let query =  `pageNumber=${currentPageNumber}`
        let shopSellerId =  shopInfo?.sellerId || sellerId

        // first check cache, if cache available then only change page
        if(shopProducts[currentPageNumber]){
           setPagination((prevState)=>({
               ...prevState,
               pageNumber: currentPageNumber
           }))

            return
        }

        // if not fetch products for this page, if cache available then only change page
        if(shopInfo || sellerId){

            let data = await fetchShopProducts(shopSellerId, query) as ProductType[]
            if(!data) return

            setShopProducts((prev)=>({
                ...prev,
                [currentPageNumber]: data
            }))

            setPagination((prevState)=>({
                ...prevState,
                pageNumber: currentPageNumber
            }))
        }
    }

    useEffect(()=>{
        (async function(){
            fetchShopDetail(`shopName=${shopName}`).then((data: any)=>{
                if(data){
                    data && setSellerInfo(data)
                    handlePageChange(1, data.sellerId)
                }
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
                             <h4 className="heading-4 mt-10">Total Products ({shopInfo?.totalProducts})</h4>
                         </div>
                         <div className="grid grid-cols-5 gap-4">
                             {shopProducts && shopProducts[pagination.pageNumber]?.map(product=>(
                                 <Product product={product} />
                             ))}
                         </div>

                         <div className="flex justify-center py-6">
                             <Pagination totalItem={shopInfo.totalProducts} perPage={pagination.perPage} pageNumber={pagination.pageNumber}  onChange={handlePageChange}/>
                         </div>
                     </div>


                 </div>
             ) }
            </div>
    );
};

export default ShopDetail;