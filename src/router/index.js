import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../App.vue'
// 0. 모듈 시스템을 이용 중이므로, import lib, 라이브러리 사용 설정
Vue.use(VueRouter)

// 1. 라우트 컴포넌트를 정의
const Login = { template: '<div>Login Page</div>' }
const NotFound = { template: '<div>Not Found Page</div>' }

// 3. routes 옵션을 이 곳에서 설정하면서 router 인스턴스를 만듦.
const router = new VueRouter({
    // 실행모드
    mode: 'history',
    // 2. 라우트 정의
    routes: [
        { path: '/', component: App },
        { path: '/login', component: Login },
        { path: '/*', component: NotFound },
    ]
});

// 모듈로 export
export default router