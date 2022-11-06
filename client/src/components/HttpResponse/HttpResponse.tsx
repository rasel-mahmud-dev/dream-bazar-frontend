import React, { FC } from "react";
import Loader from "UI/Loader/Loader";
import Card from "UI/Form/Card/Card";

interface Props {
    state: {
        message?: string;
        isSuccess?: boolean;
        loading: boolean;
    };
    className?: string;
    loadingTitle?: string;
}

const HttpResponse: FC<Props> = (props) => {
    const {
        state: { message, isSuccess, loading },
        loadingTitle = "",
        className = "",
    } = props;
    return (
        <div className={`${className} my-2 `}>
			{loading && (
                <Card className="!py-3">
					<div className="">
						<Loader title={loadingTitle} size="small" className="flex justify-center" />
					</div>
				</Card>
            )}
            
            {message && message !== "" && (
                <Card className="!py-0 px-0">
					<div
                        className={`alert rounded-md py-3 px-4 ${
                            !isSuccess ? "bg-red-500/10 text-red-500 " : "bg-green-500/20 text-green-700"
                        } font-semibold `}
                    >
						<div className="flex gap-x-2 items-center">
							<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
								<path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
							</svg>
							<span>{message}</span>
						</div>
					</div>
				</Card>
            )}
		</div>
    );
};

export default HttpResponse;
