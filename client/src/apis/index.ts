
import axios from "axios" 


export const backend = "http://localhost:3001"
export const staticOrigin = "http://localhost:3001"
//
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