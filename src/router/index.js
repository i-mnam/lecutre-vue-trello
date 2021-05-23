import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'

// middleware 라고 함, 미들웨어 추가, lib 사용 설정
Vue.use(VueRouter)

// NavigationGuard(vue-router)의 beforeEnter 속성으로 라우팅 직전 제어
const requireAuth = (to, from, next) => {
    console.log('requireAuth')
    const isAuth = localStorage.getItem('token')
    // query string 은 encoding(ASCI 문자열로 변환) 해줘야 하는 것!
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
    // next() : route 계속 실행
    isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
    mode: 'history',

    routes: [
        { path: '/', component: Home, beforeEnter: requireAuth },
        { path: '/login', component: Login },
        // { path: '/b/:bid', component: Board }, // 동적 라우트 매칭
        // 중첩 라우트
        { 
            path: '/b/:bid', component: Board, beforeEnter: requireAuth
            , children: [
                {path: 'c/:cid', component: Card, beforeEnter: requireAuth }
            ]
        }, 
        { path: '/*', component: NotFound },
    ]

})

export default router