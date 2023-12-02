import axios from "axios"


export const backend = import.meta.env.DEV
    ? "http://localhost:4000"
    // ? "http://192.168.72.203:4000"
    : "https://dream-bazar.vercel.app"


// export const backend = "https://localhost"


const apis = axios.create({
    baseURL: backend,
})

apis.interceptors.request.use(function (config){
    const token = window.localStorage.getItem("token") || ""
    config.headers["Authorization"] =  "Bearer " + token
    return config;
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


export default apis
