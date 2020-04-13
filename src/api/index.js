import { get, post } from '../utils/request'
import { APP_ID, APP_SECRET } from '../utils/constant'

const WX_URL = 'http://192.168.1.4:5000'



export function getHomeData(params) {
    return get(`${WX_URL}/wxbook/home`, params)
}

export function recommend() {
    return get(`${WX_URL}/wxbook/home/recommend`)
}


export function freeRead() {
    return get(`${WX_URL}/wxbook/home/freeRead`)
}

export function hotBook() {
    return get(`${WX_URL}/wxbook/home/hotBook`)
}

export function getOpenId(code) {
    return get(`${WX_URL}/wxuser/openId/get`, {
        appId: APP_ID,
        secret: APP_SECRET,
        code
    })
}


export function register(openId, userInfo) {
    return post(`${WX_URL}/wxuser/register`, {
        openId, platform: mpvuePlatform, ...userInfo
    })
}


export function search(params) {
    return get(`${WX_URL}/wxbook/search`, params)
}

export function hotSearch() {
    return get(`${WX_URL}/wxbook/hot-search`)
}


export function bookDetail(params) {
    return get(`${WX_URL}/wxbook/detail`, params)
}

export function bookRankSave(params) {
    return get(`${WX_URL}/wxbook/rank/save`, params)
}


export function bookContents(params) {
    return get(`${WX_URL}/wxbook/contents`, params)
}


export function bookShelf(params) {
    return get(`${WX_URL}/wxbook/shelf/get`, params)
}

export function bookShelfSave(params) {
    return get(`${WX_URL}/wxbook/shelf/save`, {
        shelf: JSON.stringify(params)
    })
}


export function bookShelfRemove(params) {
    return get(`${WX_URL}/wxbook/shelf/remove`, {
        shelf: JSON.stringify(params)
    })
}


export function searchList(params) {
    return get(`${WX_URL}/wxbook/search-list`, params)
}


export function categoryList() {
    return get(`${WX_URL}/wxbook/category/list`)
}


export function userDay(params) {
    return get(`${WX_URL}/wxuser/day`, params)
}


