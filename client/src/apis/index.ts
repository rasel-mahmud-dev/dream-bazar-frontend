
import axios from "axios" 


// export const backend = "https://dream-bazar.vercel.app"
export const backend = import.meta.env.DEV ? "http://localhost:3000" : "https://dream-bazar.vercel.app"
// export const backend = import.meta.env.DEV ? "http://localhost:8888/.netlify/functions/app" : "/.netlify/functions/app"
export const staticOrigin = "http://localhost:3000/static"

// export const backend = "https://localhost"

const token = window.localStorage.getItem("token")  
const apis = axios.create({
    baseURL: backend,
    headers: {
      authorization: token
    }
})

export function getApi(){
    const token = window.localStorage.getItem("token")
    apis.defaults.headers["authorization"] = token;
    return apis;
}

export default apis