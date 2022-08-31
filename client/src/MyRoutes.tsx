import {lazy} from "react"

import {Routes, Route, } from "react-router-dom"

const HomePage = lazy(()=>import("pages/homePage/HomePage"))
const Products = lazy(()=>import("src/pages/Products/Products"))
const ProductDetails = lazy(()=>import("src/pages/ProductDetails/ProductDetails"))
const OneTypeProducts = lazy(()=>import("src/pages/oneTypeProducts/OneTypeProducts"))
const Dashboard = lazy(()=>import("src/pages/Admin/Dashboard/Dashboard"))
const CartPage = lazy(()=>import("src/pages/CartPages/Index"))
const CheckoutPage = lazy(()=>import("src/pages/CartPages/CheckoutPage"))
const PaymentPage = lazy(()=>import("src/pages/CartPages/PaymentPage"))
const LoginPage = lazy(()=>import("src/pages/Auth/LoginPage"))
const RegistrationPage = lazy(()=>import("src/pages/Auth/RegistrationPage"))
const CustomerDashboard = lazy(()=>import("src/pages/Customer/Dashboard"))
const TestPage = lazy(()=>import("src/pages/Test/Test")) 

const SellerHub = lazy(()=>import("src/pages/SellerHub/Index"))
const StoreList = lazy(()=>import("src/pages/SellerHub/StoreList/StoreList"))

const EmailAndPhoneVerification = lazy(()=>import("src/pages/Auth/EmailVerification"))
const ProductFilterPage = lazy(()=>import("src/pages/productFilterPage/ProductFilterPage"))
const StorePage = lazy(()=>import("src/pages/storePage/StorePage"))


const MyRoutes = ()=>{
  return (
      <Routes>
        <Route path="/" element={<HomePage />}>
        </Route>
        <Route path="/p" element={<Products />} />
      </Routes>
  )
}

export default MyRoutes

// const routes = [
//   { path: "/", exact: true, element: <HomePage/> },
//   { path: "/p", exact: true, element: <ProductFilterPage/> },
//   { path: "/t", exact: true, element: <T/> },
//   { path: "/p/s", exact: true, element: <StorePage/> },
//   { path: "/prod/:name", exact: true, element: <OneTypeProducts/> },
//   { path: "/auth/admin/dashboard", exact: false, element: <Dashboard/> },
//   { path: "/products/:productId", exact: true, element: <ProductDetails/> },
//   { path: "/products", exact: true, element: <Products/> },
//   { path: "/shopping/cart", exact: true, element: <CartPage/> },
//   { path: "/shopping/cart/checkout", exact: true, element: <CheckoutPage/> },
//   { path: "/shopping/cart/payment", exact: true, element: <PaymentPage/> },
//   { path: "/auth/registration", exact: true, element: <RegistrationPage/> },
//   { path: "/auth/registration/phone-verification", exact: true, element: <EmailAndPhoneVerification/> },
//   { path: "/auth/registration/email-verification", exact: true, element: <EmailAndPhoneVerification/> },
//   { path: "/auth/login", exact: true, element: <LoginPage/> },
//   { path: "/customer/:name", exact: false, element: <CustomerDashboard/> },
//   { path: "/seller", exact: false, element: <SellerHub/> },
//   { path: "/store-list", exact: false, element: <StoreList/> },
//   { path: "/auth/callback/:authService", exact: false, element: <TestPage/> },
//   { path: "/d", exact: false, element: <D/> },
// ]





