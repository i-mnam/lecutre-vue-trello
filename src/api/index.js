import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
    // router.push() : 경로 이동
    // router.push({ name: 'user', params: { userId: 123 }})
    // <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    // /user/123 경로로 이동

    console.log('api onUnauthorized() 실행됨')
    router.push('/login')
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
        console.log('result.response=', result.response.data)
        const {status} = result.response
        if (status === UNAUTHORIZED) onUnauthorized()
        console.log('...여기 지나가지?? 1')
        // throw Error() 중요!! throw 안하면 호출 부분의 catch()가 발동 안됨.
        throw Error(result) 
    })
}

export const board = {
    // board에서 조회해올 api용이니까 fetch()라고 이름 지음
    fetch() {
        return request('get', '/boards')
    }
}