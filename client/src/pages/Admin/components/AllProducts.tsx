import React from "react";
import { Button, Modal, Select, File, Tabs } from "components/UI";
import api from "src/apis";
import fullLink from "src/utills/fullLink";
import Table, {Column} from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import { BsPencilSquare, FcEmptyTrash } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import isoStringToDate from "src/utills/isoStringToDate";

const { TabPane } = Tabs;

const AllProducts = (props) => {
	const navigate = useNavigate();
	const [count, setCount] = React.useState();
	const [products, setProducts] = React.useState<any[]>([]);
	const [categories, setCategories] = React.useState([]);
	const [brands, setBrands] = React.useState([]);
	const [isShowForm, setShowForm] = React.useState("");
	const [staticImages, setStaticImages] = React.useState([]);
	const [isShowCoverPhotoHandler, setShowCoverPhotoHandler] = React.useState(false);

	React.useEffect(() => {
		Promise.allSettled([
			api.get("/api/products?perPage=200"),
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
            sorter: (a: string, b: string)=> a > b ? 1 : a < b ? -1 : 0,
			// search: () => (
			// 	<div>
			// 		<input type="text" placeholder="Search" />
			// 	</div>
			// ),
		},
		{
			title: "Added",
			dataIndex: "createdAt",
            sorter: (a: string, b: string)=> {
                let aDate = new Date(a)
                let bDate = new Date(b)
                return aDate > bDate ? 1 : aDate < bDate ? -1 : 0
            },
			render: (createdAt) => (
				<span>{isoStringToDate(createdAt)}</span>
			),
		},{
			title: "Updated",
			dataIndex: "updatedAt",
            sorter: (a: string, b: string)=> {
                let aDate = new Date(a)
                let bDate = new Date(b)
                return aDate > bDate ? 1 : aDate < bDate ? -1 : 0
            },
			render: (updatedAt) => (
				<span>{isoStringToDate(updatedAt)}</span>
			),
		},
		{ title: "Category", dataIndex: "categoryId" },
		{ title: "Brand", dataIndex: "brandId" },
		{
			title: "Price",
			dataIndex: "price",
			colWidth: 80,
            sorter: (a: string, b: string)=> a > b ? 1 : a < b ? -1 : 0,
			render: (price) => <span>${price}</span>,
		},
		{ title: "Stock", dataIndex: "qty", sorter: (a: string, b: string)=> a > b ? 1 : a < b ? -1 : 0 },
		{ title: "Sold", dataIndex: "sold", sorter: (a: string, b: string)=> a > b ? 1 : a < b ? -1 : 0 },
		{
			title: "Action",
			dataIndex: "",
			colWidth: 80,
			className: "text-center",
			render: (_, item) => (
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
					fixed={true}
                    scroll={{x: 700, y: 600}}
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
