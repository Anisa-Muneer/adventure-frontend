import axios from 'axios'
const baseUrl = import.meta.env.VITE_ADVENTUREURL

const adventureRequest = axios.create({
    baseURL: baseUrl
})

adventureRequest.interceptors.request.use((req)=> {
    if(localStorage.getItem("currentAdventure")){
        req.headers.authorization = "Bearer " + localStorage.getItem("currentAdventure")
    }
    return req
})
export default adventureRequest