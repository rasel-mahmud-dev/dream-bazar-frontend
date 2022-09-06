import React from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
    OnScroll,
    Button,
    Menu,
    Popup,
    Badge,
    Typography,
    Image,
} from "components/UI";
// import ProductCategoryDropdown from "components/ProductCategoryDropdown/ProductCategoryDropdown"
import { ACTION_TYPES } from "store/types";
import fullLink from "src/utills/fullLink";
import { InputGroup } from "UI/Form";
import {
    BiHeart,
    BiSearch,
    BiShoppingBag,
    BiUser,
    BsGithub,
    CgShoppingBag,
    CgShoppingCart,
    FaFacebook,
    FaHeart,
    FaLanguage,
    FiShoppingCart,
    GiShoppingBag,
    GrLanguage,
    MdLanguage,
    IoLanguageOutline,
} from "react-icons/all";

const Title = Typography.Title.default;

function Navigation(props) {
    const { authState, logout, cartState } = props;
    const dispatch = useDispatch();

    const news =
        "From Yesterday our Online Shop will be Shutdown untill Governer don't declear next info.";
    const [isFixed, setFixed] = React.useState(false);
    const [isShow, setShow] = React.useState("");
    React.useEffect(() => {
        //console.log(props.offsetTop)
        if (props.offsetTop > 100) {
            setFixed(true);
        } else {
            setFixed(false);
        }
    }, [props.offsetTop]);

    function handleMouseHover(e) {
        setShow(e.target.dataset.id);
    }

    function handleMouseLeave(e) {
        setShow("");
    }

    const popupStyle = {
        position: "absolute",
        right: "0px",
    };

    function renderMenuMore(top, isShow) {
        return (
            <Popup
                timeout={500}
                animationClass="nav-popup-menu"
                style={popupStyle}
                bg="white"
                inProp={isShow}
            >
                <Menu>
                    <Menu.Item key="6">
                        <Link to="/store-list">store</Link>
                    </Menu.Item>
                </Menu>
            </Popup>
        );
    }

    function handleLogout() {
        alert("You'r log outed");
        window.localStorage.setItem("token", "");
        dispatch({
            type: ACTION_TYPES.LOGIN,
            payload: { _id: null },
        });
    }

    function renderAuthMenu(top = 20, isShow) {
        return (
            <Popup
                timeout={500}
                animationClass="nav-popup-menu"
                style={popupStyle}
                bg="white"
                inProp={isShow}
            >
                <div
                    style={{ padding: "5px 10px" }}
                    className="text-dark-A400 d-flex align-center"
                >
                    <span>New Customer?</span>
                    <Link
                        to={`/auth/registration?redirect=/`}
                        style={{ marginLeft: "10px" }}
                    >
                        Sign Up
                    </Link>
                </div>
                {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}
                <Menu>
                    <Menu.Item icon="fa fa-user" key="1">
                        {authState._id ? (
                            <Link
                                to={`${
                                    authState.role === "customer"
                                        ? "/customer/" + authState.username
                                        : "/auth/admin/dashboard"
                                }`}
                            >
                                My Profile
                            </Link>
                        ) : (
                            <Link to="/auth/login/?redirect=dashboard">
                                My Profile
                            </Link>
                        )}
                    </Menu.Item>
                    {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}

                    <Menu.Item icon="fa fa-heart" key="3">
                        <Link
                            to={`/customer/${
                                authState.username
                                    ? authState.username
                                    : "Guest"
                            }/my-orders`}
                        >
                            Order
                        </Link>
                    </Menu.Item>
                    {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}

                    <Menu.Item icon="fa fa-heart" key="4">
                        Wishlist
                    </Menu.Item>
                    {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}

                    {authState._id ? (
                        <Menu.Item
                            onClick={() => handleLogout()}
                            icon="fa fa-sign-out-alt"
                            key="5"
                        >
                            Logout
                        </Menu.Item>
                    ) : (
                        <Menu.Item icon="fa fa-sign-in-alt" key="6">
                            <Link to="/auth/login/?redirect=home">Login</Link>
                        </Menu.Item>
                    )}
                </Menu>
            </Popup>
        );
    }

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
                style={{ ...popupStyle, top: top + "px" }}
                bg="white"
                inProp={isShow}
            >
                <div
                    style={{ padding: "5px 10px" }}
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

    return (
        <div className={["navigation", isFixed ? "nav_fixed" : ""].join(" ")}>
            {/* top navigation */}
            <div className="bg-white py-1">
                <div className="grid grid-cols-12 justify-between w-full max-w-8xl mx-auto px-4">
                    <div className="col-span-2 flex items-center gap-x-4">
                        <FaFacebook />
                        <BsGithub />
                        <FaFacebook />
                        <BsGithub />
                        <FaLanguage />
                    </div>

                    <div className="col-span-8">
                        <marquee>
                            <h6 className="">{news}</h6>
                        </marquee>
                    </div>

                    <div className="col-span-2 flex w-full ">
                        <li className="flex items-center justify-end">
                            <IoLanguageOutline className="text-md" />
                            <select name="" id="">
                                <option value="bn">Bangla</option>
                                <option value="en">English</option>
                            </select>
                        </li>
                        {/*<button onClick={()=>dispatch({type: ACTION_TYPES.CHOOSE_LANGUAGE, payload: "en"})}>EN</button>*/}
                        {/*<button onClick={()=>dispatch({type: ACTION_TYPES.CHOOSE_LANGUAGE, payload: "bn"})}>BN</button>*/}
                    </div>
                </div>
            </div>

            <div className="main-nav bg-green-450">
                <div className="max-w-8xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between w-full">
                        <h2 className=" w-full">
                            <Link to="/" className="flex items-center">
                                <img src="/logo-2.png" alt="" />
                                <h4 className="text-white font-semibold text-xl">
                                    Ecommerce
                                </h4>
                            </Link>
                        </h2>

                        <div className=" flex  ">
                            {/* <ProductCategoryDropdown /> */}
                            <div className="flex items-center">
                                <div className="bg-white/30 py-2 px-4 flex justify-between items-center rounded-full">
                                    <input
                                        placeholder="Search for products, brand and more"
                                        className="bg-transparent w-full outline-none text-white placeholder-white"
                                    />
                                    <BiSearch className="text-white text-xl" />
                                </div>

                                {/*<Button className="py-10" type="primary">Search</Button>*/}
                            </div>
                            {/*<div className="flex items-center">*/}
                            {/*    <Button*/}
                            {/*        type="primary"*/}
                            {/*        className="relative"*/}
                            {/*        data-id="login-button"*/}
                            {/*        onMouseEnter={handleMouseHover}*/}
                            {/*        onMouseLeave={handleMouseLeave}*/}
                            {/*    >*/}
                            {/*        Login*/}
                            {/*        {renderAuthMenu(*/}
                            {/*            20,*/}
                            {/*            isShow === "login-button" ? true : false*/}
                            {/*        )}*/}
                            {/*    </Button>*/}

                            {/*    <Button*/}
                            {/*        type="primary"*/}
                            {/*        className="relative"*/}
                            {/*        data-id="more-nav"*/}
                            {/*        onMouseEnter={handleMouseHover}*/}
                            {/*        onMouseLeave={handleMouseLeave}*/}
                            {/*    >*/}
                            {/*        More*/}
                            {/*        {renderMenuMore(*/}
                            {/*            20,*/}
                            {/*            isShow === "more-nav" ? true : false*/}
                            {/*        )}*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                        </div>

                        <div className="w-full">
                            {/*<li*/}
                            {/*    className="relative"*/}
                            {/*    data-id="cart"*/}
                            {/*    onClick={handleMouseHover}*/}
                            {/*>*/}
                            {/*    <i className="relative far fa-shopping-bag event-none">*/}
                            {/*        <Badge*/}
                            {/*            count={12}*/}
                            {/*            style={{*/}
                            {/*                background: "#955afd",*/}
                            {/*                position: "absolute",*/}
                            {/*                top: -15,*/}
                            {/*                left: 5,*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*    </i>*/}
                            {/*    {renderCartProduct(30, isShow === "cart")}*/}
                            {/*</li>*/}

                            {/*/!*<Link to="/cart" className="cart_menu">*!/*/}
                            {/*/!*  <i className="far fa-shopping-bag" />*!/*/}
                            {/*/!*  <span className="badge">{props.cartItems}</span>*!/*/}
                            {/*/!*</Link>*!/*/}
                            {/*/!*<span>Cart</span>*!/*/}

                            {/*<Button*/}
                            {/*    className="relative auth_nav_item bg-primary px-5"*/}
                            {/*    onMouseEnter={handleMouseHover}*/}
                            {/*    onMouseLeave={handleMouseLeave}*/}
                            {/*    data-id="auth_menu"*/}
                            {/*>*/}
                            {/*    {authState._id && authState.avatar ? (*/}
                            {/*        <img*/}
                            {/*            className="user-avatar"*/}
                            {/*            src={fullLink(authState.avatar)}*/}
                            {/*        />*/}
                            {/*    ) : (*/}
                            {/*        <i className="far fa-user-circle" />*/}
                            {/*    )}*/}
                            {/*    <span>*/}
                            {/*        {authState._id && authState.username}*/}
                            {/*    </span>*/}
                            {/*    {renderAuthMenu(20, isShow === "auth_menu")}*/}
                            {/*</Button>*/}

                            <div className="flex w-full justify-center">
                                <li className="flex items-center gap-x-2">
                                    <GiShoppingBag className="text-white text-2xl" />
                                    <p className="font-medium text-white">
                                        In Cart
                                    </p>
                                </li>

                                <li className="flex items-center gap-x-2">
                                    <FaHeart className="text-white text-2xl" />
                                    <p className="font-medium text-white">
                                        Favorite
                                    </p>
                                </li>
                                <li className="flex items-center gap-x-2">
                                    <BiUser className="text-white text-2xl" />
                                    <p className="font-medium text-white">
                                        Account
                                    </p>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        authState: state.authState,
        // cartItems: 10
        cartItems: state.cartState.cartProducts.length,
        cartState: state.cartState,
    };
}

export default connect(mapStateToProps, {})(OnScroll(Navigation, 300, 200));
