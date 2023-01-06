import React, {FC, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ACTION_TYPES} from "store/types";
import {FaAngleRight, FaAngleUp} from "react-icons/all";
import {ChangeProductAttributeAction, ToggleProductAttributeAction} from "store/types/productActionTypes";
import useAppSelector from "src/hooks/useAppSelector";
import {fetchCategoryDetailAction} from "actions/categoryAction";
import {Attribute} from "reducers/categoryReducer";

interface Props {

}


const FilterAttribute: FC<Props> = (props) => {
    const {
        productState: {filters},
        categoryState: {categoryDetailCache, category, attributeExpand}
    } = useAppSelector(state => state);


    const dispatch = useDispatch()



    let currentCategoryID = category.selected?._id  || ""

    useEffect(() => {

        if (category.selected) {
            currentCategoryID = category.selected._id
            // only fetch category default if not it previously fetched
            if(!categoryDetailCache[currentCategoryID]) {
                fetchCategoryDetailAction(dispatch, currentCategoryID)
            }
        }
    }, [currentCategoryID])




    // check is product attribute section expand or not
    function isExpand(attributeName: string) {
        return attributeExpand[currentCategoryID]?.includes(attributeName)
    }


    // toggle product attribute section
    function handleToggleAttributeSection(attributeName: string) {
        dispatch<ToggleProductAttributeAction>({
            type: ACTION_TYPES.TOGGLE_ATTRIBUTE_SECTION,
            payload: {
                attributeName,
                categoryId: currentCategoryID
            }
        })
    }


    // change attribute value change action
    function changeAttributeValue(attribute: Attribute, opt) {
        dispatch<ChangeProductAttributeAction>({
            type: ACTION_TYPES.CHANGE_ATTRIBUTE_VALUES,
            payload: {
                attributeName: attribute.attributeName,
                attributeValue: opt.value
            }
        })
    }

    // check if is selected attribute values
    function checkIsSelected(attributeName: string, attributeValue: string | number) {
        let attribute = filters.attributes[attributeName];
        return attribute && attribute.includes(attributeValue)
    }



    return (
        <div>
            <div>
                {categoryDetailCache[currentCategoryID] && categoryDetailCache[currentCategoryID].filterAttributesValues  && (
                    <div>
                        {categoryDetailCache[currentCategoryID].filterAttributesValues?.map((attr: Attribute) => (
                            <div className="py-2">
                                <div className="flex justify-between items-center hover:bg-primary-600/10 cursor-pointer px-2 py-2 rounded"
                                     onClick={() => handleToggleAttributeSection(attr.attributeName)}>
                                    <h4 className="font-medium">{attr.attributeLabel}</h4>
                                    {isExpand(attr.attributeName)
                                        ? <FaAngleUp/>
                                        : <FaAngleRight/>
                                    }
                                </div>
                                <div className="ml-2">
                                    {isExpand(attr.attributeName) && (
                                        <div>
                                            {attr.options.map(opt => (
                                                <div className="flex items-center gap-x-2 py-1">
                                                    <input
                                                        checked={checkIsSelected(attr.attributeName, opt.value)}
                                                        onChange={(e) => changeAttributeValue( attr, opt)}
                                                        type="checkbox"
                                                        id={attr.attributeName + opt.name}
                                                    />
                                                    <label htmlFor={attr.attributeName + opt.name}>{opt.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterAttribute;