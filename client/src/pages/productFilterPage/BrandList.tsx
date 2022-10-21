import React, {useEffect} from 'react';
import {ACTION_TYPES} from "store/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";


const BrandList = () => {
    const dispatch = useDispatch()
    const {brandsForCategory, filters} = useSelector((state: RootState) => state.productState)
    
    // useEffect(()=>{
    // 	// apis.get("/api/brands").then(res=>{
    // 	// 	dispatch({
    // 	// 		type: ACTION_TYPES.FETCH_BRANDS,
    // 	// 		payload: {
    // 	// 			brands: res.data,
    // 	// 			categoryId: 'all'
    // 	// 		}
    // 	// 	})
    // 	// })
    // }, [])
    
    
    function handleChangeBrand(brand) {
        let updatedBrands = [...filters.brands]
        let selectedBrandIndex = updatedBrands.findIndex((br: any) => br.id === brand.id)
        if (selectedBrandIndex !== -1) {
            updatedBrands.splice(selectedBrandIndex, 1)
        } else {
            updatedBrands.push(brand)
        }
        
        // update global state
        dispatch({
            type: ACTION_TYPES.ADD_FILTER,
            payload: {brands: updatedBrands}
        })
    }
    
    function isChecked(brandId: string) {
        if (filters.brands) {
            let selectedBrandIndex = filters.brands.findIndex((b: any) => b._id === brandId)
            return selectedBrandIndex !== -1;
        }
        return false
    }
    
    useEffect(()=>{
        // let a = filters.category
        //     && filters.category.selected
        //     && brandsForCategory[filters.category.selected.name]
        //     && brandsForCategory[filters.category.selected.name]
    
        console.log(brandsForCategory)
    }, [filters.category, brandsForCategory])
    

    
    return (
        <div>
			
			<div className="grid px-4">
                <h1 className="heading-3 mt-8">Brands</h1>
                
                {/*Selected brands  */}
                
                {/*{brands && <div className="flex flex-wrap gap-2 mt-4">*/}
                {/*   {  brands["all"] && brands["all"].map(brand=>(*/}
                {/*       <div*/}
                {/*           onClick={() => handleChangeBrand(brand)}*/}
                {/*           className="bg-green-500/10 px-4 py-2 rounded flex justify-between">*/}
                {/*        <span>{brand.name}</span>*/}
                {/*        <span className="ml-2 text-red-500 font-medium cursor-pointer">x</span>*/}
                {/*    </div>*/}
                {/*   )) }*/}
                {/*   */}
                {/*</div> }*/}
                
                
                <div className="">
                    <div className="mt-4">
                    {/*{  brandsForCategory["all"] && brands["all"].map((brand, index)=>(*/}
                        {/*    <li key={index}*/}
                        {/*        onClick={() => handleChangeBrand(brand)}*/}
                        {/*        className="flex text-neutral-200 items-center hover:text-green-400 cursor-pointer select-none">*/}
                        {/*            <input onChange={()=>{}} type="checkbox" checked={isChecked(brand._id)} />*/}
                        {/*            <label className="cursor-pointer ml-2">{brand.name}</label>*/}
                        {/*    </li>*/}
                        {/*))}*/}
    
                        {filters.category
                            && filters.category.selected
                            && brandsForCategory[filters.category.selected.name]
                            && brandsForCategory[filters.category.selected.name].map(brand => (
                            <div>
                                <h1>{brand.name}</h1>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
  </div>
    );
};

export default BrandList;