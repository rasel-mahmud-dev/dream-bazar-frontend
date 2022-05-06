import {lazy} from "react"

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

import T from "./pages/T/T"

// const D = lazy(()=>import("src/pages/D"))
import D from  "src/pages/D"

const routes = [
  { path: "/", exact: true, component: HomePage },
  { path: "/p", exact: true, component: ProductFilterPage },
  { path: "/t", exact: true, component: T },
  { path: "/p/s", exact: true, component: StorePage },
  { path: "/prod/:name", exact: true, component: OneTypeProducts },
  { path: "/auth/admin/dashboard", exact: false, component: Dashboard },
  { path: "/products/:productId", exact: true, component: ProductDetails },
  { path: "/products", exact: true, component: Products },
  { path: "/shopping/cart", exact: true, component: CartPage },
  { path: "/shopping/cart/checkout", exact: true, component: CheckoutPage },
  { path: "/shopping/cart/payment", exact: true, component: PaymentPage },
  { path: "/auth/registration", exact: true, component: RegistrationPage },
  { path: "/auth/registration/phone-verification", exact: true, component: EmailAndPhoneVerification },
  { path: "/auth/registration/email-verification", exact: true, component: EmailAndPhoneVerification },
  { path: "/auth/login", exact: true, component: LoginPage },
  { path: "/customer/:name", exact: false, component: CustomerDashboard },
  { path: "/seller", exact: false, component: SellerHub },
  { path: "/store-list", exact: false, component: StoreList },
  { path: "/auth/callback/:authService", exact: false, component: TestPage },
  { path: "/d", exact: false, component: D },
]

export default routes




