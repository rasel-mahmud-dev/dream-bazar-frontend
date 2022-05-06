import React from 'react'
import ReactDOM from 'react-dom' 
import { Provider } from "react-redux"
import './index.css'
import App from './App'
import "./asserts/fonts/roboto.css"
import "./asserts/fontawesome-pro-5.14.0-web/css/all.css"
import {BrowserRouter, HashRouter} from "react-router-dom"
import createStore from "src/store"


const store = createStore({})

ReactDOM.render(
  <React.StrictMode> 
    <Provider store={store}>
      {/*<BrowserRouter basename="multiproduct-ecomerce-app-deploy"> // for github page static files*/}
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLDivElement
)
