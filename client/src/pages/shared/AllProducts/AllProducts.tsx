import React, {useEffect} from "react";
import {Button} from "UI/index";
import api from "src/apis";
import Table, {Column} from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";
import {BsPencilSquare, FcEmptyTrash} from "react-icons/all";
import {Link} from "react-router-dom";
import isoStringToDate from "src/utills/isoStringToDate";
import {fetchProducts} from "actions/adminProductAction";
import Switch from "UI/Form/switch/Switch";
import {ProductType} from "reducers/productSlice";
import {fetchBrands} from "actions/brandAction";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";
import usePrompt from "src/hooks/usePrompt";
import useScrollTop from "src/hooks/useScrollTop";
import {Roles} from "store/types";
import apis from "src/apis";


const AllProducts = (props) => {
    useScrollTop()

    const [products, setProducts] = React.useState<ProductType[]>([]);

    const {
        brandState: {allBrands},
        authState: { auth }
    } = useAppSelector(state => state)

    let isAdmin = auth && auth.roles?.includes(Roles.ADMIN)

    const dispatch = useAppDispatch()


    let prompt = usePrompt({
        title: "Are You sure to delete this Product?",
        deleteBtn: {
            onClick: handleDeleteItem
        }
    })


    useEffect(() => {

        (async function () {
            let [result, error] = await fetchProducts(1);
            if (result && !error) {
                setProducts(result)
            }

            if (!allBrands || allBrands?.length === 0) {
                dispatch(fetchBrands())
            }
        }())


    }, []);


    function updateProduct(productId, field) {
        const data = {...field};
        let formData = new FormData();
        for (let dataKey in data) {
            formData.append(dataKey, data[dataKey]);
        }
        formData.append("_id", productId)

        // send toke for different scope userActionTypes.ts
        apis
            .patch(`/api/product/${productId}`, formData)
            .then(({data, status}) => {
                let updatedProducts = [...products];
                let updatedProductIndex = updatedProducts.findIndex((p) => p._id === productId);
                if (updatedProductIndex !== -1) {
                    for (let updateProductKey in data.updateProduct) {
                        updatedProducts[updatedProductIndex][updateProductKey] = data.updateProduct[updateProductKey];
                    }
                    setProducts(updatedProducts);
                }
            });
    }

    function handleDeleteItem(id: string) {
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
                    <img src={staticImagePath(coverPhoto)} alt=""/>
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
            render: (isApproved, product) => (
                <Switch className="" on={isApproved} name="active-status" onChange={() => updateProduct(product._id, {isApproved: !isApproved})}/>
            ),
        },
        {
            dataIndex: "isActive",
            title: "Active Status",
            className: "whitespace-nowrap",
            render: (isActive, product) => (
                <Switch on={isActive} name="active-status" onChange={() => updateProduct(product._id, {isActive: !isActive})}/>
            ),
        },
        {title: "Category", dataIndex: "categoryId"},
        {title: "Brand", dataIndex: "brandId"},
        {
            title: "Price",
            dataIndex: "price",
            colWidth: 80,
            sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0),
            render: (price) => <span>${price}</span>,
        },
        {title: "Stock", dataIndex: "qty", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
        {title: "Sold", dataIndex: "sold", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
        {
            title: "Action",
            dataIndex: "",
            colWidth: 80,
            className: "text-center",
            render: (_, item) => (
                <div className="flex justify-center items-center gap-x-2">
                    <Link to={`/${isAdmin ? "admin": "seller"}/products/edit/${item._id}`}>
                        <BsPencilSquare className="text-md cursor-pointer"/>
                    </Link>
                    <FcEmptyTrash className="text-xl cursor-pointer" onClick={() => prompt.open(item._id)}/>
                </div>
            ),
        },
    ];



    return (
        <div className="">
            <div className="flex items-center justify-between mt-4">
                <h1 className="route-title !mt-0">Product List</h1>
                <Link to={`/${isAdmin ? "admin": "seller"}/products/new`}>
                    <Button theme="primary">Add New Product</Button>
                </Link>
            </div>

            {/*<h3>*/}
            {/*	Products fetch {products.length} of {adminProducts.total}{" "}*/}
            {/*</h3>*/}

            <div className="card">
                <Table
                    fixed={true}
                    scroll={{x: 900, y: 600}}
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
