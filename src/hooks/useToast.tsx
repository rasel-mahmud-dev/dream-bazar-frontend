import React from "react";
import {ToastContainer, toast, ToastContainerProps, ToastContent, Id, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps{
    error: (msg: string)=>void,
    success: (msg: string)=>void,
}
function useToast(): [ToastProps, React.ForwardRefExoticComponent<ToastContainerProps & React.RefAttributes<HTMLDivElement>>] {
    return [toast, ToastContainer]
}

export default useToast