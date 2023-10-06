import React, {useEffect, useReducer, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {deleteFlatCategoryAction} from "actions/productAction";
import {ACTION_TYPES} from "store/types";
import {Button, Pagination} from "UI/index";
import {FcEmptyTrash} from "react-icons/fc";
import {BsPencilSquare} from "react-icons/bs";
import Table, {Column} from "UI/table/Table";
import isoStringToDate from "src/utills/isoStringToDate";
import {Link, useNavigate} from "react-router-dom";
import makeFlatToNested from "src/utills/makeFlatToNested";

import "./styles.scss";
import {fetchFlatCategoriesAction} from "actions/categoryAction";
import usePrompt from "src/hooks/usePrompt";
import staticImagePath from "src/utills/staticImagePath";


const Categories = (props) => {
    const {
        categoryState: {flatCategories},
    } = useSelector((state: RootState) => state);


    let prompt = usePrompt({
        title: "Are You sure to delete category ?",
        deleteBtn: {
            onClick: handleDeleteItem, label: "DELETE"
        },
        cancelBtn: {label: "CANCEL"}
    })


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [viewAsTable, setViewAsTable] = useState<boolean>(true)
    const [deepNestedCategory, setDeepNestedCategory] = useState<any>()


    const [paginationState, setPaginationState] = useReducer((prevState, action) => ({
        ...prevState,
        ...action,
    }), {
        perPage: 15,
        currentPage: 1,
        totalItem: 0,
    })


    useEffect(() => {
        (async function () {
            try {
                await fetchFlatCategoriesAction(flatCategories, dispatch);
            } catch (ex) {
            }
        })();
    }, []);

    useEffect(() => {
        if (!viewAsTable && !deepNestedCategory) {
            setDeepNestedCategory(makeFlatToNested(flatCategories))
        }
    }, [viewAsTable])


    function handleDeleteItem(id: string) {
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
        {
            dataIndex: "logo",
            title: "Image",
            render: (image) => (
                <img className="w-7" src={staticImagePath(image)} alt=""/>
            ),
        },
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
            render: (isProductLevel: any) => <span className="text-center">{isProductLevel ? "True" : "False"}</span>,
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
                    {/*<Link to={`/admin/categories/${item._id}`}><CgEye className="text-lg cursor-pointer" onClick={() => deleteItem(item._id)}/> </Link>*/}
                    <BsPencilSquare className="text-md cursor-pointer" onClick={() => navigate(`/admin/categories/edit/${item._id}`)}/>
                    {/*<FcEmptyTrash className="text-xl cursor-pointer" onClick={() => deleteItem(item._id)}/>*/}
                    <FcEmptyTrash className="text-xl cursor-pointer" onClick={() => prompt.open<string>(item._id)}/>
                </div>
            ),
        },
    ];


    function renderNestingCategory(deepNestedCategory) {
        function renderRecursively(item) {
            return (
                <li>
                    <h4>{item.name}</h4>
                    <ul>
                        {item.sub && item.sub.map(ii => renderRecursively(ii))}
                    </ul>
                </li>
            )
        }

        return (
            <div className="deep-nested-category">
                <h1 className="heading-4">Deep nesting category view</h1>
                {deepNestedCategory?.map(item => (
                    <ul>
                        {renderRecursively(item)}
                    </ul>
                ))}
            </div>
        )
    }

    return (
        <div className="">
            <div className="dashboard-card my-4 ">
                <div className="flex justify-between items-center p-4">
                    <h3 className="heading-5">
                        Category fetch {flatCategories?.length} of {flatCategories?.length}{" "}
                    </h3>
                    <div className="flex items-center gap-x-4">
                        <Button onClick={() => setViewAsTable(!viewAsTable)}
                                className="bg-secondary-400 !py-2">{viewAsTable ? "View as Deep Nesting" : "Table View"}</Button>
                        <Link to="/admin/categories/new">
                            <Button className="bg-secondary-400 !py-2">New</Button>
                        </Link>
                    </div>
                </div>

                {viewAsTable ? <Table
                    className=""
                    dataSource={flatCategories ? flatCategories.slice(paginationState.perPage * (paginationState.currentPage - 1),
                        paginationState.perPage * (paginationState.currentPage)) : []}
                    columns={columns}
                    tbodyClass={{
                        tr: "hover:bg-primary-500/10",
                    }}
                /> : renderNestingCategory(deepNestedCategory)}

            </div>

            {viewAsTable && (
                <Pagination
                    className="!justify-end mt-5"
                    onChange={(p)=>setPaginationState({currentPage: p})}
                    totalItem={flatCategories?.length || 0}
                    perPage={paginationState.perPage}
                    currentPage={paginationState.currentPage}/>
            )}

        </div>
    );
};

export default Categories;



