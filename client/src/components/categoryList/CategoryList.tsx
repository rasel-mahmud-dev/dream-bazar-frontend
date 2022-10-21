import {useEffect,  useState} from "react";
import apis from "src/apis";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {FaAngleRight, FaTimes} from "react-icons/all";
import {ACTION_TYPES, CategoryType} from "store/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {Button} from "UI/index";

import "./styles.scss"
import {fetchFlatCategoriesAction} from "actions/adminProductAction";


function CategoryList(props) {
    
    const dispatch = useDispatch();
    
    const { flatCategories, nestedCategoriesCache, filters, brands } = useSelector((state: RootState)=>state.productState)
    let [searchParams, setSearchParams] = useSearchParams();
    
    let catTree = searchParams.get("catTree")
    
    /*
    * 1 => []
    * 2 => []
    * 3 => []
    * 4 => []
    * */
    const [sidebarCategory, setSidebarCategory] = useState<{[key: string]: CategoryType[]} | null>({
        // "1": [
        //     {
        //         "id": "60df5e546419f56b97610600",
        //         "name": "Electronics",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null,
        //         expand: true,
        //     },
        //     {
        //         "id": "60df5e546419f56b97610601",
        //         "name": "Clothes",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "6148a0bd841259e445116606",
        //         "name": "Home & Furniture",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "6148a0bd841259e445116607",
        //         "name": "Personal Care Appliances",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "6148a0bd841259e445116608",
        //         "name": "Watches and Watch Accessories",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "616ed4e947cdd777fb383273",
        //         "name": "Footwear",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "6170784f55f4a0b4747a30e3",
        //         "name": "Beauty and Grooming",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     }
        // ],
        // "2": [
        //     {
        //         "id": "60e00694402ddf2ba7d26d43",
        //         "name": "Computer and Laptop Accessories",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "60e0131fc4db28b79bb36aa3",
        //         "name": "Mobiles and Tablet",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "613ae2344b72d984efe8c45b",
        //         "name": "monitors",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489843841259e4451165e0",
        //         "name": "Audio & Video",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489c1f841259e4451165e7",
        //         "name": "Cameras & Accessories",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489d4e841259e4451165f2",
        //         "name": "Television.",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489d4e841259e4451165f3",
        //         "name": "Washing Machine",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489d4e841259e4451165f4",
        //         "name": "Refrigerators",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489d4e841259e4451165f5",
        //         "name": "Kitchen Appliances",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489e7a841259e4451165f9",
        //         "name": "Home Appliances",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "616f14298ae9a90aa4434f75",
        //         "name": "DTH",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     },
        //     {
        //         "id": "617080e473b3851a1e7dbb71",
        //         "name": "Computer and Laptop",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     }
        // ]
    })
    
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
    
    const navigate = useNavigate()
    const params = useParams()
    
    function getCategoriesLocal(filter: string, data: CategoryType[]){
        return data.filter(function (item){
            if(filter){
                let f = filter.split("=");
                if(item[f[0]] == f[1]){
                    return item;
                }
            }
        })
    }
    
    const [lastParentSubCategories, setLastParentSubCategories] = useState({
        lastParentId: "",
        sub: [],
        levelNumber: 0
    })
    
    
    useEffect(()=>{
    
        
        (async function(){
            let c = await fetchFlatCategoriesAction(dispatch, flatCategories)
            getCat(c, params)

        }())
    }, [])
    
 
    function getCat(flatCategories, params){

        console.time("category-find-time")
        
        let updateSidebarCategory = {
            ...sidebarCategory
        }
        
        let rootCategory = {}
      
        // find both category tree
        if(params.pId && catTree){
            
            // base category name
            let rootCategoryName = params.pId

            let temp = {}
            
            // default category nested level
            let levelNumber = 1;
            
            // root level or base level all categories where parent id is = 0
            let rootCategories =  flatCategories.filter(a=>a.parentId === null)
            // store it state so that we will render in jsx
            // it first level category / root level
            // { 1 : [{…}, {…}, {…}, {…}, {…}, {…}, {…}] }
            updateSidebarCategory[levelNumber] = rootCategories
            
            // get pId root category that is given in url first params
            // and set expand true that expanded and other make false
            rootCategory = setExpand(rootCategories, rootCategoryName)
            
            
            
            // now find last category that is passed url params 2
            
            // find last n level category
            let getLastLevelCategory = flatCategories.find(item => item.name === catTree)
            
            /**
             if nested last n level category not found.
             then show parent sub category 2 level.
             */
            if(!getLastLevelCategory){
    
                // const subCat = getCategoriesLocal("parentId=" + rootCategory._id, flatCategories)
                const subCat = flatCategories.filter(a=>a.parentId === rootCategory._id)
                setLastParentSubCategories({
                    lastParentId: rootCategory._id,
                    sub: subCat,
                    levelNumber: 1
                })
                setSidebarCategory(updateSidebarCategory);
                handleChangeCategory(rootCategory)
                
                return;
            }
            
            /**
             * we found last category.
             * now we need to find its parent category. that is n-1 level category
             * then again find n-1 level parent category that is n-2 level category
             * this process run until we reach root category*
             *
             * example: out category tree
             * Electronics -> Computer and Laptop Accessories -> Computer Components -> Motherboard*
             *
             * example: find like this find reverse order category. until reach root category
             * Motherboard ->  Computer Components -> Computer and Laptop Accessories -> Electronics [end loop]
             */
            // this function make each nested sub category make array of object which key is its parent id;
            getLastLevelCategory.expand = true
            getLastLevelCategory.last = true
            
    
            
            findUpperParentRecur(getLastLevelCategory, rootCategoryName, flatCategories, temp)
            
            
            // now we found all level nested level category that store in temp object.
            let arrId = []
            for (let tempKey in temp) {
                arrId.push(tempKey)
            }
            
            arrId = arrId.reverse();
            
            for (let id of arrId) {
                levelNumber++
                updateSidebarCategory[levelNumber] = temp[id]
            }
            
            setLastParentSubCategories({
                lastParentId: getLastLevelCategory._id,
                sub: flatCategories.filter(item => getLastLevelCategory._id === item.parentId),
                levelNumber: levelNumber,
            })
    
            handleChangeCategory(getLastLevelCategory)
            
        } else if(params.pId){
        
            /// get root level all categories
            let rootCategories = flatCategories.filter(c=>c.name === params.pId)
      
            // if not match root category then show all root level category
            if(rootCategories.length === 0){
                
                rootCategories = flatCategories.filter(c=>c.parentId === null)
                
                updateSidebarCategory[1] = rootCategories
                setLastParentSubCategories({
                    lastParentId: "0",
                    sub: rootCategories,
                    levelNumber: 0
                })
                handleChangeCategory(null, rootCategories)
                
            } else {
                
                updateSidebarCategory[1] = rootCategories
                const rootCat = rootCategories.find(c => c.name === params.pId)
     
                // set base category in filter category
                
                rootCat.expand = true
                rootCat.last = true
                // get sub category of root level category
                const subCat = flatCategories.filter(c=>c.parentId === rootCat._id)
                setLastParentSubCategories({
                    lastParentId: rootCat._id,
                    sub: subCat,
                    levelNumber: 1
                })
                handleChangeCategory(rootCat)
            }
        }
        
        setSidebarCategory(updateSidebarCategory);
    }
    
    
    function findUpperParentRecur(parent: {parentId: string, _id: string, name: string, expand?: boolean },  rootCategoryName: string,  arr, temp){
        /**
         step 1 parent = Motherboard
         step 2 parent = Computer Components
         step 3 parent = Computer and Laptop Accessories
         step 4 parent = Electronics
         step 5 parent = undefined [recursion stop]
         */
            // find upper parent
        let upperParent = arr.find(item=>item._id === parent.parentId)
        
        if(upperParent) {
            // sign that only expand
            upperParent.expand = true
            // find upper parent ar sub categories
            let upperParentOfSub = getCategoriesLocal("parentId=" + upperParent._id, arr);
            /**
             find upper parent ar sub categories
             Ex: Computer Components ar under all category
             {Motherboard}{Processor}{Ram}{Keyboard}{power-supply}
             */
            
            if(upperParentOfSub) {
                // store upper parent or sub categories with in key upper category id and value sub category.
                // end of we get temp reverse to get level category
                temp[upperParent._id] = upperParentOfSub
            }
            
            // check if it not reaches root level category
            if (rootCategoryName !== upperParent.name) {
                findUpperParentRecur(upperParent, rootCategoryName, arr, temp)
            }
        }
    }
    
    
    
    function setExpand(subCategories, catName){
        let selectedItem = null
        subCategories.forEach(item=> {
            if(item.name === catName){
                item.expand = true;
                selectedItem = item;
            } else {
                item.expand = false;
            }
        });
        
        return selectedItem
    }
    
    
    function handleChangeBrand(item: {name: string, _id: string}){
        // let updatedBrands = [...state.filter.brands]
        //
        // let index = updatedBrands.findIndex(b=>b._id === item._id)
        //
        // if(index === -1){
        //     updatedBrands = [
        //         ...updatedBrands,
        //         item
        //     ]
        // } else {
        //     updatedBrands.splice(index, 1)
        // }
        // setFilter({
        //     ...state.filter,
        //     brands: updatedBrands
        // })
    }
    
    
    function handleRemoveCategory(item: CategoryType){
        let updatedSelectedCategory = {...selectedCategory}
        
        // getAllRootCategoryFromLocal(item, (data)=>{
        //     for (let dataKey in data) {
        //         if(data[dataKey] && data[dataKey].sub) data[dataKey].sub = null
        //     }
        //     setFetchCategories(data);
        //     updatedSelectedCategory = null
        // })
        setSelectedCategory(updatedSelectedCategory)
        // updatedSelectedCategory = null
        
        // setBrands(null)
        
        // setSelectedCategory(updatedSelectedCategory)
        
        // setFilter({
        //     ...state.filter,
        //     brands: [],
        //     category: updatedCategory,
        //
        // })
    }
    
    
    function clickOnCategoryItem(item: CategoryType, levelNumber){
        
        // find all sub categories for currently clicked item
        // that is set for last parent sub categories sub arr
        let lastSub = flatCategories.filter(cat=>cat.parentId === item._id)
        
        let updatedSidebarCategory = {...sidebarCategory}
        let s = updatedSidebarCategory[levelNumber].find(sCat=>sCat._id === item._id)
        if(s) {
            s.last = true;
        }
        
        // get all level category numbers from sidebarCategory state
        /* example
            if you click 3 level category
            then delete 4, 5, 6, 7 level category if they exists
        * */
        let keyNumbers = Object.keys(updatedSidebarCategory);
        keyNumbers.forEach(key=>{
            // now delete all level from that clicked level.
            if(levelNumber < key ){
                // delete all nested of parent
                delete updatedSidebarCategory[key]
            }
        })
        
        setLastParentSubCategories(prevState => ({
            ...prevState,
            levelNumber: levelNumber,
            lastParentId: item._id,
            sub: lastSub
        }))
        if(params.pId === item.name) {
            navigate(`/p/${params.pId}`)
        } else {
            navigate(`/p/${params.pId}?catTree=${item.name}`)
        }
        handleChangeCategory(item)
        setSidebarCategory(updatedSidebarCategory)
    }
    
    
    function handleExpandCategory(item,   levelNumber) {
        
        // find all sub categories for currently clicked item
        // that is set for last parent sub categories sub arr
        const lastClickedSub = flatCategories.filter(ct=>ct.parentId === item._id)
        
        let updatedSidebarCategory = {...sidebarCategory}
        
        // if click root level category
        let parentCat = null
        
        if(levelNumber === 0){
            parentCat =updatedSidebarCategory[1].find(sCat=>sCat._id === item._id)
            
        } else {
            // find parent of clicked category
            parentCat = updatedSidebarCategory[levelNumber].find(sCat=>item.parentId === sCat._id)
        }
        
        
        if(!parentCat){
            handleChangeCategory(item)
            return setSidebarCategory(updatedSidebarCategory)
        }
        
        
        
        parentCat.last = false;
        
        // find parent sub categories for next level nested category
        let lastParentSub = flatCategories.filter(ct=>ct.parentId === parentCat._id)
        
        // set nest level category like
        // updatedSidebarCategory[4 + 1] = []
        updatedSidebarCategory[levelNumber + 1] = lastParentSub
        
        // update all last and expand property from preview level category
        lastParentSub.forEach((lastItem=>{
            if(lastItem.name === item.name){
                lastItem.last = true
                lastItem.expand = true
            } else{
                lastItem.last = false
                lastItem.expand = false
            }
        }));
        
        setLastParentSubCategories(prevState => ({
            ...prevState,
            sub: lastClickedSub.length === 0 ? null : lastClickedSub,
            levelNumber: levelNumber + 1,
            lastParentId: parentCat._id
        }))
        setSidebarCategory(updatedSidebarCategory)
        
        handleChangeCategory(item)
        
        // change url params
        if(levelNumber === 0) {
            navigate(`/p/${item.name}`)
        } else {
            navigate(`/p/${params.pId}?catTree=${item.name}`)
        }
    }
    

    function handleChangeCategory(item: {name: string,parentId?: string,id: string, isProductLevel?: number}, rootLevel?: any[] ) {
        let all = []
        
        if(!item) return;
    
        if (!item.isProductLevel) {
            findAllNestedCat(item, all, flatCategories)
        }
        
        dispatch({
            type: ACTION_TYPES.CHANGE_CATEGORY,
            payload: {
                selected: {
                    name: item.name,
                    id: item._id,
                    parentId: item.parentId
                },
                allNestedIds:  all.length > 0 ? all : []
            }
        })
    }
    
    function findAllNestedCat(item, result, flatCategories){
        if(!flatCategories) return;
        let allNested = flatCategories.filter(ct=>ct.parentId === item._id);
        if(allNested && allNested.length) {
            allNested.forEach(nested => {
                findAllNestedCat(nested, result, flatCategories)
            })
            let aa = allNested.map((a) => {
                return {
                    name: a.name,
                    id: a._id,
                    parentId: a.parentId

                }
            })
            result.push(...aa)
        }
    }
    
    
    return (
        <div className="md:block col-span-3 ">
            
            <div className="grid px-4">
                
                <h1 className="heading-3 font-semibold text-xl mt-8">Category</h1>

                <div className='mb-2'>
                    {selectedCategory && <div className="flex flex-wrap gap-2 mt-2">
                        <div
	                        onClick={() => handleRemoveCategory(selectedCategory)}
	                        className="bg-blue-500/20 font-medium px-4 py-2 rounded flex justify-between items-center">
                            <span>{selectedCategory.name}</span>
                            <FaTimes />
                        </div>
                    </div> }
                </div>
    
                { sidebarCategory[1]?.map(cat=> (!sidebarCategory[2] || cat.expand)  && (
                    <div key={cat._id} className="ml-2 flex justify-between">
                        <li onClick={()=>clickOnCategoryItem(cat, 1)}
                            className={`category-item cursor-pointer ${(cat.active || cat.expand) ? "expanded-category": "hidden"}
                          ${cat.last ? "last-expand-category": ""}`}>
                            {cat.name}</li>
                    </div>
                ))}
    
                { sidebarCategory["2"]?.map(cat=> (!sidebarCategory[3] || cat.expand) && (
                    <div key={cat._id} className="ml-2">
                        <li onClick={()=>clickOnCategoryItem(cat, 2)}
                            className={`category-item cursor-pointer ${(cat.active || cat.expand) ? "expanded-category": "hidden"}
                                   ${cat.last ? "last-expand-category": ""}
                            `}>{cat.name}</li>
                    </div>
                )) }
    
                { sidebarCategory["3"]?.map(cat=>  (!sidebarCategory[4]  || cat.expand) && (
                    <div key={cat._id} className="ml-2">
                        <li onClick={()=>clickOnCategoryItem(cat, 3)} className={`category-item cursor-pointer
                        ${(cat.active || cat.expand) ? "expanded-category": "hidden"}
                        ${cat.last ? "last-expand-category": ""}
                        
                        `}>{cat.name}</li>
                    </div>
                )) }
    
                { sidebarCategory["4"]?.map(cat=> (!sidebarCategory[5]  || cat.expand) &&  (
                    <div key={cat._id} className="ml-2">
                        <li onClick={()=>clickOnCategoryItem(cat, 4)}
                            className={`category-item cursor-pointer ${(cat.expand) ? "expanded-category": "hidden"}
                                        ${cat.last ? "last-expand-category": ""}
                            `}>
                            {cat.name}
                        </li>
                    </div>
                )) }
    
    
                {/************ Show last all sub categories *************/}
                <div className="ml-4">
                    { lastParentSubCategories.sub && lastParentSubCategories.sub.map(item=>(
                        <div key={item._id}>
                            <h1 onClick={()=>handleExpandCategory(item,  lastParentSubCategories.levelNumber)}
                                className={`category-item cursor-pointer text-green-450`}>{item.name}</h1>
                        </div>
                    )) }
                </div>
                
                
            </div>
        </div>
    );
}

export default CategoryList;


