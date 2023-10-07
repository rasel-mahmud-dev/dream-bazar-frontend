import React, {useEffect, useState} from 'react';
import {ACTION_TYPES} from "store/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import useLanguage from "src/hooks/useLanguage";
import {setFilter} from "actions/filterSidebar.action";
import {FaAngleRight, FaAngleUp} from "react-icons/fa";
import {Button} from "UI/index";
import apis from "src/apis";


const BrandList = ({currentFullCategoryName}) => {
    const dispatch = useDispatch()
    const {
        brandState: {brandsForCategory},
        categoryState: {category},
        productState: {filters}
    } = useSelector((state: RootState) => state)

    const l = useLanguage();

    const [expandBrand, setExpandBrand] = useState(true)


    let currentCategoryId = category.selected?._id || ""

    useEffect(()=>{
    	apis.get("/api/v1/brands").then(res=>{
    		dispatch({
    			type: ACTION_TYPES.FETCH_BRANDS,
    			payload: {
    				brands: res.data,
    				categoryId: 'all'
    			}
    		})
    	})
    }, [])


    function handleChangeBrand(brand) {
        dispatch({
            type: ACTION_TYPES.SELECT_FILTER_BRAND,
            payload: brand
        })
    }


    function isChecked(brandId: string) {
        return filters.brands?.findIndex(b => b._id === brandId) !== -1 || false
    }

    useEffect(() => {
        // let a = filters.category
        //     && filters.category.selected
        //     && brandsForCategory[filters.category.selected.name]
        //     && brandsForCategory[filters.category.selected.name]

    }, [filters, brandsForCategory])

    console.log(filters.brands)
    console.log(brandsForCategory)


    return (
        <div>


            {/*Selected brand  */}


            {/**** show all selected brand *********/}
            {filters.brands && filters.brands.length > 0 && <div className="flex flex-wrap gap-2 my-4">
                {filters.brands.map(brand => (
                    <div
                        onClick={() => handleChangeBrand(brand)}
                        className="bg-primary-600/10 px-2 py-1 rounded flex justify-between text-xs">
                        <span>{brand.name}</span>
                        <span className="ml-2 text-red-500 font-medium cursor-pointer">x</span>
                    </div>
                ))}

            </div>}


            <div className="mt-4">

                <div className="flex justify-between items-center hover:bg-primary-600/10 cursor-pointer px-2 py-2 rounded"
                     onClick={() => setExpandBrand(!expandBrand)}>
                    <p className="sidebar-section-label font-medium">{l("BRANDS")}</p>
                    {expandBrand ? <FaAngleUp/> : <FaAngleRight/>}
                </div>

                {expandBrand && (
                    <div>

                        {filters.brands.length > 0 && (
                            <div className="flex justify-between items-center mb-4 px-2">
                                <h5 className="font-medium">Selected {filters.brands.length} Brands</h5>
                                <Button onClick={()=>dispatch(({type: ACTION_TYPES.CLEAR_FILTER_BRAND}))} theme="primary" className="!py-1 !text-sm">Clear All</Button>
                            </div>
                        )}


                        <div className="ml-2">
                            {brandsForCategory[currentFullCategoryName]?.map((brand, index) => (
                                <li key={index}
                                    onClick={() => handleChangeBrand(brand)}
                                    className="flex items-center gap-x-2 py-1">
                                    <input onChange={() => {
                                    }} type="checkbox" checked={isChecked(brand._id)}/>
                                    <label className="cursor-pointer ml-2">{brand.name}</label>
                                </li>
                            ))}

                            {/*{filters.category*/}
                            {/*    && filters.category.selected*/}
                            {/*    && brandsForCategory[filters.category.selected.name]*/}
                            {/*    && brandsForCategory[filters.category.selected.name].map(brand => (*/}
                            {/*        <li key={brand._id}*/}
                            {/*        onClick={() => handleChangeBrand(brand)}*/}
                            {/*        className="flex text-neutral-600 items-center hover:text-green-400 cursor-pointer select-none py-1">*/}
                            {/*            <input onChange={()=>{}} type="checkbox" checked={isChecked(brand._id)} />*/}
                            {/*            <label className="cursor-pointer ml-2">{brand.name}</label>*/}
                            {/*    </li>*/}
                            {/*))}*/}

                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default BrandList;