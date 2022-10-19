import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import './index.css'
import createStore from "src/store"
import AppContextProvider from "store/AppContext";
import MyRoutes from "src/MyRoutes";


const store = createStore()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    
        <Provider store={store}>
            <AppContextProvider>
                <MyRoutes />
            </AppContextProvider>
        </Provider>

)

