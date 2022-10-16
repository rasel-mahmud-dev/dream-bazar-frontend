import React from "react";
import { Button, Modal, Select, File, Tabs } from "components/UI";
import api from "src/apis";
import fullLink from "src/utills/fullLink";
import Table from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import { BsPencilSquare, FcEmptyTrash } from "react-icons/all";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const AllProducts = (props) => {
	const navigate = useNavigate();
	const [count, setCount] = React.useState();
	const [products, setProducts] = React.useState<any[]>([]);
	const [categories, setCategories] = React.useState([]);
	const [brands, setBrands] = React.useState([]);
	const [isShowForm, setShowForm] = React.useState("");
	const [staticImages, setStaticImages] = React.useState([]);
	const [isShowCoverPhotoHandler, setShowCoverPhotoHandler] =
		React.useState(false);

	React.useEffect(() => {
		Promise.allSettled([
			api.get("/api/products"),
			api.get("/api/categories/?type=lastLevel"),
			api.get("/api/brands"),
		]).then((result) => {
			console.log(result);
			if (result[0].status === "fulfilled") {
				setCount(result[0].value.data.total);
				setProducts(result[0].value.data.products);
			}
			if (result[1].status === "fulfilled") {
				setCategories(result[1].value.data.categories);
			}
			if (result[2].status === "fulfilled") {
				setBrands(result[2].value.data.brands);
			}
		});
	}, []);

	const [productData, setProductData] = React.useState({});
	const [updatedProductCopy, setUpdateProductCopy] = React.useState<any>({});

	function productFetchForUpdate(product) {
		// setShowForm("update");
		// let updatedProductData = {...productData}
		// for(let i=0; i<d.length; i++){
		//   if(product[d[i].name]){
		//       updatedProductData[d[i].name] = product[d[i].name]
		//     }
		//   }
		// setProductData(updatedProductData)
		// setUpdateProductCopy(product)
	}

	function deleteItem(id) {
		api.delete(`/api/product/${id}`).then((response) => {
			if (response.status === 201) {
				setProducts(products.filter((p: any) => p._id !== id));
			}
		});
	}

	//  load all static files...
	function fetchStaticFiles() {
		api.get("/api/static-file").then((response) => {
			setStaticImages(response.data);
		});
	}

	// when choose new image form modal inside File Input
	function handleChangeLogo(e) {
		if (e.target.type === "file") {
			setProductData({
				...productData,
				[e.target.name]: e.target.file,
				fileName: e.target.fileName,
			});
		} else {
			setProductData({
				...productData,
				[e.target.name]: e.target.value,
			});
		}
	}

	// render photo handler modal that an image can upload or get cdn link
	function showPhotoHandler() {
		// key ===  2 contains all static image files
		function handleTabChange(key) {
			// if(key === "2") fetchStaticFiles()
		}
		return (
			<Modal>
				<Tabs defaultActiveKey="1" onChange={handleTabChange}>
					<TabPane tab="Upload a new image" key="1">
						{/*<Input */}
						{/*  name="logo" */}
						{/*  label="Logo image cdn link" */}
						{/*  onChange={handleChangeLogo} */}
						{/*  />*/}
						<span>or</span>
						<File
							type="file"
							name="logo"
							onChange={handleChangeLogo}
							label="Choose a photo"
						/>
					</TabPane>

					<TabPane tab="Images Gallery" key="2">
						<div className="d-flex">
							{staticImages.map((path) => (
								<div className="static-image-thumbs">
									<img
										// onClick={()=>chooseImageFromStatic(path)}
										src={fullLink(path)}
									/>
								</div>
							))}
						</div>
					</TabPane>
				</Tabs>

				{/*<Button onClick={()=>setShowLogoHandler(false)}>Cancel</Button>*/}
				<Button>Save</Button>
			</Modal>
		);
	}

	const columns = [
		{
			title: "Image",
			colWidth: 80,
			dataIndex: "coverPhoto",
			render: (item) => (
				<div className="w-8">
					<img src={staticImagePath(item.coverPhoto)} alt="" />
				</div>
			),
		},
		{
			title: "Title",
			dataIndex: "title",
			search: () => (
				<div>
					<input type="text" placeholder="Search" />
				</div>
			),
		},
		{
			title: "Added",
			dataIndex: "createdAt",
			render: (item) => (
				<span>{new Date(item.createdAt).toDateString()}</span>
			),
		},
		{ title: "Category", dataIndex: "categoryId" },
		{ title: "Brand", dataIndex: "brandId" },
		{
			title: "Price",
			dataIndex: "price",
			colWidth: 80,
			render: (item) => <span>${item.price}</span>,
		},
		{ title: "Stock", dataIndex: "qty", colWidth: 50 },
		{ title: "Sold", dataIndex: "sold", colWidth: 50 },
		{
			title: "Action",
			dataIndex: "",
			colWidth: 80,
			className: "text-center",
			render: (item) => (
				<div className="flex justify-center items-center gap-x-2">
					<BsPencilSquare
						className="text-md cursor-pointer"
						onClick={() =>
							navigate(
								"/auth/admin/dashboard/update-product/" +
									item._id
							)
						}
					/>
					<FcEmptyTrash
						className="text-xl cursor-pointer"
						onClick={() => deleteItem(item._id)}
					/>
				</div>
			),
		},
	];

	return (
		<div className="container">
			{isShowForm === "" ? (
				<Button onClick={(e) => setShowForm("new")}>
					Add New Product
				</Button>
			) : (
				<Button onClick={(e) => setShowForm("")}>Cancel</Button>
			)}

			{/*{ isShowForm !== "" &&  addProduct() }*/}

			<h3>
				Products fetch {products.length} of {count}{" "}
			</h3>

			<div className="card">
				<Table
					className="table-fixed "
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
