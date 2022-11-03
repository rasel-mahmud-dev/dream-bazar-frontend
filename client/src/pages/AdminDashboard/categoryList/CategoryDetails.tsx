import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { toggleBackdrop } from "actions/appAction";

import {Button, Modal} from "UI/index";
import { FaPenAlt, FaTimes} from "react-icons/all";
import {deleteCategoryDetailsAction, fetchCategoryDetailsAction,} from "actions/adminProductAction";
import Card from "UI/Form/Card/Card";
import Circle from "UI/Circle/Circle";

import AddCategoryDetailForm from "pages/adminDashboard/categoryList/AddCategoryDetailForm";

const CategoryDetails = (props) => {
    const {
        productState: { flatCategories },
        adminState: { productAttributes, categoryDetails }
    } = useSelector((state: RootState) => state);
    
    const dispatch = useDispatch();
    
    const [state, setState] = React.useState<any>({
        isShowForm: false,
        updateId: "",
        formData: {
            name: { value: "", errorMessage: "" },
            isProductLevel: { value: false, errorMessage: "" },
            parentId: { value: "", errorMessage: "" },
        },
    });
    
    const { formData, isShowForm, updateId } = state;
    
    React.useEffect(() => {
        (async function () {
            try {
                await fetchCategoryDetailsAction(categoryDetails, dispatch);
            } catch (ex) {}
        })();
    }, []);
    
    
    function deleteItem(id: any) {
        deleteCategoryDetailsAction(id,dispatch)
    }

    
    function clearField() {
        let update = { ...formData };
        for (let updateKey in update) {
            if (update[updateKey] && update[updateKey].value) {
                update[updateKey].value = "";
            }
        }
        return update;
    }
    
    function handleShowAddForm(isOpen = false) {
        setState({
            ...state,
            updateId: "",
            httpResponse: "",
            isShowForm: isOpen,
            formData: clearField(),
        });
        
        dispatch(
            toggleBackdrop({
                isOpen: isOpen,
                scope: "custom",
            })
        );
    }
    
    function setUpdateBrandHandler(catDetail) {
        let updateFormData = { ...state.formData };
        // if (cat.name) {
        //     updateFormData.name = { value: cat.name, errorMessage: "" };
        // }
        // if (cat.parentId) {
        //     updateFormData.parentId = { value: cat.parentId, errorMessage: "" };
        // }
        // if (cat.isProductLevel) {
        //     updateFormData.isProductLevel = { value: cat.isProductLevel, errorMessage: "" };
        // }
        
        setState({
            ...state,
            isShowForm: true,
            updateId: catDetail._id,
            formData: updateFormData,
        });
        dispatch(
            toggleBackdrop({
                isOpen: true,
                scope: "custom",
            })
        );
    }
    
    function closeModal(){
        setState(p=>({
            ...p,
            isShowForm: false
        }))
        dispatch(
            toggleBackdrop({
                isOpen: false,
                scope: "custom",
            })
        );
    }
    
    
    return (
		<div className="pr-4">
			<Modal isOpen={state.isShowForm} modalClass="bg-red-500 h-full !max-w-md !top-10" contentSpaceY={200} onCloseModal={closeModal}>
				<AddCategoryDetailForm
					updateId={state.updateId}
					productAttributes={productAttributes}
					onCloseForm={closeModal}
					flatCategories={flatCategories}
				/>
			</Modal>

			<div className="flex items-center justify-between mt-4">
				<h1 className="heading-2">Category Detail</h1>
				{!updateId ? (
					<Button className="mt-4 bg-secondary-300" onClick={() => handleShowAddForm(true)}>
						New Category Detail
					</Button>
				) : (
					<Button onClick={closeModal}>Cancel</Button>
				)}
			</div>
			<Card>
				<h3 className="heading-5">
					Fetch {categoryDetails?.length} of {categoryDetails?.length}{" "}
				</h3>

				{categoryDetails?.map((catDet, index) => (
					<div className="border my-10 rounded-md relative p-5">
						<div className="absolute right-2  top-2 flex gap-x-2">
							<Circle className=" !h-6 !w-6 hover:bg-green-450 hover:text-white" onClick={() => setUpdateBrandHandler(catDet)}>
								<FaPenAlt className="text-xs" />
							</Circle>

							<Circle className=" !h-6 !w-6 hover:bg-red-400 hover:text-white" onClick={() => deleteItem(catDet._id)}>
								<FaTimes className="text-xs" />
							</Circle>
						</div>
                        <span>SL: {index + 1}</span>
						<h3 className="heading-4">
							{catDet?.currentCategory?.name}
						</h3>

						<code className="whitespace-pre-line">
							<pre>{JSON.stringify(catDet, undefined, 2)}</pre>
						</code>
					</div>
				))}
			</Card>
		</div>
	);
};

export default CategoryDetails;


