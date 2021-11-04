import axios from "axios";

const build = false

const axiosInstance = axios.create({
    timeout: 15000,
    baseURL: build ? `/api/` : `http://localhost:5000/api/`
})

axiosInstance.interceptors.request.use((conf) => {
    return conf
},
    () => {
        return false
    }
)

axiosInstance.interceptors.response.use(
    response => response.data,
    () => {
        return false
    }
);

export default axiosInstance;