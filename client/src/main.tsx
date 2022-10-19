import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import './index.css'
import App from './App'
import {BrowserRouter, HashRouter} from "react-router-dom"
import createStore from "src/store"
import AppContextProvider from "store/AppContext";


const store = createStore()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AppContextProvider>
        </Provider>
    </React.StrictMode>
)

