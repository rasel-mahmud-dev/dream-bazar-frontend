import * as React from "react";
import { useState, Suspense, useContext } from "react";

import { useDispatch, connect } from "react-redux";
import "./App.scss";
import "./styles/shared.scss";
import {Route, Link, Outlet} from "react-router-dom";
import { Modal, TopProgressBar, Tooltip } from "components/UI";

import MyRoutes from "./MyRoutes";

import Navigation from "components/Navigation/Navigation";
import Footer from "components/Footer/Footer";

import actions from "./store/actions";
const { closeNotify } = actions;

import CategoryNavbar from "components/categoryNavbar/CategoryNavbar";
import { AppContext, DeviceType } from "store/AppContext";
import throttle from "src/utills/throttle";
import useLanguage from "src/hooks/useLanguage";
import { setLanguage, toggleTheme } from "actions/appContextActions";
import { currentAuthAction } from "actions/authAction";
import { ACTION_TYPES } from "store/types";

function App(props) {
	const { appState } = props;

	const [afterNavHeight, setNavHeight] = React.useState(0);

	// const history = useHistory()
	const dispatch = useDispatch();
	const [count, setCount] = useState(0);
	const [products, setProducts] = React.useState([]);

	const [pagination, setPagination] = React.useState({
		page: 1,
		perPage: 5,
	});
	const [loadState, setLoaded] = React.useState<string>("");

	const [pathname, setPathname] = React.useState<string>("");

	const { contextState, contextDispatch } = useContext<any>(AppContext);

	React.useEffect(() => {
		let header = document.querySelector(".navigation") as HTMLDivElement;
		if (header && header.offsetHeight) {
			setNavHeight(header.offsetHeight);
		}
	}, [props.innerWidth]);

	React.useEffect(() => {
		(async function () {
			currentAuthAction(dispatch);

			/**
        we change this fetch all data once, we fetch individual category when we need it  .
       fetch individual root category from product filter page
       
       * */
			// let catRes = await apis.get("/api/ui-data/categories.json")
			// if(catRes.status === 200){
			//   dispatch({type: "SET_UI_CATEGORIES", payload:  catRes.data})
			// }

			// let filterItemsRes = await apis.get("/api/ui-data/filter-items.json")
			// if(catRes.status === 200){
			//   dispatch({type: "SET_UI_FILTER_ITEMS", payload:  filterItemsRes.data})
			// }

			// let categoryInfosRes = await apis.get("/api/ui-data/category-info.json")
			// if(catRes.status === 200){
			//   dispatch({type: "SET_UI_CATEGORIES_FILTER_INFO", payload:  categoryInfosRes.data})
			// }

			// const authData = await apis.post("/api/auth/current-auth")
			// dispatch({
			//   type: ACTION_TYPES.LOGIN,
			//   payload: authData.data.user
			// })
		})();

		// setPathname(history.location.pathname)
		// history.listen((h)=>{
		//   setPathname(h.pathname)
		// })

		setLanguage("", contextDispatch);
		toggleTheme("", contextDispatch);

		handlerWindowResize();
		window.addEventListener("resize", throttle(handlerWindowResize, 300));
		return () =>
			window.removeEventListener(
				"resize",
				throttle(handlerWindowResize, 300)
			);
	}, []);

	function handlerWindowResize() {
		if (window.innerWidth > 600 && window.innerWidth < 1000) {
			contextDispatch({
				type: ACTION_TYPES.SET_DEVICE_TYPE,
				payload: DeviceType.TABLET,
			});
		} else if (window.innerWidth < 600) {
			contextDispatch({
				type: ACTION_TYPES.SET_DEVICE_TYPE,
				payload: DeviceType.MOBILE,
			});
		} else {
			contextDispatch({
				type: ACTION_TYPES.SET_DEVICE_TYPE,
				payload: DeviceType.DESKTOP,
			});
		}
		contextDispatch({
			type: ACTION_TYPES.SET_WINDOW_WIDTH,
			payload: window.innerWidth,
		});
	}

	React.useEffect(() => {
		(async function () {
			const loaderRoot = document.querySelector("#loader-root");
			if (loaderRoot) {
				loaderRoot.innerHTML = null;
			}

			// setLoaded("load_start")
			// const { data } = await apis.get(`/api/products/?perPage=${pagination.perPage}&pageNumber=${pagination.page}`)
			// setProducts([...products, ...data.products])
			// setLoaded("load_end")
		})();
	}, [pagination.page]);

	function loadMore(e) {
		setPagination({
			...pagination,
			page: pagination.page + 1,
		});
	}

	function handleModalClose() {
		props.closeNotify();
	}

	function showBigCategoryNav(pathName) {
		let p = ["/p/s", "/p", "/p/", "/products/"];
		let isShow: boolean | number = false;

		for (let i = 0; i < p.length; i++) {
			if (pathName.startsWith(p[i])) {
				isShow = true;
				break;
			}
		}
		return isShow;
	}

	function handleC(e) {
		console.log(e.target.value);
	}

	const t = useLanguage(AppContext);

	return (
		<div className={`App`}>
			{/*  <Spin size={15}/>
      <div style={{width: 500 + "px", margin: "auto"}}>
      { renderProduct()  }
      <div style={{textAlign: "center"}}>
        { loadState === "load_start"
        ? <Spin size={15}/>
        : <Button onClick={loadMore} >Load More</Button>
        }
      </div>
    
      </div> */}

			<Navigation />

			<div className="App-Content ">
				<div className="header_space" />

				<div
					className={[
						"App-Content-mask",
						appState.backdrop.isOpen &&
						appState.backdrop.scope === "app"
							? "mask__open"
							: "mask__close",
					].join(" ")}
				/>

				{showBigCategoryNav(pathname) && <CategoryNavbar />}

				<Modal inProp={appState.isNotify} onClose={handleModalClose}>
					{appState.notificationMsg}
					{appState.notificationType === "add_to_cart" ? (
						<div>
							<Link to="/cart">Go To Cart</Link>
						</div>
					) : (
						""
					)}
				</Modal>

				<Suspense fallback={<TopProgressBar />}>
					<Outlet />
					{/*{ routes.map((route, i)=> <Route key={i} {...route} /> ) }*/}
				</Suspense>

				{/*<Tooltip delay={1000} placement={"top-left"} tooltip={<a>*/}
				{/*  Hi Iam tooltips*/}
				{/*  Hi Iam tooltips*/}
				{/*  Hi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltipsHi Iam tooltips*/}
				{/*</a>}>*/}
				{/*  <button>Mouse Over Here</button>*/}
				{/*</Tooltip>*/}

				<Footer />
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return { appState: state.appState };
}

export default connect(mapStateToProps, { closeNotify })(App);

// https://prestashopdemosite.com/theme/at_premiumo/demo/en/
