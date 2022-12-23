import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./Orders.scss";


import { Link } from "react-router-dom";
import useScrollTop from "src/hooks/useScrollTop";
import {RootState} from "src/store";
import staticImagePath from "src/utills/staticImagePath";
import {fetchOrdersAction} from "actions/authAction";
import SidebarButton from "components/SidebarButton/SidebarButton";
import Table from "UI/table/Table";

const Orders = (props) => {
    const { authState: {orders} } = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    useScrollTop();

    useEffect(() => {
        if (!orders || orders.length === 0) {
           fetchOrdersAction(dispatch)
        }
    }, []);

    let columns: any = [
        {
            title: "Image",
            key: "1",
            dataIndex: "product_id",
            render: (product_id: any) => (
                <div style={{ width: "40px" }}>
                    <img className="w-full" src={staticImagePath(product_id?.cover)} />
                </div>
            ),
        },
        {
            title: "Order ID",
            key: "1122",
            dataIndex: "orderId",
            render: (_id) => <Link to={`/dashboard/orders/${_id}`}>{_id}</Link>,
        },
        {
            title: "Transaction ID",
            key: "112234232",
            dataIndex: "transactionId",
        },
        {
            title: "Product Name",
            key: "1",
            dataIndex: "product_id",
            width: 200,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.product_id?.title.toLowerCase() > b.product_id?.title.toLowerCase()) {
                        return 1;
                    } else if (a.product_id?.title.toLowerCase() < b.product_id?.title.toLowerCase()) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
            },
            render: (product_id: any, order) => {
                console.log(order);
                return product_id?.title ? product_id.title : "Package (" + order?.products?.length + " items)";
            },
        },
        {
            title: "Created At",
            key: "3",
            dataIndex: "createdAt",
            width: 150,
            render: (text: string) => new Date(text).toDateString(),
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.createdAt > b.createdAt) {
                        return 1;
                    } else if (a.createdAt < b.createdAt) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
            },
        },
        {
            title: "Status",
            key: "323423",
            dataIndex: "order_status",
            width: 150,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.status > b.status) {
                        return 1;
                    } else if (a.status < b.status) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
            },
        },
        {
            title: "Price",
            key: "3",
            dataIndex: "price",
            width: 150,
            render: (price: number) => "TK. " + price,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.price > b.price) {
                        return 1;
                    } else if (a.price < b.price) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
            },
        },
    ];

    return (
        <div className="my-4">
            {props.roleFor !== "ADMIN" && (
                <SidebarButton>
                    <h1 className="page-title">My Orders</h1>
                </SidebarButton>
            )}

            <div className="mt-5">
                {orders && orders.length > 0 ? (
                    <div className="card overflow-hidden mt-4">
                        <div className="overflow-x-auto">
                            <Table dataSource={orders} columns={columns}  />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3>No Order found.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders