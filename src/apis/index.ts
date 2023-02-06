import axios from "axios"


export const backend = import.meta.env.DEV ? "http://localhost:4000" : "https://dream-bazar.vercel.app"



// export const backend = "https://localhost"

const token = window.localStorage.getItem("token")
const apis = axios.create({
    baseURL: backend,
    headers: {
      authorization: token
    }
})


apis.interceptors.response.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error

    let message = error.message;

    if(error.response?.data){
        if(error.response.data.message){
            message = error.response.data.message
        } else if(typeof error.response.data === "string"){
            message = error.response.data
        }
    }
    error.message = message
    return Promise.reject(error);
})


export function getApi(token?: string){
    apis.defaults.headers["authorization"] =  token ? token : window.localStorage.getItem("token")
    return apis;
}

export default apis
