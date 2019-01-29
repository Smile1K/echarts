import axios from 'axios'
import store from '@/store/index'

const service = axios.create({
    // baseURL: process.env.BASE_URL, // api的base_url
    timeout: 50000 // 请求超时时间
})

// 拦截请求
service.interceptors.request.use(config => {
    return config
})

// 拦截响应
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error)
    }
)

export default service