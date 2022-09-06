import qstring from "query-string";

import {useEffect,  useState} from "react";
import apis from "src/apis";
import {useNavigate} from "react-router-dom";
import {FaAngleRight, FaTimes} from "react-icons/all";
import {ACTION_TYPES} from "store/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";


export interface CategoryType{
    name: string,
    id: string,
    parentId: string,
    sub?: CategoryType[],
    expand?: boolean
    active?: boolean
}

function CategoryList(props) {
    
    const dispatch = useDispatch();
    
    const { flatCategories, brands } = useSelector((state: RootState)=>state.productState)
    
    
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

    function findChildCategory(categories: CategoryType[], parentId: string) {
        // let items = {}
        let items = []
        categories.filter(cat=>{
            if(cat.parentId === parentId){
                // items[cat.id] = cat
                items.push(cat)
            }
        })
        return items
    }

    // function findRootCategories(categories: {id: string, parentId: string}[]) {
    //     let items: {[key: string]: CategoryType} = {}
    //     categories.filter((cat: any)=>{
    //         if(!cat.parentId || cat.parentId === '0'){
    //             items[cat.id] = cat
    //         }
    //     })
    //     return items
    // }
    
    function  getCategoriesLocal(filter: string, data: CategoryType[]){
        return data.filter(function (item){
            if(filter){
                let f = filter.split("=");
                if(item[f[0]] === f[1]){
                    return item;
                }
            }
        })
    }
    
    // async function getAllRootCategoryFromLocal(item: CategoryType, cb){
    //     if(flatCategories) {
    //         let root = findRootCategories(getCategoriesLocal("parentId=0", flatCategories))
    //         cb(root)
    //     } else {
    //         let a = await getAllCategories();
    //         if(a) {
    //             // get root categories from categories sqlite database
    //             let rootCategories = findRootCategories(getCategoriesLocal("parentId=0", a))
    //             if (rootCategories) {
    //                 setFetchCategories(findRootCategories(rootCategories as any))
    //             }
    //             cb(a)
    //         }
    //     }
    // }
    
    
    useEffect(()=>{
        (async function(){
            
            let data = qstring.parse(location.hash)
    
            let updateSidebarCategory = {
                ...sidebarCategory
            }
            
            let root = {}
            
            let a = await getAllCategories();
    
            
            if(a){
                if("/p?cat" in data && "cat_tree" in data){
    
                    let rootCategoryName = data["/p?cat"]
                    
                    let temp = {}
                    let levelNumber = 1;
                    
                    let rootCategories =  getCategoriesLocal('parentId=0', a)
                    
                    
                    // set expand true that expanded and other make false
                    let selectedRooCat: CategoryType = setExpand(rootCategories, rootCategoryName)
                    root = selectedRooCat
                    
                    let subCats = findChildCategory(a, selectedRooCat.id)
                    
                    updateSidebarCategory[levelNumber] = rootCategories
                    levelNumber++
                    updateSidebarCategory[levelNumber] = subCats
                    levelNumber++
                    
                    let lastSub = data["cat_tree"];
                    let isReach = subCats.find(subName=> subName.name === lastSub);
                    if(!isReach) {
                        let findLastItem = a.find(item => item.name === lastSub)

                        findLastItem.active = true;
                        
                        // this function make each nested sub category make array of object which key is its parent id;
                        findNerestParentRecur(findLastItem, rootCategoryName, a)
    
                        foundNestedFormObject(subCats, temp)
    
                        function foundNestedFormObject(subCats, temp,) {
                            if (subCats) {
                                subCats.forEach(cat => {
                                    let nested = temp[cat.id]
                                    if (nested) {
                                        let lastSelected = setExpand(subCats, cat.name)
                                        updateSidebarCategory[levelNumber] = nested
                                        // increase sub nested number
                                        levelNumber++
                    
                                        foundNestedFormObject(nested, temp);
                                    }
                                })
                            }
                        }
                    }
                    
                    function findNerestParentRecur(parent,  rootCategoryName,  arr){
                        let parentItem = arr.find(item=>item.id === parent.parentId)
                        if(parentItem) {
                            let parentItemSub = getCategoriesLocal("parentId=" + parentItem.id, arr);
                            if(parentItemSub) {
                                temp[parentItem.id] = parentItemSub
                            }
                            if (rootCategoryName !== parentItem.name) {
                                findNerestParentRecur(parentItem, rootCategoryName, arr)
                            }
                        }
                    }
                    
                    
    
                } else if("/p?cat" in data){
              
                    let rootCategories =  getCategoriesLocal('parentId=0', a)
                    let selectedRootCat: CategoryType = setExpand(rootCategories, data["/p?cat"])
                    root = selectedRootCat
                    let subCats = findChildCategory(a, selectedRootCat.id)
                    updateSidebarCategory[1] = rootCategories
                    updateSidebarCategory[2] = subCats
                  
                } else {
                    let rootCategories =  getCategoriesLocal('parentId=0', a)
                    updateSidebarCategory[1] = rootCategories
                }
                
                dispatch({
                    type: "SET_SELECT_CATEGORY",
                    payload: {
                        root: root,
                        tree: {}
                    }
                })
                
                setSidebarCategory(updateSidebarCategory);
                
                dispatch({
                    type: ACTION_TYPES.FETCH_CATEGORIES,
                    payload: a
                })
            }
        }())
    }, [location.search])
    
    
    
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
    
    
    function clickOnCategoryItem(item: CategoryType, levelNumber){

        let updateSidebarCategory = {
            ...sidebarCategory
        }
        
        // find all child category of clicked category
        
        let subCats: CategoryType[];
        
        if(updateSidebarCategory[levelNumber + 1]){
            // toggle prev state
            subCats = findChildCategory(flatCategories, item.parentId)
            updateSidebarCategory[levelNumber] = subCats;
            let keys = Object.keys(updateSidebarCategory);
            keys.filter(k=> k > levelNumber).forEach(key=>{
                delete updateSidebarCategory[key]
            })
        } else {
    
            // expand new sub category
            subCats = findChildCategory(flatCategories, item.id)
            updateSidebarCategory[levelNumber + 1] = subCats;
            
            // set active category inside clicked category for detect expand.
            updateSidebarCategory[levelNumber].forEach(upper => {
                if (upper.id === item.id) {
                    upper.expand = true
                } else {
                    upper.expand = false
                }
            })
        }
        
        if(levelNumber === 1){
            navigate(`/p?cat=${item.name}`)
        } else {
            let rootExpand = updateSidebarCategory[1].find(item=>item.expand)
            if(rootExpand) {
                navigate(`/p?cat=${rootExpand.name}&cat_tree=${item.name}`)
            }
        }
        
        setSidebarCategory(updateSidebarCategory)
    }
    

    async function getAllCategories(){
        return new Promise<CategoryType[] | undefined>(async (resolve, reject)=>{
            let response = await apis.get<CategoryType[] | undefined>(`/api/categories`)
            if(response) {
                resolve(response.data)
            } else{
                resolve(undefined)
            }
        })
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
    
    
      return (
        <div className="hidden md:block col-span-3 ">
            <div className="grid px-4">
                
                <h1 className="font-semibold text-xl mt-8">Category</h1>
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
    
                { sidebarCategory[1]?.map(cat=> !(sidebarCategory[2] && !cat.expand) && (
                    <div key={cat.id} className="flex justify-between">
                        <li onClick={()=>clickOnCategoryItem(cat, 1)} className={`cursor-pointer ${(cat.active || cat.expand) ? "text-red-500 font-medium": ""}`}>{cat.name}</li>
                    </div>
                ))}
                
                { sidebarCategory["2"]?.map(cat=> !(sidebarCategory[3] && !cat.expand) && (
                    <div key={cat.id} className="ml-4">
                        <li onClick={()=>clickOnCategoryItem(cat, 2)} className={`cursor-pointer ${(cat.active || cat.expand) ? "text-red-500 font-medium": ""}`}>{cat.name}</li>
                    </div>
                )) }
    
                { sidebarCategory["3"]?.map(cat=>  !(sidebarCategory[4] && !cat.expand) &&  (
                    <div key={cat.id} className="ml-10">
                        <li onClick={()=>clickOnCategoryItem(cat, 3)} className={`cursor-pointer ${(cat.active || cat.expand) ? "text-red-500 font-medium": ""}`}>{cat.name}</li>
                    </div>
                )) }
                
                { sidebarCategory["4"]?.map(cat=>  !(sidebarCategory[5] && !cat.expand) &&  (
                    <div key={cat.id} className="ml-14">
                        <li onClick={()=>clickOnCategoryItem(cat, 4)}
                            className={`cursor-pointer ${(cat.active || cat.expand) ? "text-red-500 font-medium": ""}`}>
                            {cat.name}</li>
                    </div>
                )) }
                
            </div>
        </div>
    );
}

export default CategoryList;


