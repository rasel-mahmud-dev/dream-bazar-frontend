import {useEffect, useState} from "react";

import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {FaTimes} from "react-icons/all";
import { CategoryType} from "store/types";

import "./styles.scss";

import useLanguage from "src/hooks/useLanguage";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";
import {changeCategoryAction, fetchFlatCategoriesAction} from "actions/categoryAction";



function CategoryList(props) {
    const {onChangeCategory} = props;

    const dispatch = useAppDispatch();
    const location = useLocation();

    const l = useLanguage();

    const {flatCategories, category} = useAppSelector(state => state.categoryState);
    let [searchParams, setSearchParams] = useSearchParams();

    let catTree = searchParams.get("catTree");

    const [selectedCategory, setSelectedCategory] = useState<CategoryType>(null as unknown as CategoryType);

    const navigate = useNavigate();
    const params = useParams();



    useEffect(() => {
        (async function () {
            let c = await fetchFlatCategoriesAction(flatCategories, dispatch)
            if (c) {
                getCat(c)
            }
        }())
    }, [])



    const [currentCategory, setCurrentCategory] = useState<any>({})
    const [expandCategories, setExpandCategories] = useState({})

    /**
     * this function return deep nested category and subcategory
     * */

    function getCat(flatCategories){

        let rootCategory;

        if(params.pId) {
            rootCategory = flatCategories.find(item => item.name === params.pId);
        }

        if(!rootCategory){
            // if userActionTypes.ts put wrong root category name then set electronic as root category
            wrongRootCategory(flatCategories)
            return;
        }

        if (catTree) {

            let lastChild = flatCategories.find(fc => fc.name === catTree);
            if (!lastChild) {
                wrongRootCategory(flatCategories)
                return;
            }

            // now find all level this parent categories;
            let nestedCategory = findNLevelParentWrapper(flatCategories, lastChild)
            setCurrentCategory(nestedCategory)
            dispatchCategoryChange(lastChild)

        } else {

            let subCategories =  flatCategories.filter(item=>item.parentId  === rootCategory._id )
            // console.log(subCategories)
            setCurrentCategory({
                ...rootCategory,
                sub: {}
            })

            setExpandCategories({[rootCategory.name]: subCategories})

        }
    }

    function wrongRootCategory(flatCategories){

        if(!flatCategories) return;

        // if userActionTypes.ts put wrong root category name then set electronic as root category
        let rootCategory = flatCategories?.find(item => item.name === "Electronics");
        if(rootCategory) {
            setCurrentCategory({
                ...rootCategory,
                sub: {}
            })
            let sub = flatCategories.filter(item => item.parentId === rootCategory._id)
            setExpandCategories({[rootCategory.name]: sub})
        }
    }


    /**
     Make all n level nested categories
     */
    function findNLevelParentWrapper(categories, currentItem) {
        let temp = {}
        let level = 0

        // last level category. It will reverse order later

        // this for last level sub categories all children items.
        let expandItems = categories?.filter(cat => cat.parentId === currentItem._id)
        setExpandCategories({[currentItem.name]: expandItems})

        level++
        temp[level] = currentItem

        function findNLevelParent(categories, currentItem) {
            categories?.forEach(item => {
                if (currentItem.parentId === item._id) {

                    // item.child = categories?.filter(cat => cat.parentId === item._id)

                    level++
                    temp[level] = item;
                    if (item.parentId) {
                        findNLevelParent(categories, item)
                    }
                }
            })
        }

        findNLevelParent(categories, currentItem)


        let nestedCategory: any = {};
        let current = nestedCategory;


        Object.keys(temp).reverse().forEach(key => {
            current.name = temp[key].name
            current._id = temp[key]._id
            current.parentId = temp[key].parentId
            // current.expand = true
            current.sub = {}
            current.child = []
            // set reference nested sub object to create sub category
            current = current.sub
        })

        return nestedCategory
    }




    function handleRemoveCategory(item: CategoryType) {
        let updatedSelectedCategory: CategoryType | null = {...selectedCategory};

        // getAllRootCategoryFromLocal(item, (data)=>{
        //     for (let dataKey in data) {
        //         if(data[dataKey] && data[dataKey].sub) data[dataKey].sub = null
        //     }
        //     setFetchCategories(data);
        //     updatedSelectedCategory = null
        // })
        setSelectedCategory(updatedSelectedCategory);
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


    function handleToggleExpand(item: CategoryType, parentItem) {

        // update last nested level category
        let updateCurrentCategory = {...currentCategory};
        setAsLastItem(updateCurrentCategory, item, parentItem)


        // store last category for filtering product using this category
        dispatchCategoryChange(item)


        // filter all sub child categories
        let expandItems = flatCategories?.filter(cat => cat.parentId === item._id)
        setExpandCategories({[item.name]: expandItems})


        // find clicked parent sub category and insert new on sub category and make as expand to render dom
        function setAsLastItem(currentCategory, currentClickedCat, parentItem) {
            if (currentCategory) {
                if (currentCategory._id === parentItem._id) {
                    currentCategory.sub = currentClickedCat
                } else {
                    setAsLastItem(currentCategory?.sub, currentClickedCat, parentItem)
                }
            }
        }

        // update current category
        setCurrentCategory(updateCurrentCategory)
    }


    function handleClickSelectedCategory(item) {
        let subCategories = flatCategories?.filter(cat => cat.parentId === item._id)

        if (subCategories && subCategories.length) {
            setExpandCategories({
                [item.name]: subCategories
            })
            dispatchCategoryChange(item)
        } else {
            dispatchCategoryChange(item)
        }
    }


    function dispatchCategoryChange(categoryItem){
        let allNestedIds: string[] =  []

        let allChildCategories = []
        if(!categoryItem.isProductLevel) {
            findAllNestedCat(categoryItem, allChildCategories, flatCategories)
            if (allChildCategories) {
                allNestedIds = allChildCategories.map(item => item._id)
            }
        }

        dispatch(changeCategoryAction({
            selected: categoryItem,
            allNestedIds
        }))

        if(!categoryItem.parentId){
            navigate(`/p/${categoryItem.name}`);
        } else {
            navigate(`/p/${params.pId}?catTree=${categoryItem.name}`);
        }
    }


    // find all children category though recursive way
    function findAllNestedCat(item, result, flatCategories) {
        if (!flatCategories) return;
        let allNested = flatCategories.filter((ct) => ct.parentId === item._id);
        if (allNested && allNested.length) {
            allNested.forEach((nested) => {
                findAllNestedCat(nested, result, flatCategories);
            });
            let aa = allNested.map((a) => {
                return {
                    name: a.name,
                    _id: a._id,
                    parentId: a.parentId,
                };
            });
            result.push(...aa);
        }
    }


    return (
        <div className="md:block col-span-3 ">
            <div className="grid px-4">
                <h1 className="heading-5  mt-8">{l("PICK A CATEGORY")}</h1>

                <div className="">
                    {selectedCategory && (
                        <div className="flex flex-wrap gap-2 mt-2 mb-2">
                            <div
                                onClick={() => handleRemoveCategory(selectedCategory)}
                                className="bg-blue-500/20 font-medium px-4 py-2 rounded flex justify-between items-center"
                            >
                                <span>{selectedCategory.name}</span>
                                <FaTimes/>
                            </div>
                        </div>
                    )}
                </div>

                {currentCategory && (
                    <div>
                        <h1 className="heading-5" onClick={() => handleClickSelectedCategory(currentCategory)}>{currentCategory.name}</h1>

                        {expandCategories && (
                            <div className="ml-4">
                                {expandCategories[currentCategory.name]?.map(item => (
                                    <h5 className="my-1" onClick={() => handleToggleExpand(item, currentCategory)}>{item.name}</h5>
                                ))}
                            </div>
                        )}

                        {currentCategory.sub && !expandCategories[currentCategory.name] && (
                            <CategoryRecursive
                                onClickSelectedCategory={handleClickSelectedCategory}
                                expandCategories={expandCategories} handleToggleExpand={handleToggleExpand} sub={currentCategory.sub}/>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}


function CategoryRecursive({sub, handleToggleExpand, expandCategories, onClickSelectedCategory}) {
    return sub ? (
        <li className="my-1">
            <h4 onClick={() => onClickSelectedCategory(sub)}
                className={`cursor-pointer font-medium`}
            >{sub.name}</h4>


            {/****** show expanded category items ********/}
            {expandCategories && (
                <div className="ml-4">
                    {expandCategories[sub.name] && expandCategories[sub.name]?.map(item => (
                        <h5 className="my-1" onClick={() => handleToggleExpand(item, sub)}>{item.name}</h5>
                    ))}
                </div>
            )}


            {/*** prevent render category that recently closed or collapse items */}
            <ul className={``}>
                {sub.sub && !expandCategories[sub.name] && <CategoryRecursive
                    expandCategories={expandCategories}
                    onClickSelectedCategory={onClickSelectedCategory}
                    handleToggleExpand={handleToggleExpand}
                    sub={sub.sub}
                />}
            </ul>
        </li>
    ) : null
}


export default CategoryList;


