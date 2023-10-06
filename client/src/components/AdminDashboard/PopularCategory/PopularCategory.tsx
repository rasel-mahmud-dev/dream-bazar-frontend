import React, {useState} from 'react';
import Table, {Column} from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import Box from "UI/Box/Box";
import {FiEye} from "react-icons/fi";
import {IoPencil} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

function PopularCategory(props) {


    const [recentCategories, setRecentCategories] =
        useState(Array.from({length: 8}).map((item, index) => ({
            name: "Test product",
            logo: "https://www.getadmintoolkit.com/images/avatar1.png",
            createdAt: new Date(),
            sold: 109,
            price: 300,
            sku: 234234,
        })))

    const navigate = useNavigate()

    const columns: Column[] = [
        {
            dataIndex: "logo",
            title: "Image",
            className: "text-start",
            render: (logo) => (
                <div className="flex items-center ">
                    <img className="w-10 h-10 rounded-full object-contain" src={staticImagePath(logo)} alt=""/>
                </div>
            ),
        },
        {
            dataIndex: "name",
            title: "Name",
            className: "whitespace-nowrap text-start",
            dataClass: " w-[20%] text-start",
            render: (name) => (
                <div className="flex items-center ">
                    {name}
                </div>
            )
        },
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

            <h5 className="heading-6">Popular Category</h5>

            <Table
                className=""
                dataSource={recentCategories || []}
                columns={columns}
                tbodyClass={{td: "text-center"}}
            />


        </div>
    );
}

export default PopularCategory;