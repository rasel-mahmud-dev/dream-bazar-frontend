import React, {useEffect, useReducer, useState} from "react";
import apis from "src/apis";
import staticImagePath from "src/utills/staticImagePath";
import {FaMinus, FaPlus, FaTrash, FiEye, IoPencil} from "react-icons/all";
import {Badge, Pagination} from "UI/index";
import {useNavigate} from "react-router-dom";
import {StatusCode} from "store/types";
import {ProductType} from "reducers/productSlice";
import "./sellerProduct.scss"
import useAppSelector from "src/hooks/useAppSelector";
import subStr from "src/utills/subStr";
import Table, {Column} from "UI/table/Table";
import Box from "UI/Box/Box";
import Switch from "UI/Form/switch/Switch";
import {ApproveStatus} from "src/types/enum";
import approveColors from "src/utills/approveColors";
import {fetchProductsForAdmin} from "actions/adminProductAction";

const SellerProducts = ({}) => {

    const [products, setProducts] = useState<ProductType[]>([]);
    const {shop} = useAppSelector(state => state.sellerState)

    const navigate = useNavigate();

    const [featuresProducts, setFeaturesProducts] = useState([])

    const [paginationState, setPaginationState] = useReducer((prevState, action) => ({
        ...prevState,
        ...action,
    }), {
        perPage: 10,
        currentPage: 1,
        totalItem: 0,
    })

    function handlePageChange(page: number) {
        setPaginationState(page)
        // dispatch(fetchProductsForAdmin({
        //     query: `perPage=${paginationState.perPage}&pageNumber=${page}`}
        // ))
    }


    useEffect(() => {
        apis.get("/api/seller/products")
            .then(({data, status}) => {
                if (status === 200) {
                    setPaginationState({totalItem: data.products.length})
                    setProducts(data.products);
                }
            });
    }, []);

    useEffect(() => {

        if (!(shop && products)) return;

        //  now populate features product from id
        let featuresProductList = []
        products?.forEach(prod => {
            if (shop?.featuresProducts?.includes(prod._id)) {
                featuresProductList.push(prod)
            }
        })
        setFeaturesProducts(featuresProductList)
    }, [shop, products])


    async function handleDeleteProduct(productId: string) {
        const {status, data} = await apis.delete("/api/seller/product/" + productId)
        if (status === StatusCode.Created) {
            setProducts(products.filter(p => p._id !== productId))
        }
    }

    async function toggleFeatureProduct(productId) {
        try {
            let updateFeaturesProducts = [...featuresProducts]
            let index = updateFeaturesProducts.findIndex(p => p._id === productId)
            if (index === -1) {

                let {status} = await apis.post("/api/seller/add-to-feature-product", {productIds: [productId]})
                if (status === 201) {
                    let prod = products.find(prod => prod._id === productId)
                    if (prod) {
                        updateFeaturesProducts.push(prod)
                        setFeaturesProducts(updateFeaturesProducts)
                    }
                }

            } else {
                let {status} = await apis.post("/api/seller/remove-from-feature-product", {productIds: [productId]})
                if (status === 201) {
                    updateFeaturesProducts.splice(index, 1)
                    setFeaturesProducts(updateFeaturesProducts)
                }
            }
        } catch (ex) {

        }
    }

    function isFeatureProduct(productId) {
        return featuresProducts?.findIndex(p => p._id === productId) !== -1
    }

    function sortByTopDiscount(products) {
        products.sort(function (a, b) {
            if (a.discount < b.discount) {
                return 1
            } else if (a.discount > b.discount) {
                return -1
            } else {
                return 0
            }
        })
        return products
    }

    const columns: Column[] = [
        {
            dataIndex: "coverPhoto",
            title: "Image",
            render: (image) => (
                <img className="w-7" src={staticImagePath(image)}  alt=""/>
            ),
        },
        { dataIndex: "title", title: "Title", className: "whitespace-nowrap" },
        { dataIndex: "discount", title: "Discount", className: "whitespace-nowrap", render: (d)=>  <Badge className="w-auto">{d}%</Badge> },
        { dataIndex: "price", title: "Purchase Price", className: "whitespace-nowrap" },
        { dataIndex: "qty", title: "Stock", className: "whitespace-nowrap" },
        { dataIndex: "approveStatus", title: "Verify Status", className: "whitespace-nowrap", render: (approveStatus: ApproveStatus)=>(
                <div>

                    <Badge style={{background: approveColors[approveStatus]?.bg, color: approveColors[approveStatus]?.text}}>
                        {approveStatus === ApproveStatus.Pending
                            ? "Pending"
                            : approveStatus === ApproveStatus.Rejected
                                ? "Rejected"
                                : "Accepted"
                        }
                    </Badge>
                </div>
            ) },
        { dataIndex: "isActive", title: "Active Status", className: "whitespace-nowrap",render: (isActive)=>(
                <div>
                    <Switch className="" on={isActive}  name="active-status"/>
                </div>
            )  },
        {
            dataIndex: "",
            title: "Actions",
            render: (_, product) => (
                <div className="flex gap-x-3">
                    <Box className="border border-green-500"><FiEye className="text-green-500 text-xs" /></Box>
                    <Box className="border border-blue-600" onClick={()=>navigate(`/seller/product/edit/${product._id}`)}><IoPencil className="text-blue-600 text-xs" /></Box>
                    <Box className="border border-primary-400" onClick={()=>toggleFeatureProduct(product._id)}>
                        {isFeatureProduct(product._id)
                            ? <FaMinus className="text-primary-400 text-xs" />
                            : <FaPlus className="text-primary-400 text-xs" />}
                    </Box>
                    <Box className="border border-red-500" onClick={()=>handleDeleteProduct(product._id)}><FaTrash className="text-red-500 text-xs" /></Box>
                </div>
            ),
        },
    ];

    return (
        <div className="m-4">
            <div className="">
                <h1 className="heading-4 flex items-center gap-x-2">
                    All Products
                    <Badge className="!text-xs bg-gray-100">22</Badge>
                </h1>


                <div>

                    <Table
                        dataSource={products}
                        columns={columns}
                    />

                    <Pagination
                        className="!justify-end mt-5"
                        onChange={handlePageChange}
                        totalItem={paginationState.totalItem}
                        perPage={paginationState.perPage}
                        currentPage={paginationState.currentPage}/>

                    <div className="seller-products-grid mt-3">
                        {/*{products.map(prod => (*/}
                        {/*    <div className=" seller-product relative">*/}
                        {/*        <div className="seller-product-image">*/}
                        {/*            <img src={staticImagePath(prod.coverPhoto)} alt={prod.slug}/>*/}
                        {/*        </div>*/}
                        {/*        <h2>{subStr(prod.title, 30)}</h2>*/}

                        {/*        <div className="mt-2">*/}
                        {/*            <div className="flex items-center gap-x-2">*/}
                        {/*                <Circle className="!w-6 !h-6 bg-red-400 text-white hover:bg-red-400">*/}
                        {/*                    <FaTrash className="!text-xs"/>*/}
                        {/*                </Circle>*/}

                        {/*                <Circle className="!w-6 !h-6 bg-primary-400 text-white hover:bg-primary-400">*/}
                        {/*                    <FaPenAlt className="!text-xs"/>*/}
                        {/*                </Circle>*/}
                        {/*            </div>*/}
                        {/*            {!isFeatureProduct(prod._id) && <div className="absolute top-0 right-1">*/}
                        {/*                <Badge onClick={() => toggleFeatureProduct(prod._id)}*/}
                        {/*                       className="bg-primary-400 text-white cursor-pointer">*/}
                        {/*                    Add To Features*/}

                        {/*                </Badge>*/}
                        {/*            </div>}*/}
                        {/*        </div>*/}

                        {/*    </div>*/}
                        {/*))}*/}
                    </div>
                </div>


                <div className="mt-16">
                    <h3 className="heading-3">Features Products</h3>
                    {featuresProducts.length > 0 ? <div className="seller-products-grid mt-3">
                        {featuresProducts?.map(prod => (
                            <div className=" seller-product relative">
                                <div className="seller-product-image">
                                    <img src={staticImagePath(prod.coverPhoto)} alt={prod.slug}/>
                                </div>
                                <h2>{subStr(prod.title, 30)}</h2>

                                <div className="">
                                    <Badge onClick={() => toggleFeatureProduct(prod._id)}
                                           className="bg-red-400 text-white cursor-pointer">
                                        Remove from Feature Product"

                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div> : (
                        <div>
                            <h4>No feature product </h4>
                        </div>
                    )}
                </div>


                <div className="mt-16">
                    <h3 className="heading-3">Top Discount</h3>
                    <div className="seller-products-grid mt-3">
                        {sortByTopDiscount([...products])?.map(prod => (
                            <div className=" seller-product relative">
                                <div className="seller-product-image">
                                    <img src={staticImagePath(prod.coverPhoto)} alt={prod.slug}/>
                                </div>
                                <h2>{subStr(prod.title, 30)}</h2>
                               <div className="flex items-center justify-center">
                                   <div className="">Discount {prod.discount}%</div>
                               </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default SellerProducts;
