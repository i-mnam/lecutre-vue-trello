import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'
import store from '../store' // vue instance가 없기 때문에 호출함

// middleware 라고 함, 미들웨어 추가, lib 사용 설정
Vue.use(VueRouter)

// NavigationGuard(vue-router)의 beforeEnter 속성으로 라우팅 직전 제어
const requireAuth = (to, from, next) => {
    // **store
    // const isAuth = localStorage.getItem('token')
    // const isAuth = store.getters.isAuth
    // query string 은 encoding(ASCI 문자열로 변환) 해줘야 하는 것!
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
    // next() : route 계속 실행
    // isAuth ? next() : next(loginPath)
    store.getters.isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/',
            component: Home,
            beforeEnter: requireAuth
        },
        {
            path: '/login',
            component: Login
        },
        // { path: '/b/:bid', component: Board }, // 동적 라우트 매칭
        // 중첩 라우트
        {
            path: '/b/:bid',
            component: Board,
            beforeEnter: requireAuth,
            children: [{ path: 'c/:cid', component: Card }]
        },
        {
            path: '*',
            component: NotFound
        },
    ]

})
// console.log('Vue instance 확인 @router', this) // 한 번 더 안 쪽에, VueRouter 객체로 인식하고 있음
export default router