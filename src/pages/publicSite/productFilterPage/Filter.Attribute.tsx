import React, {FC, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import apis from "src/apis";
import {ACTION_TYPES} from "store/types";
import {FaAngleRight, FaAngleUp} from "react-icons/all";
import {ToggleProductAttributeAction} from "store/types/productActionTypes";
import useAppSelector from "src/hooks/useAppSelector";

interface Props {

}


const FilterAttribute: FC<Props> = (props) => {
    const {
        productState:  {filters},
        categoryState: { categoryDetailCache, category }
    } = useAppSelector(state => state);


    const dispatch = useDispatch()
    const filterAttributesValues = useRef<[]>()
    const currentCategoryId = useRef<string>()


    useEffect(() => {

        if (category.selected) {
            apis.get("/api/category/category-detail?categoryId="+category.selected.id).then(({data, status})=>{
                // console.log(data, status)
                if(status === 200){
                    currentCategoryId.current = category?.selected?.id || ""
                    dispatch({
                        type: ACTION_TYPES.FETCH_CATEGORY_DETAILS,
                        payload: {
                            ...data,
                            catId: data.catId,
                        }
                    })

                }

            }).catch(ex=>{
                console.log(ex)
            })
        }
    }, [category.selected])



    useEffect(()=>{
        if(category.selected) {
            filterAttributesValues.current = categoryDetailCache?.[category.selected.id]?.filterAttributesValues
        }
    }, [categoryDetailCache, category.selected])


    function isExpand(attributeName: string){
        return categoryDetailCache?.[currentCategoryId.current].defaultExpand.includes(attributeName)
    }


    function handleToggleExpand(attributeName: string){
        dispatch<ToggleProductAttributeAction>({
            type: ACTION_TYPES.TOGGLE_PRODUCT_ATTRIBUTE,
            payload: {
                attributeName,
                categoryId: category.selected?.id || ""
            }
        })
    }


    return (
        <div>
            <div>
                { filterAttributesValues.current && (
                    <div>
                        {filterAttributesValues.current && filterAttributesValues.current.map(attr=>(
                            <div className="py-2">
                                <div className="flex justify-between items-center hover:bg-primary-600/10 cursor-pointer px-2 py-2 rounded"
                                     onClick={()=>handleToggleExpand(attr.attributeName)}>
                                    <h4 className="font-medium">{attr.attributeLabel}</h4>
                                    { isExpand(attr.attributeName)
                                        ? <FaAngleUp/>
                                        : <FaAngleRight />
                                    }
                                </div>
                                <div className="ml-2">
                                    { isExpand(attr.attributeName) && (
                                        <div>
                                            { attr.options.map(opt=>(
                                                <div className="flex items-center gap-x-2 py-1">
                                                    <input type="checkbox" />
                                                    <label htmlFor="">{opt.name}</label>
                                                </div>
                                            ))  }
                                        </div>
                                    ) }
                                </div>

                            </div>
                        ))}
                    </div>
                ) }
            </div>
        </div>
    );
};

export default FilterAttribute;