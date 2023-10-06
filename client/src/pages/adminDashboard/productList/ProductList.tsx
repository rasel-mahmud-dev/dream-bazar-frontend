import React, {useEffect, useReducer} from 'react';
import Table, {Column} from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import {Badge, Pagination} from "UI/index";
import {ApproveStatus} from "src/types/enum";
import approveColors from "src/utills/approveColors";
import Box from "UI/Box/Box";
import {BiPen, BiPencil,} from "react-icons/bi";
import {FiEye} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import useAppSelector from "src/hooks/useAppSelector";
import useAppDispatch from "src/hooks/useAppDispatch";
import {fetchProductsForAdmin, updateProductAttributeAction} from "actions/adminProductAction";
import Switch from "UI/Form/switch/Switch";
import MenuDropdown from "components/Dropdown/MenuDropdown";


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
        dispatch(fetchProductsForAdmin({query: ""})).unwrap().then(data => {
            setPaginationState({
                totalItem: data?.total || 0
            })
        }).catch(ex => {
        })
    }, [])


    function handleProductAccept(payload, productId) {

        dispatch(updateProductAttributeAction({productId, updatedProduct: payload}))

    }

    function changeApproveStatus(approveStatus, productId) {
        return (
            <div>
                <div className="flex items-center">
                    <li className="w-16 text-sm font-medium">
                        Accept
                    </li>
                    <Switch onChange={() => handleProductAccept({approveStatus: "accepted"}, productId)} on={approveStatus === "accepted"}
                            name="active-status"/>
                </div>
                <div className="flex items-center  mt-2">
                    <li className="w-16 text-sm font-medium">
                        Reject
                    </li>
                    <Switch onChange={() => handleProductAccept({approveStatus: "rejected"}, productId)} on={approveStatus === "rejected"}
                            name="active-status"/>
                </div>


            </div>
        )
    }

    const columns: Column[] = [
        {
            dataIndex: "coverPhoto",
            title: "Image",
            className: "text-start",
            render: (image) => (
                <img className="w-10 h-10 object-contain" src={staticImagePath(image)} alt=""/>
            ),
        },


        {dataIndex: "title", title: "Title", className: "whitespace-nowrap text-start", dataClass: " w-[290px] text-start"},

        {dataIndex: "seller", title: "Seller", className: "whitespace-nowrap text-start", dataClass: " w-[290px] text-start", render: (seller)=>(
                <div className="flex">
                    <img className="w-10 h-10 object-contain" src={staticImagePath(seller?.avatar)} alt=""/>
                    <div className="ml-2">
                        <p>{seller?.firstName}</p>
                        <p>{seller?.email}</p>
                    </div>
                </div>
            )},

        {dataIndex: "discount", title: "Discount", className: "whitespace-nowrap text-center", render: (d) => <Badge className="w-auto">{d}%</Badge>},
        {dataIndex: "price", title: "Price", className: "whitespace-nowrap text-center"},
        {
            dataIndex: "approveStatus",
            title: "Verify Status",
            className: "whitespace-nowrap text-center",
            render: (approveStatus: ApproveStatus, item) => (
                <div className="flex items-center justify-center gap-x-1 relative">
                    <Badge className="py-1" style={{background: approveColors[approveStatus]?.bg, color: approveColors[approveStatus]?.text}}>
                        {approveStatus === ApproveStatus.Pending
                            ? "Pending"
                            : approveStatus === ApproveStatus.Rejected
                                ? "Rejected"
                                : "Accepted"
                        }
                    </Badge>

                    <MenuDropdown  className="mt-1" render={() => changeApproveStatus(approveStatus, item._id)}>
                        <Badge className="py-1 cursor-pointer" style={{background: approveColors[approveStatus]?.bg, color: approveColors[approveStatus]?.text}}>
                            <BiPen className="text-sm"/>
                        </Badge>
                    </MenuDropdown>

                </div>
            )
        },
        {
            dataIndex: "isActive", title: "Active Status", className: "whitespace-nowrap mx-auto", render: (isActive) => (
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
                <div className="flex gap-x-3 justify-center">
                    <Box className="border border-green-500"><FiEye className="text-green-500 text-xs"/></Box>
                    <Box className="border border-blue-600" onClick={() => navigate(`/seller/product/edit/${product._id}`)}>
                        <BiPencil
                            className="text-blue-600 text-xs"/></Box>
                    {/*<Box className="border border-red-500" onClick={()=>handleDeleteProduct(product._id)}><FaTrash className="text-red-500 text-xs" /></Box>*/}
                </div>
            ),
        },
    ];


    function handlePageChange(page: number) {
        setPaginationState(page)
        dispatch(fetchProductsForAdmin({
                query: `perPage=${paginationState.perPage}&pageNumber=${page}`
            }
        ))
    }

    return (
        <div className="py-6">
            <h1 className="heading-4 flex items-center gap-x-2">
                All Products
                {paginationState.totalItem && <Badge className="!text-xs bg-gray-100">{paginationState.totalItem}</Badge>}
            </h1>


            <div className="mt-6">
                <Table
                    className="dashboard-card"
                    dataSource={allProducts.products || []}
                    columns={columns}
                    tbodyClass={{td: "text-center"}}
                />


            </div>
            <Pagination
                className="!justify-end mt-5"
                onChange={handlePageChange}
                totalItem={paginationState.totalItem}
                perPage={paginationState.perPage}
                currentPage={paginationState.currentPage}/>
        </div>

    );
};

export default ProductList;