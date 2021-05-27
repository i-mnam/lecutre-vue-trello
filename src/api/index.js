import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
    // router.push() : 경로 이동
    // router.push({ name: 'user', params: { userId: 123 }})
    // <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    // /user/123 경로로 이동

    // router.push('/login')
    // .catch(err=>{console.log('onUnauthorized() err(NavigationDuplicated: Avoided redundant navigation to current location: "/login".)...', err)})
    router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)

}

// api 호출 부분 모듈화
const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
    .then(result => result.data)
    .catch(result => {
        const {status} = result.response
        if (status === UNAUTHORIZED) {
            onUnauthorized()
        }
        // throw Error() 중요!! throw 안하면 호출 부분의 catch()가 발동 안됨.
        // throw Error(result) 
        throw result.response
    })
}

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}

export const board = {
    // board에서 조회해올 api용이니까 fetch()라고 이름 지음
    // fetch() {return request('get', '/boards')},
    fetch(id) {
        return id ? request('get', `/boards/${id}`) : request('get', '/boards')
    },
    create(title) {
        return request('post', '/boards', { title })
    }
}

export const card = {
    fetch(id) {
        return request('get', `/cards/${id}`)
    },
    create(title, listId, pos) {
        return request('post', '/cards', {title, listId, pos})
    },
    update(id, payload) {
        return request('put', `/cards/${id}`, payload)
    }
}

export const auth = {
    login(email, password) {
        return request('post', '/login', {email, password})
    }
}

// **store 로딩시 토큰 확인하는 로직 구현해서 이 부분 필요 없어짐
// 새로고침하면 로그인 풀리는 현상 방지
// const token = localStorage.token?
// const {token} = localStorage 
// if (token) {
//     setAuthInHeader(token)
// }