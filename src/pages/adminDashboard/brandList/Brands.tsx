import React, {useEffect} from "react";
import {Button} from "UI/index";
import Table from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";

import {BsPencilSquare, FcEmptyTrash} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "src/store";
import {Link, useNavigate} from "react-router-dom";
import Card from "UI/Form/Card/Card";
import isoStringToDate from "src/utills/isoStringToDate";
import {fetchBrands} from "actions/brandAction";
import {ACTION_TYPES} from "store/types";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";

const AllBrands = (props) => {
    const {
        brandState: { allBrands },
    } = useAppSelector(state => state);

    
    const dispatch = useAppDispatch();
    
    const navigate = useNavigate();


    useEffect(() => {
        if(allBrands.length === 0) {
            dispatch(fetchBrands());
        }
    }, []);
    
    function deleteItem(_id: string) {
        dispatch({
            type: ACTION_TYPES.FETCH_BRANDS,
            payload: allBrands.filter( b => b._id !== _id),
        })
    }


    const columns = [
        {
            title: "Logo",
            dataIndex: "logo",
            render: (logo) => (
                <div className="w-8">
					<img src={staticImagePath(logo)} alt=""/>
				</div>
            ),
        },
        {title: "Name", dataIndex: "name", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
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
            className: "center_in_div",
            render: (_, item) => (
                <div className="flex justify-center items-center gap-x-2">
					<BsPencilSquare className="text-md cursor-pointer" onClick={() => navigate(`/admin/brands/edit/${item._id}`)}/>
					<FcEmptyTrash className="text-xl cursor-pointer" onClick={() => deleteItem(item._id)}/>
				</div>
            ),
        },
    ];

    
    return (
        <Card>
			<div className="flex justify-between items-center mb-4">
				<span className="p flex items-center">
					<h1 className="heading-2 mr-4">Brands</h1>
                    {allBrands?.length} of {allBrands?.length}{" "}
				</span>
				<Link to="/admin/brands/new">
					<Button className="bg-secondary-300">Add New Brand</Button>
				</Link>
			</div>

			<Table
                dataSource={allBrands}
                columns={columns}
                tbodyClass={{
                    tr: "hover:bg-green-500/10",
                }}
                fixed={true}
                scroll={{x: 500, y: 600}}
            />
		</Card>
    );
};

export default AllBrands;