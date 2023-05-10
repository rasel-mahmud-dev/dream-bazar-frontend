import React, {Component, FC} from "react";
import staticImagePath from "src/utills/staticImagePath";
import {Button} from "UI/index";
import ButtonGroup from "UI/Button/ButtonGroup";
import InputGroup from "UI/Form/InputGroup";
import Table from "UI/table/Table";
import Card from "UI/Form/Card/Card";
import useAppSelector from "src/hooks/useAppSelector";


const Wishlist: FC<{ renderOnDashboard?: boolean }> = ({renderOnDashboard = true}) => {

    const {} = useAppSelector(state=>state.authState)

    let data = []

    const columns = [
        {
            title: "Image", dataIndex: "img", render: (img) => (
                <div className="w-20 h-20 bg-neutral-300/20 flex justify-center items-center">
                    <img className="" src={staticImagePath(img)}/>
                </div>
            )
        },

        {title: "Details", dataIndex: "title"},
        {title: "No of Products", dataIndex: "qty"},
        {title: "Total", dataIndex: "total"},
        {
            title: "Action", dataIndex: "", className: "text-center", render: (_, item) => (
                <ButtonGroup className="m-auto">
                    <Button className="bg-green-450 text-white rounded-r-none !px-4">-</Button>
                    <div><h1 className="px-3 font-medium ">{item.qty}</h1></div>
                    <Button className="bg-green-450 text-white !px-4 rounded-l-none">+</Button>
                </ButtonGroup>
            )
        },
    ]


    return (
        <div className={`${!renderOnDashboard ? "container" : ""}`}>
            <div className="mt-4">
                <h1 className="heading-2">My Wishlist</h1>

                <Card>
                    <Table
                        theadClass={{th: "pt-2 px-4 pb-10"}}
                        tbodyClass={{tr: "hover:bg-green-100/50 cursor-pointer", td: "px-4 py-1"}}
                        dataSource={data} columns={columns}/>
                </Card>



            </div>
        </div>
    )
};

export default Wishlist;