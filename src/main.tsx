import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import './index.css'
import createStore from "src/store"
import AppContextProvider from "store/AppContext";
import MyRoutes from "src/MyRoutes";

import useToast from "src/hooks/useToast";

const store = createStore()

function MainComponent(props){
    const [_, ToastContainer] = useToast()
    
    useEffect(()=>{
        const loaderRoot = document.querySelector(".loader-root");
        if (loaderRoot) {
            loaderRoot.innerHTML = null;
        }
    
    }, [])
    
    return <>
        <ToastContainer />
        {props.children}
    </>
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <Provider store={store}>
            <AppContextProvider>
                <MainComponent>
                    <MyRoutes />
                </MainComponent>
            </AppContextProvider>
        </Provider>
)

