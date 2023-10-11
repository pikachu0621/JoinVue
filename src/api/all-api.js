import pgpRequest from "../utils/request/request";


/**
 *
 * 用户登录
 *
 * @param account
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootLogin(account, password){
    return pgpRequest.post({
        url: '/pk-bg-api/login',
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
    return pgpRequest.get({
        url:`/pk-bg-api/info?token=${token}`,
    })
}


/**
 *
 * 获取全部用户
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllUser(){
    return pgpRequest.get({
        url:`/pk-bg-api/all-user`,
    })
}


/**
 *
 * 修改数据
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllUserEdit(userData){
    return pgpRequest.post({
        url:`/pk-bg-api/edit-user`,
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
    return pgpRequest.get({
        url:`/pk-bg-api/del-user/${userId}`
    })
}




/**
 *
 * 获取全部组
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllGroup(){
    return pgpRequest.get({
        url:`/pk-bg-api/all-group`,
    })
}


/**
 *
 * 删除组
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllGroupDel(groupId){
    return pgpRequest.get({
        url:`/pk-bg-api/del-group/${groupId}`
    })
}


/**
 *
 * 获取组类型
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getGroupType(){
    return pgpRequest.get({
        url:`/pk-puc-api/puc-group-type`,
    })
}