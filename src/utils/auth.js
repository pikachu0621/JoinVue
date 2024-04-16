import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}


export function addTokenGet(url) {
    let urlStr = url
    if (urlStr.indexOf('?') !== -1) urlStr += `&token=${getToken()}`
    else urlStr += `?token=${getToken()}`
    return urlStr
}