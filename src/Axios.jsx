import axios from "axios";

const Axios = axios.create({
    baseURL:`https://builds-backend-wc2e.onrender.com/`,
    headers:{
        "Content-Type":"application/json"
    }
})

export default Axios;