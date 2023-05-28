import React, {useState} from 'react';
import Table, {Column} from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import Box from "UI/Box/Box";
import {FiEye, IoPencil} from "react-icons/all";
import {useNavigate} from "react-router-dom";

function PopularProducts(props) {


    const [popularProducts, setRecentOrders] =
        useState(Array.from({length: 8}).map((item, index) => ({
            logo: "https://www.getadmintoolkit.com/images/avatar1.png",
            title: "Test products",
            price: 233,
            sold: 234,
            sku: 324323,
            createdAt: new Date()
        })))

    const navigate = useNavigate()

    const columns: Column[] = [
        {
            dataIndex: "logo",
            title: "Customer",
            className: "text-start",
            render: (logo) => (
                <div className="flex items-center ">
                    <img className="w-10 h-10 rounded-full object-contain" src={staticImagePath(logo)} alt=""/>
                </div>
            ),
        },


        {dataIndex: "Total", title: "Price", className: "whitespace-nowrap text-center"},
        {dataIndex: "Revenue", title: "Price", className: "whitespace-nowrap text-center"},
        {
            dataIndex: "",
            title: "Actions",
            render: (_, product) => (
                <div className="flex gap-x-3 justify-center">
                    <Box className="border border-green-500"><FiEye className="text-green-500 text-xs"/></Box>
                    <Box className="border border-blue-600" onClick={() => navigate(`/seller/product/edit/${product._id}`)}><IoPencil
                        className="text-blue-600 text-xs"/></Box>
                    {/*<Box className="border border-red-500" onClick={()=>handleDeleteProduct(product._id)}><FaTrash className="text-red-500 text-xs" /></Box>*/}
                </div>
            ),
        },
    ];

    return (
        <div>
            <h5 className="heading-6">Popular Products</h5>

            <Table
                className="dashboard-card"
                dataSource={popularProducts || []}
                columns={columns}
                tbodyClass={{td: "text-center"}}
            />
        </div>
    );
}

export default PopularProducts;