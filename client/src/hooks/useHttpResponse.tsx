import { useState } from "react";

function useHttpResponse() {
    const [httpStatus, setterHttpStatus] = useState({
        isLoading: false,
        message: "",
        isSuccess: true,
    });

    function setHttpStatus(state: { isLoading?: boolean; message?: string; isSuccess?: boolean }) {
        setterHttpStatus((prevState) => ({ ...prevState, ...state }));
    }

    function resetHttpStatus(){
        setterHttpStatus({
            isLoading: false,
            message: "",
            isSuccess: true,
        })
    }

    return {httpStatus, setHttpStatus, resetHttpStatus};
}

export default useHttpResponse;