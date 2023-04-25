import axios from "axios";
// 导入loading Loading 服务
import {Message} from 'element-ui'
import {BASE_ADDRESS, TIME_OUT, TOKEN_ERROR} from './config'
import {getToken, removeToken} from "@/utils/auth";

export function request(config) {
    const service = axios.create({
        baseURL: BASE_ADDRESS, //配置公共接口
        timeout: TIME_OUT //配置请求超时时间
    })
    // 请求拦截器
    service.interceptors.request.use(config => {
        config.headers['token'] = getToken()
        return config
    }, () => {
    })

    // 响应拦截器
    service.interceptors.response.use(res => {
        // const errorCode = res.data.error_code;
        // console.log("--------------   响应拦截器" + errorCode + "   ------------   " + TOKEN_ERROR + "---------")
      /*  if (res.status === 200 && errorCode === 200) return res

        const token = getToken()
        if ( (token === null || token === undefined || token === '' || token === 'undefined')) {
            return res
        }*/

      /*  if (errorCode === TOKEN_ERROR) {
            Message({
                type: "warning",
                message: '登录失效，请重新登录！',
                center: true
            })
            return true
        }*/
        return res
    }, err => {
        return err
    })
    return service(config)
}

export function requestCallback(request, success, error, isLmtToken = true) {
    const token = getToken()
    if ((token === null || token === undefined || token === '' || token === 'undefined') && isLmtToken) return
    request.then((res) => {
        if (res.status === 200 && res.data.error_code === 200) {
            success(res.data)
        } else if (res.data.error_code === TOKEN_ERROR) {
            removeToken()
            Message({
                type: "warning",
                message: '登录失效，请重新登录！',
                center: true
            })
            error(res.data, true)
        } else {
            Message({
                type: "error",
                message: res.data.reason,
                center: true
            })
            error(res.data, false)
        }
    }).catch(() => {
        error(null, false)
    })
}