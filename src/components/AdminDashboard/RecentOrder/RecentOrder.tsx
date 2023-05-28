import React, {useState} from 'react';
import Table, {Column} from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import {Badge} from "UI/index";
import {ApproveStatus} from "src/types/enum";
import approveColors from "src/utills/approveColors";
import Box from "UI/Box/Box";
import {FiEye, IoPencil} from "react-icons/all";
import {useNavigate} from "react-router-dom";

function RecentOrders(props) {


    const [recentOrders, setRecentOrders] =
        useState(Array.from({length: 12}).map((item, index) => ({
            customer: {
                firstName: "Ahmed",
                lastName: "Shakil",
                email: "ahmed@example.com",
                avatar: "https://www.getadmintoolkit.com/images/avatar1.png",
            },
            createdAt: new Date()
        })))

    const navigate = useNavigate()

    const columns: Column[] = [
        {
            dataIndex: "customer",
            title: "Customer",
            className: "text-start",
            render: (customer) => (
                <div className="flex items-center ">
                    <img className="w-10 h-10 rounded-full object-contain" src={staticImagePath(customer.avatar)} alt=""/>
                    <div className="ml-2">
                        <p className="text-start text-sm font-medium">{customer.firstName} {customer.lastName}</p>
                        <p className="text-dark-300 text-xs">{customer.email}</p>
                    </div>
                </div>
            ),
        },
        {
            dataIndex: "createdAt",
            title: "Ordered At",
            className: "whitespace-nowrap text-start",
            dataClass: " w-[290px] text-start",
            render: (createdAt) => (
                <div className="flex items-center ">
                    {new Date(createdAt).toDateString()}
                </div>
            )
        },

        {
            dataIndex: "Status", title: "Status", className: "whitespace-nowrap text-center", render: (approveStatus: ApproveStatus) => (
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

        {dataIndex: "Total", title: "Price", className: "whitespace-nowrap text-center"},
        {dataIndex: "Revenue", title: "Price", className: "whitespace-nowrap text-center"},
        {
            dataIndex: "",
            title: "Actions",
            render: (_, product) => (
                <div className="flex gap-x-3 justify-end">
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

            <h5 className="heading-6">Recent Orders</h5>

            <Table
                className="dashboard-card"
                dataSource={recentOrders || []}
                columns={columns}
                tbodyClass={{td: "text-center"}}
            />


        </div>
    );
}

export default RecentOrders;