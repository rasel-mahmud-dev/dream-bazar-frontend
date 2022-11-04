import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";

import {Button} from "UI/index";
import {FaPenAlt, FaTimes} from "react-icons/all";
import {fetchCategoryDetailsAction} from "actions/adminProductAction";
import Card from "UI/Form/Card/Card";
import Circle from "UI/Circle/Circle";
import apis from "src/apis";
import {StatusCode} from "store/types";
import {Link} from "react-router-dom";

const CategoryDetails = () => {
    const {
        adminState: {categoryDetails},
    } = useSelector((state: RootState) => state);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetchCategoryDetailsAction(categoryDetails, dispatch);
    }, []);
    
    // deleted attribute handler
    function deleteItem(id: string) {
        apis.delete("/api/category/detail/" + id).then(({status}) => {
            if (status === StatusCode.Ok) {
                fetchCategoryDetailsAction(
                    categoryDetails.filter((catDetail) => catDetail._id !== id),
                    dispatch
                );
            }
        });
    }
    
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
						Fetch {categoryDetails?.length} of {categoryDetails?.length}{" "}
					</h3>
                    
                    {categoryDetails?.map((catDet, index) => (
                        <div className="border my-10 rounded-md relative p-5">
							<div className="absolute right-2  top-2 flex gap-x-2">
								<Link to={`/admin/category-details/edit/${catDet._id}`}>
									<Circle className=" !h-6 !w-6 hover:bg-green-450 hover:text-white">
										<FaPenAlt className="text-xs"/>
									</Circle>
								</Link>

								<Circle className=" !h-6 !w-6 hover:bg-red-400 hover:text-white" onClick={() => deleteItem(catDet._id)}>
									<FaTimes className="text-xs"/>
								</Circle>
							</div>
							<span>SL: {index + 1}</span>
							<h3 className="heading-4">{catDet?.currentCategory?.name}</h3>

							<code className="whitespace-pre-line ">
								<pre className="overflow-x-auto">{JSON.stringify(catDet, undefined, 2)}</pre>
							</code>
						</div>
                    ))}
				</Card>
			</div>
		</div>
    );
};

export default CategoryDetails;


