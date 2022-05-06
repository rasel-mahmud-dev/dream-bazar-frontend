
import React from "react"
import {Switch, Route, NavLink, Link, useHistory} from "react-router-dom"

import ProductController from "../Components/ProductController"
import CategoryController from "../Components/CategoryController"
import BrandController from "../Components/BrandController"

import "./Dashboard.scss"  

import {Menu} from "src/components/UI"


const {SubMenu} = Menu

const SideBar = (props)=> {  
  const {pathname, baseURL} = props
  let [collapseIds, setCollapseIds] = React.useState([""])
  
  function handleClick(key){
    setCollapseIds([key])
  }

  return (
      <div className="dashboard_sidebar"> 
        <Menu 
            onClick={handleClick} 
            selectedKeys={["mail"]} 
            defaultOpenKeys={collapseIds}
          > 
            
            <SubMenu 
              key="sub1" 
              title={ <span>
                  <i className="fa fa-heart" />
                  <span>Products</span>
                </span>
              }
            >
            <Menu.Item key="1">
             <Link to={baseURL + '/products'}>Products</Link>
            </Menu.Item>
            <Menu.Item key="2">
             <Link to={baseURL + '/products'}>Add Products</Link>
            </Menu.Item>
            </SubMenu>
            
            <SubMenu
              key="sub2"
              title={
                <span>
                  <i className="fa fa-heart" />
                  <span>Categories</span>
                </span>
              }
            >
            <Menu.Item key="2">
              <Link to={baseURL + '/categories'}>Categories</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={baseURL + '/categories'}>Add New Categories</Link>
            </Menu.Item>
            </SubMenu>
            
            <SubMenu
              key="sub3"
              title={
                <span>
                  <i className="fa fa-heart" />
                  <span>Brands</span>
                </span>
              }
            >
            <Menu.Item key="1">
              <Link to={baseURL + '/brands'}>Brands</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to={baseURL + '/brands'}>Add Brands</Link>
            </Menu.Item>
            </SubMenu>
            
            <Menu.Item key="324" icon="fa fa-map-marker-alt">
              <Link to={`/customer/guest`}>Customer Dashboard</Link>
            </Menu.Item>
        </Menu>
        
        
      </div>
    )
}


const Dashboard = (props) =>{ 
  const history = useHistory()
  const pathname = history.location.pathname 
  const baseURL = "/auth/admin/dashboard"
  
  function addNestedRoutes(){
    const routes = [
      {path: "/products", component: ProductController},
      {path: "/categories", component: CategoryController},
      {path: "/brands", component: BrandController}
    ]
    // <Route exact={true} path="/auth/admin/dashboard/products" render={(props)=><ProductController {...props} pathname={pathname} /> } />
    //<Route exact={true} path="/auth/admin/dashboard/categories" component={CategoryController} />
    //<Route exact={true} path="/auth/admin/dashboard/brands" component={BrandController} />

    return (
      <Switch>
        {routes.map((route, i)=> <Route
          key={i}
          path={baseURL + route.path} 
          component={route.component} 
        /> 
        )}
      </Switch>
    )
  }
  
  return (
      <div>
        <div className="sidebar-row">
          <SideBar baseURL={baseURL} pathname={pathname} /> 
          <div className="dashboard_content">
            {addNestedRoutes()}
          </div>
        </div>
         
       
      </div>
    )
}
export default Dashboard