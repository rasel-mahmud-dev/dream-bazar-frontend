
import axios from "axios" 


export const backend = "http://localhost:2000/.netlify/functions/app"

// export const backend = "https://localhost"
// export const staticOrigin = "https://localhost"

const token = window.localStorage.getItem("token")  
const apis = axios.create({
    baseURL: backend,
    headers: {
      authorization: token
    }
})

export default apis 