import axios from "axios";

// 创建 Axios 实例
const axiosInstance = axios.create({
    baseURL: "https://49.232.186.238:7788", // 基础地址
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 在请求发送之前可以添加通用的逻辑，比如添加 token
        const token = localStorage.getItem("token"); // 从本地存储中获取 token
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        // 处理响应数据
        return response.data;
    },
    (error) => {
        // 处理响应错误
        if (error.response) {
            // 服务器返回的错误
            console.error(`Error ${error.response.status}: ${error.response.data}`);
        } else {
            // 网络错误或其他原因
            console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
    }
);

// 封装通用请求方法
export const api = {
    get: (url, params = {}, config = {}) =>
        axiosInstance.get(url, { params, ...config }),
    post: (url, data = {}, config = {}) =>
        axiosInstance.post(url, data, { ...config }),
    put: (url, data = {}, config = {}) =>
        axiosInstance.put(url, data, { ...config }),
    delete: (url, config = {}) =>
        axiosInstance.delete(url, { ...config }),
};


export const login = (params: any) => api.post('/api/auth/login', params)

export const logout = () => api.post('/api/user/logout')

export const getUserInfo = () => api.post('/api/user/getUserInfo')


export default {
    login, logout, getUserInfo
};
