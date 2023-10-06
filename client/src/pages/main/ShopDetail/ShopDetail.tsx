import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Shop} from "reducers/authSlice";
import staticImagePath from "src/utills/staticImagePath";
import Product from "components/Product/Product";
import RatingStar from "UI/RatingStar";
import Pagination from "components/Pagination/Pagination";
import {ProductType} from "reducers/productSlice";
import {fetchShopDetail, fetchShopProducts} from "actions/shopAction";
import useFetchProductCategory from "src/hooks/fetchProductCategory";
import useAppSelector from "src/hooks/useAppSelector";
import {Button} from "UI/index";
import useLanguage from "src/hooks/useLanguage";


interface ShopWithPopulate extends Shop{
    totalProducts: number
}

const ShopDetail = () => {
    useFetchProductCategory()


    const l = useLanguage()

    const {productCategories} = useAppSelector(state=>state.categoryState)



    const {shopName} = useParams()

    const [shopInfo, setSellerInfo] = useState<ShopWithPopulate>()

    const [shopProducts, setShopProducts] = useState<{[key: string]: ProductType[]}>({})
    const [groupProduct, setGroupProduct] = useState<{[key: string]: ProductType[]}>({})

    const [ pagination, setPagination ] = useState<{
        perPage: number,
        pageNumber: number,
    }>({
        perPage: 10,
        pageNumber: 1,
    })

    async function handlePageChange(currentPageNumber: number, sellerId?: string){
        let query =  `pageNumber=${currentPageNumber}&perPage=100`
        let shopSellerId =  shopInfo?.sellerId || sellerId

        // first check cache, if cache available then only change page
        // if(shopProducts[currentPageNumber]){
        //    setPagination((prevState)=>({
        //        ...prevState,
        //        pageNumber: currentPageNumber
        //    }))
        //     return
        // }

        // if not fetch products for this page, if cache available then only change page
        if(shopInfo || sellerId){

            let data = await fetchShopProducts(shopSellerId, query) as ProductType[]
            if(!data) return

            setShopProducts((prev)=>({
                ...prev,
                [currentPageNumber]: data
            }))

            // setPagination((prevState)=>({
            //     ...prevState,
            //     pageNumber: currentPageNumber
            // }))
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



    useEffect(()=>{
        if(shopProducts[1] && productCategories){
            let categoryGroup = {}
            productCategories.forEach((category)=>{
                shopProducts[1].forEach(prod=>{
                    if(prod.categoryId === category._id){
                        if(categoryGroup[category.name]){
                            categoryGroup[category.name].push(prod)
                        } else {
                            categoryGroup[category.name] = [prod]
                        }
                    }
                })
            })
            setGroupProduct(categoryGroup)
        }

    }, [shopProducts[1], productCategories])


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

                     <div className="my-14">
                         <div className=" ">
                             <div>
                                 <h2 className="heading-2">{shopInfo?.shopName}</h2>
                                <div className="flex items-center gap-x-1">
                                    <RatingStar rating={{rate: 5}} />
                                    <h4 className="font-semibold">({20})</h4>
                                </div>

                             </div>
                             <h4 className="heading-4 mt-10">Total Products ({shopInfo?.totalProducts})</h4>
                         </div>

                         <div>
                             {Object.keys(groupProduct).map(categoryName=>(
                                 <div>
0                                     <div className="flex justify-between items-center card !shadow-none !mt-6 !mb-2">
                                         <h2 className="heading-4">{categoryName}</h2>

                                         <Button
                                             loading={false}
                                             className="!text-primary-400"
                                             loaderClass="!border-l-white !border-b-white">
                                            {l("More")}
                                        </Button>

                                     </div>
                                     <div className="grid grid-cols-5 gap-4">
                                         {groupProduct[categoryName] && groupProduct[categoryName].map(product=>(
                                             <Product product={product} />
                                         ))}
                                     </div>
                                 </div>
                             ))}
                         </div>


                         {/*<div className="grid grid-cols-5 gap-4">*/}
                         {/*    {shopProducts && shopProducts[pagination.pageNumber]?.map(product=>(*/}
                         {/*        <Product product={product} />*/}
                         {/*    ))}*/}
                         {/*</div>*/}

                         {/*<div className="flex justify-center py-6">*/}
                         {/*    <Pagination totalItem={shopInfo.totalProducts} perPage={pagination.perPage} pageNumber={pagination.pageNumber}  onChange={handlePageChange}/>*/}
                         {/*</div>*/}
                     </div>
                 </div>
             ) }
            </div>
    );
};

export default ShopDetail;