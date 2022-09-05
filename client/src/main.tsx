import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import './index.css'
import App from './App'
import { HashRouter} from "react-router-dom"
import createStore from "src/store"


const store = createStore()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    // </React.StrictMode>
)

