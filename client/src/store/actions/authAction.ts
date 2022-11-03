import {ACTION_TYPES, Scope} from "store/types";
import apis, {getApi} from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";

export const loginHandler = (user, scope: Scope, dispatch) => {
   dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: {
            scope: scope,
            authData: user
        },
    });
};

function setToken(token, scopeName) {
    window.localStorage.setItem(scopeName, token)
}


// login action for customer, seller and admin user separately
export const loginAction = async (userData, dispatch, scope: Scope, cb: (data: object, errorMessage?: string) => void) => {
    try {
    
        if (scope === Scope.ADMIN_DASHBOARD) {
            let {data, status} = await apis.post("/api/admin/login", userData);
            if (status === 201) {
                loginHandler(data.admin, scope, dispatch)
                setToken(data.token, Scope.ADMIN_DASHBOARD)
                cb && cb(data.admin, "")
            } else {
                cb && cb({}, "Unable to connect with server")
            }
        }
    
        // login for seller dashboard
        else if (scope === Scope.SELLER_DASHBOARD) {
            let {data, status} = await apis.post("/api/seller/login", userData);
            if (status === 201) {
                loginHandler(data.seller, scope, dispatch)
                setToken(data.token, Scope.SELLER_DASHBOARD)
                cb && cb(data.seller, "")
            } else {
                cb && cb({}, "unable to connect with server")
            }
            
            //    login for ecommerce site
        } else if (scope === Scope.USER) {
            const {status, data} = await apis.post("/api/auth/login", userData);
            if (status === 201) {
                loginHandler(data.user, scope, dispatch)
                setToken(data.token, Scope.USER)
                cb && cb(data.user, "")
            } else {
                cb && cb({}, "unable to connect with server")
            }
        }
        
    } catch (ex) {
        cb && cb({}, errorMessageCatch(ex))
    }
}


export const registrationAction = async (userData, scope: Scope, dispatch, cb: (data: object, errorMessage?: string) => void) => {
    
    try {
        const {data, status} = await apis.post("/api/auth/registration", userData)
        if (status === 201) {
            loginHandler(data.user, scope, dispatch)
            cb && cb(data.user, "")
        } else {
            cb && cb({}, "Error")
        }
    } catch (ex) {
        cb && cb({}, errorMessageCatch(ex))
    }
    
}

export const currentAuthAction = async (dispatch, scope: Scope) => {
    try {
    
            console.log("ASDDDDDDDD")
        if (scope === Scope.ADMIN_DASHBOARD) {
            let response = await getApi(scope).get("/api/auth/admin/current-auth")
            if (response.status === 200) {
                loginHandler(response.data, scope, dispatch)
            }
        
        } else if (scope === Scope.SELLER_DASHBOARD) {
            let response = await getApi(scope).get("/api/auth/seller/current-auth")
            if (response.status === 200) {
                loginHandler(response.data, scope, dispatch)
            }
            
        } else if (scope === Scope.USER) {
            let response = await getApi(scope).get("/api/auth/current-auth")
            if (response.status === 200) {
                loginHandler(response.data, scope, dispatch)
            }
        }
    } catch (ex) {
        loginHandler(null, scope, dispatch)
    }
}

export const logoutAction = (dispatch, scope: Scope) => {
    if (scope === Scope.SELLER_DASHBOARD) {
        window.localStorage.removeItem(scope)
        loginHandler(null, scope, dispatch)
        
    } else if (scope === Scope.USER) {
        window.localStorage.removeItem(scope)
        loginHandler(null, scope, dispatch)
    }
}
