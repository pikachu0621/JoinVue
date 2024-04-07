import pgpRequest from "../utils/request/request";
import {PREFIX} from '@/config'
/**
 *
 * 用户登录
 *
 * @param account
 *
 * @param password
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootLogin(account, password) {
    return pgpRequest.postForm({
        url: `/${PREFIX}-bg-api/login`,
        data: {account: account, password: password},
    })
}


/**
 * 验证token
 *
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootInfo(token) {
    return pgpRequest.get({
        url: `/${PREFIX}-bg-api/info?token=${token}`,
    })
}


/**
 *
 * 获取全部用户
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllUser() {
    return pgpRequest.get({
        url: `/${PREFIX}-bg-api/all-user`,
    })
}


/**
 *
 * 修改数据
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllUserEdit(userData) {
    //   headers: { 'Content-Type': 'application/json; charset=utf-8' },
    return pgpRequest.postForm( {
        url: `/${PREFIX}-bg-api/edit-user`,
        data: userData,
    })
}


/**
 *
 * 删除用户
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllUserDel(userId) {
    return pgpRequest.get({
        url: `/${PREFIX}-bg-api/del-user/${userId}`
    })
}


/**
 *
 * 获取全部组
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllGroup() {
    return pgpRequest.get({
        url: `/${PREFIX}-bg-api/all-group`,
    })
}


/**
 *
 * 删除组
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function rootAllGroupDel(groupId) {
    return pgpRequest.get({
        url: `/${PREFIX}-bg-api/del-group/${groupId}`
    })
}


/**
 *
 * 获取组类型
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getGroupType() {
    return pgpRequest.get({
        url: `/${PREFIX}-puc-api/puc-group-type`,
    })
}



/**
 *
 * 获取配置
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function queryAppConfig() {
    return pgpRequest.get({url: `/${PREFIX}-bg-api/query-app-config`})
}




/**
 *
 * 修改配置
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function editAppConfig(editConfig) {
    return pgpRequest.post({
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        url: `/${PREFIX}-bg-api/edit-config`,
        data: editConfig
    })
}


/**
 * 获取 github logs
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getLogs(project = "JoinSpring") {
    return pgpRequest.get({
        url: `/${PREFIX}-puc-api/git-logs/${project}`
    })
}