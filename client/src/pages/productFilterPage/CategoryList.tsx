// import { FaSolidAngleRight } from "solid-icons/fa";
// import { createEffect, createSignal, For } from "solid-js";
// import { findCategoryBrand } from "src/utils";


import {useEffect, useState} from "react";
import apis from "src/apis";
import {FaAngleRight} from "react-icons/all";
import RecursiveRenderCategory from "pages/productFilterPage/RecursiveRenderCategory";
import {useNavigate} from "react-router-dom";
import qstring from "query-string"

export interface CategoryType{
    name: string,
    id: string,
    parentId: string,
    sub?: CategoryType[]
}

function CategoryList(props) {

    const [categories, setCategories] = useState<{[key: string] :CategoryType} | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
    const [brands, setBrands] = useState(null);

    const navigate = useNavigate()

    function findChildCategory(categories: CategoryType[], parentId: string) {
        let items = {}
        categories.filter(cat=>{
            if(cat.parentId === parentId){
                items[cat.id] = cat
            }
        })
        return items
    }

    function findRootCategories(categories: {id: string, parentId: string}[]) {
        let items: {[key: string]: CategoryType} = {}
        categories.filter(cat=>{
            if(!cat.parentId || cat.parentId === '0'){
                items[cat.id] = cat
            }
        })
        return items
    }

    const deepFreeze = (obj) => {
        obj && Object.keys(obj).forEach(prop => {
            if (typeof obj[prop] === 'object') deepFreeze(obj[prop]);
        });
        return {...obj};
    };

    function isRootCat(cat: {parentId?: string}){
        return !cat.parentId || cat.parentId === '0'
    }

    function isExpanded(categories: any, cat: {id: string}){
        return !categories[cat.id] || !!categories[cat.id].sub
    }

    async function handleExpandChildCategory(item: CategoryType, subCategory: CategoryType[]){

        setSelectedCategory(item)

        let updateCategory: any = {...categories}

        // let sub = findChildCategory(state.categories, item._id)

        // if click root category item and if it expanded
        // if(isRootCat(item) && isExpanded(updateCategory, item)){
        //     // collapse all and show all root categories
        //     // setCategories({...findRootCategories(state.categories)})
        //
        //     let rootCategories = await getCategories('parentId=0')
        //     if(rootCategories) {
        //         setCategories(findRootCategories(rootCategories))
        //     }
        //     return;
        // }

        if(isRootCat(item)){
            // navigate(`/p?cat=${item.name}`)

            if(isExpanded(updateCategory, item)) {
                // collapse all and show all root categories

                let rootCategories = await getCategories('parentId=0')
                if (rootCategories) {
                    setCategories(findRootCategories(rootCategories))
                }
                return;
            }
        }

        let findOne: CategoryType  = updateCategory[item.id]
        if(findOne) {
            findOne.sub = subCategory

            // delete other root level categories.
            // only exists clicked root categories
            setCategories({[findOne.id]: findOne})
            return;
        }


        // fetch new child nested category
        // let rootCategories = await getCategories(`parentId=${item.id}`)
        // findChildCategory()
        let n = findNestedCategory(updateCategory, item.id)
        if(n) {
            n.sub = subCategory

            setCategories(updateCategory)
            let keys = Object.keys(updateCategory);
            if(keys.length && updateCategory[keys[0]]) {
                navigate(`/p?cat=${updateCategory[keys[0]].name}&cat_tree=${item.name}`)
            }
            return;
        }
    }

    function findNestedCategory(categories: CategoryType[] | {[key: string]: CategoryType} | any, catId: string){
        if(typeof categories === "object"){
            if(Array.isArray(categories)){
                for (const category of categories) {
                    if (category.id === catId) {
                        return category
                    } else {
                        if (category.sub) {
                            return findNestedCategory(category.sub, catId)
                        }
                    }
                }
            } else {
                for (const categoriesKey in categories) {
                    if (categories[categoriesKey] === catId) {
                        return categories[categoriesKey]
                    } else {
                        if (categories[categoriesKey].sub) {
                            return findNestedCategory(categories[categoriesKey].sub, catId)
                        }
                    }
                }
            }
        }
    }

    useEffect(()=>{
        (async function(){
            let a = qstring.parse(location.hash)
            let keys = Object.keys(a);
            if (keys.length){
                if(a[keys[0]]){
                    let rootCategory = await getCategories(`name=${a[keys[0]]}`)
                    if(rootCategory) {
                        let childCategories = await getCategories(`parentId=${rootCategory.id}`)
                        // console.log(childCategories)
                        handleExpandChildCategory(rootCategory, childCategories)
                    }
                    // if(rootCategories) {
                    //     setCategories(findRootCategories(rootCategories))
                    // }
                }
            }

            // let rootCategories = await getCategories('parentId=0')
            // if(rootCategories) {
            //     setCategories(findRootCategories(rootCategories))
            // }
        }())
    }, [location.search])

    async function getCategories(query: string){
        return new Promise<CategoryType[] | undefined>(async (resolve, reject)=>{
            let response = await apis.get<CategoryType[] | undefined>(`/api/category?${query}`)
            if(response) {
                resolve(response.data)
            } else{
                resolve(undefined)
            }
        })
    }

    function handleChangeCategory(item: {name: string, _id: string}){

        let updatedCategory = state.filter.category
        if(updatedCategory && updatedCategory._id === item._id){
            updatedCategory = null
            setBrands(null)
        } else {
            updatedCategory = {
                name: item.name,
                _id: item._id
            }
            let brands = findCategoryBrand(state.brands, updatedCategory._id)
            setBrands(brands)
        }

        setFilter({
            ...state.filter,
            brands: [],
            category: updatedCategory,

        })
    }

    function handleChangeBrand(item: {name: string, _id: string}){
        let updatedBrands = [...state.filter.brands]

        let index = updatedBrands.findIndex(b=>b._id === item._id)

        if(index === -1){
            updatedBrands = [
                ...updatedBrands,
                item
            ]
        } else {
            updatedBrands.splice(index, 1)
        }
        setFilter({
            ...state.filter,
            brands: updatedBrands
        })
    }

    async function handleClick(cat: CategoryType){
        let categories = await getCategories(`parentId=${cat.id}`)
        if(categories) {
            await handleExpandChildCategory(cat, categories)
        }
        // navigate(`/p?cat=computers&cat_tree=motherboard`)
    }

    return (
        <div className="hidden md:block col-span-3 ">
            <div className="grid px-4">
                {/*{state.filter?.category && <div className="flex flex-wrap gap-2 mt-4">*/}
                {/*    <div*/}
                {/*        onClick={() => handleChangeCategory(state.filter?.category)}*/}
                {/*        className="bg-green-500/10 px-4 py-2 rounded flex justify-between">*/}
                {/*        <span>{state.filter?.category.name}</span>*/}
                {/*        <span className="ml-2 text-red-500 font-medium cursor-pointer">x</span>*/}
                {/*    </div>*/}
                {/*</div> }*/}

                <h1 className="font-bold text-2xl  mt-8">Category</h1>
                <RecursiveRenderCategory
                    selectedCategory={selectedCategory}
                    category={categories}
                    handleClick={handleClick}
                    filterCategory={false}
                />
            </div>

            <div className="grid px-4">
                <h1 className="font-bold text-2xl mt-8">Brands</h1>
                {/* Selected brands  */}
                {/*{state.filter?.brands && <div className="flex flex-wrap gap-2 mt-4">*/}
                {/*    <For each={state.filter.brands}>*/}
                {/*        {(brand)=>(*/}
                {/*            <div*/}
                {/*                onClick={() => handleChangeBrand(brand)}*/}
                {/*                className="bg-green-500/10 px-4 py-2 rounded flex justify-between">*/}
                {/*                <span>{brand.name}</span>*/}
                {/*                <span className="ml-2 text-red-500 font-medium cursor-pointer">x</span>*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </For>*/}

                {/*</div> }*/}


                {/* brand list */}
                {/*<div className="">*/}
                {/*    <For each={brands() ? brands() : state.brands} fallback={<div>Loading...</div>}>*/}
                {/*        {(item) => (*/}
                {/*            <li onClick={() => handleChangeBrand(item)} className="flex justify-between items-center hover:text-green-400 cursor-pointer select-none my-2">*/}
                {/*                <label className="font-medium cursor-pointer">{item.name}</label>*/}
                {/*                <input checked={state.filter.brands && state.filter.brands.findIndex(b=> b._id === item._id) !== -1 } type="checkbox" />*/}
                {/*            </li>*/}
                {/*        )}*/}
                {/*    </For>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}




export default CategoryList;


