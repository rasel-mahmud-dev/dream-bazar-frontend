import React, {lazy, Suspense, useContext} from "react";
import "./Navigation.scss";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Badge, Button, Image, OnScroll, Popup, Typography,} from "components/UI";
// import ProductCategoryDropdown from "components/ProductCategoryDropdown/ProductCategoryDropdown"
import fullLink from "src/utills/fullLink";

import {
    BiSearch,
    BiUser,
    BsGithub, FaBars,
    FaFacebook,
    FaHeart,
    FaLanguage,
    FiMoon,
    GiShoppingBag,
    IoLanguageOutline,
} from "react-icons/all";

import {RootState} from "src/store";
import {setLanguage, toggleTheme} from "actions/appContextActions";
import {AppContext} from "store/AppContext";

import useLanguage from "src/hooks/useLanguage";
import staticImagePath from "src/utills/staticImagePath";
import CartDropdown from "components/Navigation/CartDropdown";
import {ACTION_TYPES} from "store/types";

const AuthDropdown = lazy(() => import("components/Navigation/AuthDropdown"));
const MoreDropdown = lazy(() => import("components/Navigation/MoreDropdown"));

const Title = Typography.Title.default;

function Navigation(props) {
    
    const {authState: {auth}, appState, cartState} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    
    
    const {contextState, contextDispatch} = useContext<any>(AppContext)
    
    const l = useLanguage(AppContext)
    
    const news = "From Yesterday our Online Shop will be Shutdown until Government don't declare next info.";
    
    const [isFixed, setFixed] = React.useState(false);
    
    const [state, setState] = React.useState({
        openDropdown: ""
    })
    
    
    React.useEffect(() => {
        //console.log(props.offsetTop)
        if (props.offsetTop > 100) {
            setFixed(true);
        } else {
            setFixed(false);
        }
    }, [props.offsetTop]);
    
    function renderCartProduct(top: number, isShow: boolean) {
        let totalPrice: number = 0;
        
        function calculateTotalPrice(item) {
            let perItemPrice = item.quantity * item.unitPrice;
            totalPrice += perItemPrice;
        }
        
        // @ts-ignore
        return (
            <Popup
                timeout={500}
                animationClass="nav-popup-menu"
                inProp={isShow}
            >
                <div
                    style={{padding: "5px 10px"}}
                    className="render_cart d-flex align-center fs-14"
                >
                    <div>
                        <table className="cart_table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th className="t-center">Quantity</th>
                                    <th className="t-center">Item Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartState.cartProducts.map((item, i) => (
                                    // @ts-ignore
                                    <tr key={i}>
                                        <td className="title_td">
                                            <div className="cart_image_div">
                                                <Image
                                                    className="cart_image"
                                                    src={fullLink(item.image)}
                                                    maxWidth={50}
                                                />
                                            </div>
                                            <Title level={4}>
                                                {" "}
                                                {item.title}{" "}
                                            </Title>
                                        </td>
                                        <td className="t-center">
                                            {item.quantity}
                                        </td>
                                        <td className="t-center">
                                            {item.unitPrice} TK
                                        </td>
                                        {calculateTotalPrice(item)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/*<Divider lineColor="#e2e2e2" lineHeight={0.5} className="mt-2 mb-2" />*/}
                        <div>
                            <h4>Total Price: {totalPrice} TK</h4>
                            <Button
                                className={"m-0 p-0"}
                                type="link"
                                to="/shopping/cart"
                            >
                                Go To Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </Popup>
        );
    }
    
    function handleChangeTheme(e) {
        toggleTheme(e.target.value, contextDispatch)
    }
    
    function handleChangeLanguage(e) {
        setLanguage(e.target.value, contextDispatch)
    }
    
    function handleToggleLeftBar(){
        dispatch({
            type: ACTION_TYPES.TOGGLE_LEFT_BAR
        })
    }
    
    // @ts-ignore
    return (
        <div className={["navigation", isFixed ? "nav_fixed" : ""].join(" ")}>
            {/* top navigation */}
            <div className="bg-white dark:bg-neutral-800  py-1 ">
                
             
                
                <div className="grid grid-cols-12 justify-between w-full max-w-8xl mx-auto px-4">
                    <div className="col-span-2 flex items-center gap-x-4  dark:text-white">
                        <FaFacebook/>
                        <BsGithub/>
                        <FaFacebook/>
                        <BsGithub/>
                        <FaLanguage/>
                    </div>

                    <div className="col-span-8">
                        {/* @ts-ignore */}
                        <marquee>
                            <h6 className="dark:text-white">{news}</h6>
                            {/* @ts-ignore */}
                        </marquee>
                    </div>

                    <div className="col-span-2 flex w-full gap-x-4">
                        <li className="flex items-center justify-end dark:text-white">
                            <IoLanguageOutline className="text-md"/>
                            <select onChange={handleChangeLanguage} name="" id="" value={contextState.lang}
                                    className="dark:bg-neutral-600 dark:text-white">
                                <option value="bn">{l('Bangla')}</option>
                                <option value="en">{l('English')}</option>
                            </select>
                        </li>
                         <li className="flex items-center justify-end dark:text-white">
                            <FiMoon className="text-md"/>
                            <select onChange={handleChangeTheme} name="" id="" value={contextState.theme}
                                    className="dark:bg-neutral-600 dark:text-white">
                                <option value="dark">{l("Dark", "Dark")}</option>
                                <option value="light">{l("Light", "Light")}</option>
                                <option value="system">{l("System", "System")}</option>
                            </select>
                        </li>
                        {/*<button onClick={()=>dispatch({type: ACTION_TYPES.CHOOSE_LANGUAGE, payload: "en"})}>EN</button>*/}
                        {/*<button onClick={()=>dispatch({type: ACTION_TYPES.CHOOSE_LANGUAGE, payload: "bn"})}>BN</button>*/}
                    </div>
                </div>
            </div>

            <div className="main-nav bg-green-450">
                <div className="max-w-8xl mx-auto px-4 flex items-center">
                    
                    <div className="md:hidden block mr-3 ">
                        <FaBars className="text-xl" onClick={handleToggleLeftBar} />
                    </div>
                    
                    <div className="grid grid-cols-12 items-center w-full">
                        
                        <div className="col-span-2 logo">
                            
                            <Link to="/" className="flex items-center">
                                <img src="/logo-2.png" alt="" className="w-9 md:w-11"/>
                                <h4 className="text-white font-semibold text-lg md:text-xl   md:block">
                                     DreamBajar
                                </h4>
                            </Link>
                        </div>
                  
                        
                        <div className="col-span-6 flex w-full  ">
                            {/* <ProductCategoryDropdown /> */}
                            
                            {/***** search bar *******/}
                            <div className="hidden items-center  w-full  lg:flex">
                                <div
                                    className="bg-white/30 py-2 px-4 flex justify-between items-center rounded-full w-full">
                                    <div className="flex items-center border-r border-white pr-2">
                                        <select name="" id=""
                                                className="bg-transparent text-white outline-none border-none w-auto placeholder-white">
                                            <option value="">All</option>
                                            <option value="">Title</option>
                                            <option value="">Brand</option>
                                        </select>
                                        {/*<FaAngleDown className="text-white text-xl" />*/}
                                    </div>
                                    <input
                                        placeholder="Search for products, brand and more"
                                        className="bg-transparent w-full outline-none text-white placeholder-white ml-2 "
                                    />
                                    <BiSearch className="text-white text-xl"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-4 justify-self-end">
                            
                            <div className="flex gap-x-4 ">
                                
                                 {/*** mobile search icon *****/}
                                 <li className="md:hidden relative flex items-center gap-x-2 py-5">
                                    <div className="flex justify-end ">
                                        <BiSearch className="text-2xl text-white"/>
                                    </div>
                                 </li>
                                
                                <li className="relative flex items-center gap-x-2 py-5"
                                    onMouseEnter={() => setState({...state, openDropdown: "cart"})}
                                    onMouseLeave={() => setState({...state, openDropdown: ""})}>
                                 
                                    <Badge className="bg-red-500">{cartState.cartProducts.length > 0 ? cartState.cartProducts.length : ""}</Badge>
                                    
                                    <GiShoppingBag className="text-white text-2xl "/>
                                    <span className="font-medium text-white hidden md:block">
                                        {l("In Cart")}
                                    </span>
                                    <Suspense fallback={<h1>loading</h1>}>
                                        <CartDropdown
                                            className="-right-40 top-14"
                                            isShow={state.openDropdown === "cart"}
                                        />
                                    </Suspense>
                                </li>
                                
                                <li className="flex items-center gap-x-2 py-5 ">
                                    <FaHeart className="text-white text-2xl"/>
                                    <span className="font-medium text-white hidden md:block">
                                        {l("Favorite")}
                                    </span>
                                </li>
                                
                                <li className="relative flex items-center gap-x-2 py-5 "
                                    onMouseEnter={() => setState({...state, openDropdown: "auth"})}
                                    onMouseLeave={() => setState({...state, openDropdown: ""})}
                                >
                                    {auth && auth.avatar ? (
                                        <div className="w-6">
                                            <img className="rounded-full" src={staticImagePath(auth.avatar)} alt=""/>
                                        </div>
                                    ) : <BiUser className="text-white text-2xl"/>
                                    }
    
                                    <span className="font-medium text-white hidden md:block">
                                        {auth ? auth.firstName : l("Account")}
                                    </span>
                                    <Suspense fallback={<h1>loading</h1>}>
                                         <AuthDropdown className="right-0 top-14"
                                                       isShow={state.openDropdown === "auth"}/>
                                    </Suspense>
                                </li>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default OnScroll(Navigation, 300, 200)
