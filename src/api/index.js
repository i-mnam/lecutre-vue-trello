import axios from 'axios'
import router from '../router' //  ./router/index.js << 이렇게 호출한 것 만으로 router instance를 사용할 수 있다.

// third party library 를 사용할 때는 rapping 해서 사용하는 걸 ㅊㅊ 
// 왜냐면
// Home.vue 에서 처럼 axios library를 직접가져다가 사용하면, lib에 강하게 의존하는 성격을 가지게 되어서 
// 유지보수 및 개발 측면에서 좋지 않음
// 의존적인 코드를 최소화 하기 위해서  axios를 호출하는 부분을 모듈화 하는 코드 개선이 필요하다

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
    router.push('/login') // vue-router의 push() 함수 / 잘 봐두자.
}

const request = (method, url, data) => {
    console.log('url =', DOMAIN + url)
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
    .then(result => result.data)
    .catch(result => {
        const {status} = result.response // response status code 가져오는 부분
        if (status === UNAUTHORIZED) return onUnauthorized()

        throw Error(result) 
    })

}

// 이 모듈을 사용하기 위해 export를 해야함
// Board 에서는 현재 조회하는 부분 만 있으므로
export const board = {
    fetch() {// 내맘 대로 명명
        return request('get', '/boards')
    }
}