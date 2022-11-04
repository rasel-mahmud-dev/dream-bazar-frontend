import React, {FC} from 'react'
import Loader from "UI/Loader/Loader";

interface Props{
    state: {
        message?: string
        isSuccess?: boolean
        loading: boolean
    }
    className?: string,
    loadingTitle?: string
}

const ResponseMessage:FC<Props>  = (props)=>{
    const {state: {message,  isSuccess, loading}, loadingTitle="", className=""} = props
    return (
        <div className={`${className} my-4 `}>

            {loading  && (
                <div className=""><Loader title={loadingTitle} size="small"  className="flex justify-center" /></div>
            )}

            {(message && message !== "") && (
       
                    <div className={`alert rounded-md  ${!isSuccess ? "bg-rose-700 " : "bg-green-450"} text-white font-bold shadow-lg`}>
                        <div className="flex gap-x-2 items-center py-3 px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{message}</span>
                        </div>
                    </div>

       
            )}

        </div>
    )
}


export default ResponseMessage