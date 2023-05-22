import React, {useEffect, useReducer} from 'react';
import Table, {Column} from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import {Badge, Pagination} from "UI/index";
import {ApproveStatus} from "src/types/enum";
import approveColors from "src/utills/approveColors";
import Box from "UI/Box/Box";
import {FiEye, IoPencil} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import useAppSelector from "src/hooks/useAppSelector";
import useAppDispatch from "src/hooks/useAppDispatch";
import {fetchProductsForAdmin} from "actions/adminProductAction";

const ProductList = () => {

    const navigate = useNavigate()
    const {allProducts} = useAppSelector(state => state.adminState)

    const [paginationState, setPaginationState] = useReducer((prevState, action) => ({

        ...prevState,
        ...action,

    }), {
        perPage: 10,
        currentPage: 1,
        totalItem: 0,
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProductsForAdmin({query: ""})).unwrap().then(data=>{
            setPaginationState({
                totalItem: data?.total || 0
            })
        }).catch(ex=>{})
    }, [])


    const columns: Column[] = [
        {
            dataIndex: "coverPhoto",
            title: "Image",
            render: (image) => (
                <img className="w-7" src={staticImagePath(image)} alt=""/>
            ),
        },
        {dataIndex: "title", title: "Title", className: "whitespace-nowrap"},
        {dataIndex: "discount", title: "Discount", className: "whitespace-nowrap", render: (d) => <Badge className="w-auto">{d}%</Badge>},
        {dataIndex: "price", title: "Price", className: "whitespace-nowrap"},
        {
            dataIndex: "approveStatus", title: "Verify Status", className: "whitespace-nowrap", render: (approveStatus: ApproveStatus) => (
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
            )
        },
        {
            dataIndex: "isActive", title: "Active Status", className: "whitespace-nowrap", render: (isActive) => (
                <Badge style={{
                    background: approveColors[isActive ? "accepted" : "rejected"]?.bg,
                    color: approveColors[isActive ? "accepted" : "rejected"]?.text
                }}>
                    {isActive === ApproveStatus.Pending
                        ? "Pending"
                        : "Inactive"
                    }
                </Badge>
                // <div>
                //     <Switch className="" on={isActive}  name="active-status"/>
                // </div>
            )
        },
        {
            dataIndex: "",
            title: "Actions",
            render: (_, product) => (
                <div className="flex gap-x-3">
                    <Box className="border border-green-500"><FiEye className="text-green-500 text-xs"/></Box>
                    <Box className="border border-blue-600" onClick={() => navigate(`/seller/product/edit/${product._id}`)}><IoPencil
                        className="text-blue-600 text-xs"/></Box>
                    {/*<Box className="border border-red-500" onClick={()=>handleDeleteProduct(product._id)}><FaTrash className="text-red-500 text-xs" /></Box>*/}
                </div>
            ),
        },
    ];


    function handlePageChange(page: number) {
        setPaginationState(page)
        dispatch(fetchProductsForAdmin({
            query: `perPage=${paginationState.perPage}&pageNumber=${page}`}
        ))
    }

    return (
        <div>
            <h1 className="heading-4 flex items-center gap-x-2">
                All Products
                <Badge className="!text-xs bg-gray-100">{allProducts?.total || 0 }</Badge>
            </h1>


            <div>
                <Table
                    dataSource={allProducts.products || []}
                    columns={columns}
                />


            </div>
            <Pagination onChange={handlePageChange}
                        totalItem={paginationState.totalItem}
                        perPage={paginationState.perPage}
                        currentPage={paginationState.currentPage}/>
        </div>

    );
};

export default ProductList;