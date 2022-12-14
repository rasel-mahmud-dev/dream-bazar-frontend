import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {deleteFlatCategoryAction} from "actions/productAction";
import {ACTION_TYPES} from "store/types";
import {Button} from "UI/index";
import {BsPencilSquare, FcEmptyTrash} from "react-icons/all";
import Table, {Column} from "UI/table/Table";
import isoStringToDate from "src/utills/isoStringToDate";
import {fetchFlatCategoriesAction} from "actions/adminProductAction";
import Card from "UI/Form/Card/Card";
import {Link, useNavigate} from "react-router-dom";

const Categories = (props) => {
    const {
        productState: {flatCategories},
    } = useSelector((state: RootState) => state);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        (async function () {
            try {
                await fetchFlatCategoriesAction(flatCategories, dispatch);
            } catch (ex) {
            }
        })();
    }, []);
    
    function deleteItem(id: any) {
        deleteFlatCategoryAction(dispatch, id, function (err, data) {
            if (!err) {
                dispatch({
                    type: ACTION_TYPES.DELETE_FLAT_CATEGORY,
                    payload: id,
                });
            } else {
                console.log(err);
            }
        });
    }
    
    const columns: Column[] = [
        {title: "Name", dataIndex: "name", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
        {title: "ID", dataIndex: "_id", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
        {title: "ParentID", dataIndex: "parentId", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
        {
            title: "Is Product Level",
            dataIndex: "isProductLevel",
            sorter: (a: string, b: string) => {
                console.log(a, b);
                return a > b ? 1 : 0;
            },
            render: (isProductLevel: any) => <span>{isProductLevel ? "True" : "False"}</span>,
        },
        {
            title: "CreatedAt",
            dataIndex: "createdAt",
            sorter: (a: string, b: string) => {
                let aDate = new Date(a);
                let bDate = new Date(b);
                return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
            },
            render: (createdAt) => <div>{isoStringToDate(createdAt)}</div>,
        },
        {
            title: "UpdatedAt",
            dataIndex: "updatedAt",
            sorter: (a: string, b: string) => {
                let aDate = new Date(a);
                let bDate = new Date(b);
                return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
            },
            render: (updatedAt) => <div>{isoStringToDate(updatedAt)}</div>,
        },
        {
            title: "Action",
            dataIndex: "",
            className: "text-center",
            render: (_, item: any) => (
                <div className="flex justify-center items-center gap-x-2">
					<BsPencilSquare className="text-md cursor-pointer" onClick={() => navigate(`/admin/categories/edit/${item._id}`)}/>
					<FcEmptyTrash className="text-xl cursor-pointer" onClick={() => deleteItem(item._id)}/>
				</div>
            ),
        },
    ];
    
    return (
        <div className="pr-4">
			<Card>
				<div className="flex justify-between items-center mb-4">
					<h3 className="heading-5">
						Category fetch {flatCategories?.length} of {flatCategories?.length}{" "}
					</h3>
                    <Link to="/admin/categories/new">
					    <Button className="bg-secondary-400 !py-2">New</Button>
                    </Link>
				</div>

				<Table
                    className=""
                    dataSource={flatCategories ? flatCategories : []}
                    columns={columns}
                    tbodyClass={{
                        tr: "hover:bg-green-500/10",
                    }}
                    fixed={true}
                    scroll={{x: 1000, y: 600}}
                />
			</Card>
		</div>
    );
};

export default Categories;

