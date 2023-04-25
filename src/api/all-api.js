import myfRequest from "../utils/request/request";


/**
 *
 * 用户登录
 *
 * @param account
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootLogin(account, password){
    return myfRequest.post({
        url: '/myf-bg-api/login',
        data: { "account": account, "password": password},
    })
}


/**
 * 验证token
 *
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootInfo(token){
    return myfRequest.get({
        url:`/myf-bg-api/info?token=${token}`,
    })
}


/**
 *
 * 获取全部用户
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllUser(){
    return myfRequest.get({
        url:`/myf-bg-api/all-user`,
    })
}


/**
 *
 * 修改数据
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllUserEdit(userData){
    return myfRequest.post({
        url:`/myf-bg-api/edit-user`,
        data: userData,
    })
}


/**
 *
 * 删除用户
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllUserDel(userId){
    return myfRequest.get({
        url:`/myf-bg-api/del-user/${userId}`
    })
}




/**
 *
 * 获取全部组
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllGroup(){
    return myfRequest.get({
        url:`/myf-bg-api/all-group`,
    })
}


/**
 *
 * 删除组
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllGroupDel(groupId){
    return myfRequest.get({
        url:`/myf-bg-api/del-group/${groupId}`
    })
}


/**
 *
 * 获取组类型
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getGroupType(){
    return myfRequest.get({
        url:`/myf-puc-api/puc-group-type`,
    })
}