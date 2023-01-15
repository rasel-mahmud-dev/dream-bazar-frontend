import React, {useEffect} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom"
import {Button} from "UI/index"

import {fetchAllStores, updateStoreAction} from "actions/authAction";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";
import staticImagePath from "src/utills/staticImagePath";
import isoStringToDate from "src/utills/isoStringToDate";

import Table from "UI/table/Table";
import usePrompt from "src/hooks/usePrompt";
import Switch from "UI/Form/switch/Switch";
import Card from "UI/Form/Card/Card";
import useScrollTop from "src/hooks/useScrollTop";


const StoreList = (props) => {
    useScrollTop()

    const {authState: {auth, stores}} = useAppSelector(state => state)

    const dispatch = useAppDispatch();

    const navigate = useNavigate();


    let prompt = usePrompt({
        title: "Are You sure to delete brand ?",
        deleteBtn: {}
    })


    useEffect(() => {
        dispatch(fetchAllStores())
    }, [])


    function handlePushBack() {
        // history.back()
        // history.goBack()
    }

    function handleUpdateStore(storeId, data) {
        dispatch(updateStoreAction({shopId: storeId, update: data }))
    }


    const columns = [
        {
            title: "Logo",
            dataIndex: "shopLogo",
            render: (logo) => (
                <div className="w-8">
                    <img src={staticImagePath(logo)} alt=""/>
                </div>
            ),
        },
        {title: "Name", dataIndex: "shopName", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
        {title: "Seller", dataIndex: "seller", sorter: (a: {username: string}, b: {username: string}) => (a.username > b.username ? 1 : a.username < b.username ? -1 : 0), render: (_, item)=> item?.seller.username},
        {
            dataIndex: "isSuspense",
            title: "Is Suspense",
            className: "whitespace-nowrap",
            render: (isSuspense, store) => (
                <Switch className="" on={isSuspense} name="active-status" onChange={() => handleUpdateStore(store._id, {isSuspense: !isSuspense})}/>
            ),
        },
        {
            dataIndex: "isApproved",
            title: "Is Approved",
            className: "whitespace-nowrap",
            render: (isApproved, store) => (
                <Switch className="" on={isApproved} name="active-status" onChange={() => handleUpdateStore(store._id, {isApproved: !isApproved})}/>
            ),
        },
        {
            dataIndex: "isActive",
            title: "Status",
            className: "whitespace-nowrap",
            render: (isActive) => (
                <h3>{isActive ? "Active" : "In Active"}</h3>
            ),
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
        }
    ];


    return (
        <Card>
            <div className="mb-4">
                <h1 className="heading-2 mr-4">All Stores ({stores?.length})</h1>
            </div>

            <div>
                {stores && stores?.length > 0 ? (
                    <Table
                        dataSource={stores}
                        columns={columns}
                        tbodyClass={{
                            tr: "hover:bg-green-500/10",
                        }}
                        fixed={true}
                        scroll={{x: 500, y: 600}}
                    />
                ) : (
                    <h4 className="heading-4">No Store found</h4>
                )}


                <Button onClick={handlePushBack}>Registration Now</Button>
            </div>


        </Card>
    )
}


export default StoreList