//封装post，get,patch 请求
import { request } from "./servies";
const pgpRequest = {

    postForm(config){
        config.transformRequest= [
            function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                ret = ret.substring(0, ret.lastIndexOf('&'));
                return ret
            }
        ]
        config.headers = {'Content-Type': 'application/x-www-form-urlencoded'} // application/x-www-form-urlencoded
        return request({...config, method:'POST'})
    },

    post(config){
        return request({...config, method:'POST'})
    },

    get(config){
        return request({...config, method:'GET'})
    },

    patch(config){
        return request({...config, method:'PATCH'})
    }
}


export default pgpRequest