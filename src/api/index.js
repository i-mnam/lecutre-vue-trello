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
    // router.push('/login') // vue-router의 push() 함수 / 잘 봐두자.

    console.log('api(axios) index.js onUnauthorized() =', location.pathname)
    router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
    console.log('pi(axios) index.js onUnauthorized() 2222')
}

const request = (method, url, data) => {
    console.log('api(axios) index.js request() url =', DOMAIN + url)
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
    .then(result => result.data
    //     {
    //     console.log(result.data)
    //     result = result.data
    // }
    )
    .catch(result => {
        // console.log('api(axios) index.js request() catch event!! data =', result)
        const {status} = result.response // response status code 가져오는 부분
        // if (status === UNAUTHORIZED) return onUnauthorized()
        if (status === UNAUTHORIZED) onUnauthorized()
        // return 함수.. 씨..
        // console.log('here... ????????????????????????')
        // throw Error(result) 
        // if (status === UNAUTHORIZED) onUnauthorized()
        // console.log('!!!')
        // return result.response >> 와 그냥.. 여기 catch 구문이 끝나버리는 거였음
        // 소환했던 Login.vue에서는 아무 반응 없고 onUnauthorized() 에서 작동했던 걸로 보이는 router.push() 가 작동해서 Login component 가 created 한 걸로 생각됨.

        // 무조건 throw를 해야 호출했던 component에서 catch구문이 동작하는 것 같다..
        throw result.response
    })

}

// axios lib 기능 활용
// 모든 request를 날리기 전에 header 설정
export const setAuthInHeader = token => {
    console.log('api(axios) index.js setAuthInHeader token =', token)
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}

// 이 모듈을 사용하기 위해 api 호출 객체를 export를 해야함
// Board 에서는 현재 조회하는 부분 만 있으므로
export const board = {
    fetch() {// 내맘 대로 명명
        console.log('api index.js board-object fetch()')
        return request('get', '/boards')
    },
    create(title) {
        console.log('api index.js board-object create() title =', title)
        return request('post', '/boards', {title})
    },
}

export const auth = {
    login (email, password) {
        console.log('api index.js auth-object login()')
        return request('post', '/login', {email, password})
    }
}