import axios from "axios";
import router from "@/router";

const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

request.defaults.headers['Content-Type'] = "application/json"


request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userInfo')
        if (token) {
            config.headers['token'] = token
        }
        if (config.method === 'get' && config.params) {
            let url = config.url + '?';
            for (const propName of Object.keys(config.params)) {
                const value = config.params[propName];
                const part = encodeURIComponent(propName) + "=";
                if (value !== null && typeof (value) !== "undefined") {
                    if (typeof value === 'object') {
                        for (const key of Object.keys(value)) {
                            let params = propName + '[' + key + ']';
                            const subPart = encodeURIComponent(params) + "=";
                            url += subPart + encodeURIComponent(value[key]) + "&";
                        }
                    } else {
                        url += part + encodeURIComponent(value) + "&";
                    }
                }
            }
            url = url.slice(0, -1);
            config.params = {};
            config.url = url;
        }
        return config
    }, (error) => Promise.reject(error)
)

request.interceptors.response.use(
    (response) => {
        if (response.data.code === 401) {// 返回登录页面
            localStorage.removeItem('userInfo')
            router.push({name: 'Login'})
        } else {
            return response
        }
    },
    (response) => {
        // const res = response.data
        // const msg = res.msg
        // Message.error(msg)
        if (response.data.code === 401) router.push({name: 'Login'})
        return Promise.reject(response)
    }
)

export default request
