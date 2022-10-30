import React, { useEffect, useState } from "react";
import { getApi } from "src/apis";
import Circle from "src/components/UI/Circle/Circle";
import Table, { Column } from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import Box from "UI/Box/Box";
import {FaTrash, FiEye, HiPencil, IoPencil} from "react-icons/all";
import {Badge} from "UI/index";
import Switch from "UI/Form/switch/Switch";
import {useNavigate} from "react-router-dom";
import {Scope} from "store/types";

const SellerProducts = () => {
	const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();
    

	useEffect(() => {
		getApi(Scope.SELLER_DASHBOARD)
			.get("/api/seller/products")
			.then(({ data, status }) => {
				if (status === 200) {
					setProducts(data.products);
				}
			});
	}, []);

	const columns: Column[] = [
		{
			dataIndex: "coverPhoto",
			title: "Image",
			render: (image) => (
				<img className="w-7" src={staticImagePath(image)} />
			),
		},
		{ dataIndex: "title", title: "Title", className: "whitespace-nowrap" },
		{ dataIndex: "price", title: "Purchase Price", className: "whitespace-nowrap" },
		{ dataIndex: "isApproved", title: "Verify Status", className: "whitespace-nowrap", render: (isApproved)=>(
            <div>
                <Badge className={`${!isApproved ? "bg-red-500/10 text-red-500" : ""}`}>
                    {isApproved ? "Approved" : "Rejected"}
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
					<Box className="border border-red-500" onClick={()=>navigate(`/seller/product/edit/${product._id}`)}><FaTrash className="text-red-500 text-xs" /></Box>
				</div>
			),
		},
	];

	return (
		<div className="m-4">
            <div className="shadow-xxs bg-white p-4 rounded-lg">
                <h1 className="heading-4 flex items-center gap-x-2">
                    Products
                    <Badge className="!text-xs bg-gray-100">22</Badge>
                </h1>
    
                <Table
                    dataSource={products}
                    columns={columns}
                    fixed={true}
                    scroll={{ x: 900 }}
                />
            </div>
		</div>
	);
};

export default SellerProducts;
