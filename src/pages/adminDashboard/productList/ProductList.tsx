import React, { useEffect } from "react";
import { Button } from "UI/index";
import api, { getApi } from "src/apis";
import Table, { Column } from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import { BsPencilSquare, FcEmptyTrash } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import isoStringToDate from "src/utills/isoStringToDate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { fetchAdminBrandsAction, fetchAdminProductsAction } from "actions/adminProductAction";
import Switch from "UI/Form/switch/Switch";
import { Scope } from "store/types";

const AllProducts = (props) => {
	const navigate = useNavigate();
	const [count, setCount] = React.useState();
	const [products, setProducts] = React.useState<any[]>([]);
	const [categories, setCategories] = React.useState([]);
	const [brands, setBrands] = React.useState([]);
	const [isShowForm, setShowForm] = React.useState("");
	const [staticImages, setStaticImages] = React.useState([]);
	const [isShowCoverPhotoHandler, setShowCoverPhotoHandler] = React.useState(false);

	const { adminProducts, adminBrands } = useSelector((state: RootState) => state.productState);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchAdminProductsAction(adminProducts, 1, dispatch);
		fetchAdminBrandsAction(adminBrands, dispatch);

		Promise.allSettled([api.get("/api/categories/?type=lastLevel")]).then((result: any) => {
			if (result[0].status === "fulfilled") {
				setCategories(result[1].value.data.categories);
			}
		});
	}, []);

	useEffect(() => {
		let updatedProducts = [];
		for (let cachedKey in adminProducts.cached) {
			if (cachedKey) {
				updatedProducts.push(...adminProducts.cached[cachedKey]);
			}
		}
		setProducts(updatedProducts);
	}, [adminProducts.cached]);

 
	function updateProduct(productId, field) {
        const data = { ...field }
        let formData = new FormData()
        for (let dataKey in data) {
            formData.append(dataKey, data[dataKey])
        }
       
        // send toke for different scope user
		getApi(Scope.ADMIN_DASHBOARD).patch(`/api/product/${productId}`, formData)
            .then(({data, status}) => {
                let updatedProducts = [...products]
                let updatedProductIndex = updatedProducts.findIndex(p=>p._id === productId)
                if(updatedProductIndex !== -1){
                    for (let updateProductKey in data.updateProduct) {
                        updatedProducts[updatedProductIndex][updateProductKey] = data.updateProduct[updateProductKey]
                    }
                   setProducts(updatedProducts)
                }
            });
	}

	function deleteItem(id) {
		api.delete(`/api/product/${id}`).then((response) => {
			if (response.status === 201) {
				setProducts(products.filter((p: any) => p._id !== id));
			}
		});
	}

	const columns: Column[] = [
		{
			title: "Image",
			colWidth: 80,
			dataIndex: "coverPhoto",
			render: (coverPhoto) => (
				<div className="w-8">
					<img src={staticImagePath(coverPhoto)} alt="" />
				</div>
			),
		},
		{
			title: "Title",
			dataIndex: "title",
			sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0),
		},
		{
			title: "Added",
			dataIndex: "createdAt",
			sorter: (a: string, b: string) => {
				let aDate = new Date(a);
				let bDate = new Date(b);
				return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
			},
			render: (createdAt) => <span>{isoStringToDate(createdAt)}</span>,
		},
		{
			dataIndex: "isApproved",
			title: "Admin Verified",
			className: "whitespace-nowrap",
			render: (isApproved, product) => <Switch className="" on={isApproved} name="active-status" onChange={()=>updateProduct(product._id, {isApproved: !isApproved})} />,
		},
		{
			dataIndex: "isActive",
			title: "Active Status",
			className: "whitespace-nowrap",
			render: (isActive, product) => <Switch on={isActive} name="active-status" onChange={()=>updateProduct(product._id, {isActive: !isActive})} />,
		},
		{ title: "Category", dataIndex: "categoryId" },
		{ title: "Brand", dataIndex: "brandId" },
		{
			title: "Price",
			dataIndex: "price",
			colWidth: 80,
			sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0),
			render: (price) => <span>${price}</span>,
		},
		{ title: "Stock", dataIndex: "qty", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0) },
		{ title: "Sold", dataIndex: "sold", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0) },
		{
			title: "Action",
			dataIndex: "",
			colWidth: 80,
			className: "text-center",
			render: (_, item) => (
				<div className="flex justify-center items-center gap-x-2">
					<BsPencilSquare className="text-md cursor-pointer" onClick={() => navigate("/auth/admin/dashboard/update-product/" + item._id)} />
					<FcEmptyTrash className="text-xl cursor-pointer" onClick={() => deleteItem(item._id)} />
				</div>
			),
		},
	];

	return (
		<div className="container">
			{isShowForm === "" ? (
				<Button onClick={(e) => setShowForm("new")}>Add New Product</Button>
			) : (
				<Button onClick={(e) => setShowForm("")}>Cancel</Button>
			)}

			{/*{ isShowForm !== "" &&  addProduct() }*/}

			<h3>
				Products fetch {products.length} of {adminProducts.total}{" "}
			</h3>

			<div className="card">
				<Table
					fixed={true}
					scroll={{ x: 700, y: 600 }}
					dataSource={products ? products : []}
					columns={columns}
					tbodyClass={{
						tbody: "!max-h-96",
						td: "py-2 px-2",
						tr: "hover:bg-green-500/10",
					}}
				/>
			</div>
		</div>
	);
};

export default AllProducts;