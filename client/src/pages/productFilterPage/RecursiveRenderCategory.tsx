import {FC} from "react";
import {FaAngleRight} from "react-icons/all";
import {CategoryType} from "pages/productFilterPage/CategoryList";


type Props = {
    selectedCategory: CategoryType | null,
    category: {[key: string]: CategoryType } | any,
    handleClick: (item: CategoryType)=> void, filterCategory: any
}


const RecursiveRenderCategory: FC<Props> = (props)=>{

    const { category, handleClick, filterCategory, selectedCategory } = props

    return (
        <div className="">
            {  category && Object.keys(category) && Object.keys(category).map((key: string, index: number)=>(
                <ul className="ml-4" key={index}>
                    <li>
                        <div
                            onClick={()=>handleClick(category[key])}
                            className={`flex justify-between items-center hover:text-blue-500 cursor-pointer select-none py-1 pl-2 ${selectedCategory && (category[key].id === selectedCategory.id ) ? "text-white bg-blue-500" : ''} `}>
                            <label className="font-medium cursor-pointer" htmlFor={category[key].id}>{category[key].name}</label>

                            {!category[key].parentId && <FaAngleRight /> }
                        </div>

                        {(category[key].sub) && <RecursiveRenderCategory
                            selectedCategory={selectedCategory}
                            category={category[key].sub}
                            handleClick={handleClick}
                            filterCategory={false}
                        />}
                    </li>
                </ul>
            ))  }
        </div>
    )
}


export default RecursiveRenderCategory