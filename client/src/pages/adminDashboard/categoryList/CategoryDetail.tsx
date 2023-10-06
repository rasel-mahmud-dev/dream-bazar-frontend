import React, {useEffect, useState} from "react";

import {Button} from "UI/index";
import {FaPenAlt} from "react-icons/fa";
import Card from "UI/Form/Card/Card";
import Circle from "UI/Circle/Circle";
import {Link, useParams} from "react-router-dom";
import {fetchCategoryDetail} from "actions/categoryAction";
import {CategoryDetail} from "reducers/categoryReducer";


const CategoryDetails = () => {

    const [categoryDetail, setCategoryDetail] = useState<CategoryDetail>(null as unknown as CategoryDetail)

    const {id} = useParams()



    useEffect(() => {

        // fetchCategoryDetailsAction(categoryDetails, dispatch);

        fetchCategoryDetail(id as string).then(([data]) => {
            if(data) {
                setCategoryDetail(data)
            }
        })

    }, [id]);



    return (
        <div className="pr-4">
            <div>
                <div className="flex items-center justify-between mt-4">
                    <h1 className="heading-2">Category Detail</h1>

                    <Link to="/admin/category-details/new">
                        <Button className="bg-secondary-300">New</Button>
                    </Link>
                </div>
                <Card>
                    <h3 className="heading-5">

                    </h3>

                    {categoryDetail && (
                        <div className="border my-10 rounded-md relative p-5">
                            <div className="absolute right-2  top-2 flex gap-x-2">
                                <Link to={`/admin/categories/edit/${categoryDetail._id}`}>
                                    <Circle className=" !h-6 !w-6 hover:bg-green-450 hover:text-white">
                                        <FaPenAlt className="text-xs"/>
                                    </Circle>
                                </Link>
                            </div>

                            <h3 className="heading-4">{categoryDetail.name}</h3>

                            <code className="whitespace-pre-line ">
                                <pre className="overflow-x-auto">{JSON.stringify(categoryDetail, undefined, 2)}</pre>
                            </code>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default CategoryDetails;