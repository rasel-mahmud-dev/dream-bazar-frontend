import React, {FC, HTMLAttributes} from 'react'
import {Spin} from "UI/index";

interface Props extends HTMLAttributes<HTMLDivElement>{
	message: string | "pending" | ""
	statusCode?: 200 | 500,
	messageClass?: ""
	
}

const ActionInfo: FC<Props> = ({message, statusCode= 200, className}) =>{
	return (
		
		<div className={`${className} my-4 `}>

            {message === "pending" && (
	            <div className="w-7/12 mx-auto">
		            <div className="mx-auto flex justify-center">
			            <Spin className="!w-9 !h-9"/>
		            </div>
	            </div>
            )}
			
			{(message && message !== "pending") && (
				<div className="">
                    <div className={`py-3 px-4 rounded-md  ${statusCode > 200 ? "bg-red-400 " : "bg-green-450 "} text-white shadow-lg`}>
                        <div className="">
                            {/*<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">*/}
                            {/*    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>*/}
                            <span>{message}</span>
                        </div>
                    </div>

                </div>
			)}

        </div>
	)
}


export default ActionInfo