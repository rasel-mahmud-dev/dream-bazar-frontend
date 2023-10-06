import React, {FC, HTMLAttributes} from "react";
import {AiFillStar} from "react-icons/ai";

interface Props extends  HTMLAttributes<HTMLDivElement> {
    rating: {rate: number}
}

const RatingStar: FC<Props> =({rating, className, ...atrr})=>{
    return(
     
            <div className={`flex ${className}`} {...atrr}  >
            { new Array(5).fill(1).map((item, index)=>(
                <div key={index} className="relative">
                    <AiFillStar className={`${rating.rate <= (index + 1) ? "text-neutral-200" : " text-transparent"} `} />
                    <span className="absolute top-0">
                    { rating.rate >= (index + 1) && <AiFillStar className="text-orange-400" />  }
                    </span>
                </div>
            )) }
        </div>
   
    )
  }

  export default RatingStar