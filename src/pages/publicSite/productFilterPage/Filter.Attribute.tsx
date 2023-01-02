import React, {FC, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import apis from "src/apis";
import {ACTION_TYPES} from "store/types";

interface Props {

}


const FilterAttribute: FC<Props> = (props) => {
    const {filters, categoryDetail} = useSelector((state: RootState) => state.productState);

    const dispatch = useDispatch()
    const currentCategoryId = useRef<string>("")


    useEffect(() => {

        if (filters.category.selected) {
            apis.get("/api/category/category-detail?categoryId="+filters.category.selected.id).then(({data, status})=>{
                // console.log(data, status)
                if(status === 200){
                    dispatch({
                        type: ACTION_TYPES.FETCH_CATEGORY_DETAILS,
                        payload: {
                            ...data,
                            catId: data.catId,
                        }
                    })
                    currentCategoryId.current = filters?.category?.selected?.id || ""
                }

            }).catch(ex=>{
                console.log(ex)
            })

        }
    }, [filters.category.selected])



    return (
        <div>
            <div>
                { categoryDetail?.[currentCategoryId.current] && (
                    <div>
                        {categoryDetail?.[currentCategoryId.current]?.filterAttributesValues?.map(attr=>(
                            <div className="py-4">
                                <h4 className="font-medium mb-2">{attr.attributeLabel}</h4>
                                { attr.options.map(opt=>(
                                    <div className="flex items-center gap-x-2 py-1">
                                        <input type="checkbox" />
                                        <label htmlFor="">{opt.name}</label>
                                    </div>
                                ))  }

                            </div>
                        ))}
                    </div>
                ) }
            </div>
        </div>
    );
};

export default FilterAttribute;