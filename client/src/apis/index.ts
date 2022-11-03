import axios from "axios"
import {Scope} from "store/types";


// export const backend = "https://dream-bazar.vercel.app"
export const backend = import.meta.env.DEV ? "http://localhost:4000" : "https://server-raselmr.vercel.app"
// export const backend = import.meta.env.DEV ? "http://192.168.91.224:4000" : "https://server-raselmr.vercel.app"
// export const backend = import.meta.env.DEV ? "http://localhost:8888/.netlify/functions/app" : "/.netlify/functions/app"


// export const backend = "https://localhost"

const token = window.localStorage.getItem(Scope.USER)
const apis = axios.create({
    baseURL: backend,
    headers: {
      authorization: token
    }
})

export function getApi(scope?: Scope, token?: string){
    apis.defaults.headers["authorization"] =  token ? token : window.localStorage.getItem(scope.toLowerCase())
    return apis;
}

export default apis
