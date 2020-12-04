import axios from "axios"
import qs from "qs"
import store from '@/store'
import baseURL from '../../../config/baseUrl.js'
import { Message } from 'element-ui'
var instance = axios.create({
    timeout: 10000, //设置请求时间
    baseURL
})
//添加请求拦截器
axios.interceptors.request.use(
    config => {
        // 请求头添加token
        if (store.state.User.token) {
            config.headers['Access-Token'] = store.state.User.token
        }
        return config
    },
    error => {
        return Promise.reject(error);
    }
);
// 响应拦截器即异常处理
instance.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求出错'
                    break
                case 401:
                    Message.warning({
                        message: '授权失败，请重新登录'
                    })
                    store.commit('LOGIN_OUT')
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)

                    return
                case 403:
                    err.message = '拒绝访问'
                    break
                case 404:
                    err.message = '请求错误,未找到该资源'
                    break
                case 500:
                    err.message = '服务器端出错'
                    break
            }
        } else {
            err.message = '连接服务器失败'
        }
        Message.error({
            message: err.message
        })
        return Promise.reject(err.response)
    }
)
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
export default {
    post(arr, fn) {
        return axios({
            method: "post",
            url: arr.url,
            data: qs.stringify(arr.data)
        }).then(function(res) {
            if (fn) {
                fn(res);
                return false;
            }
        }).catch(function(res) {
            if (!res) return false;
            Message({
                message: res
            })
            return false;
        });
    },
    get(arr, fn) {
        return axios({
            method: "get",
            url: arr.url,
            params: arr.data
        }).then(function(res) {
            if (fn) {
                fn(res);
                return false;
            }
        }).catch(function(res) {
            if (!res) return false;
            Message({
                message: res
            })
            return false;
        });
    }
};
