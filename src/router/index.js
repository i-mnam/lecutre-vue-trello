import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'


// 0. lib 사용 설정
Vue.use(VueRouter)


const requireAuth = (to, from, next) => {
    const isAuth = localStorage.getItem('token')
    // query string 은 encoding(ASCI 문자열로 변환) 해줘야 하는 것!
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
    isAuth ? next() : next(loginPath) // true : routing 로직을 계속 수행
}

// 3. routes 옵션을 이 곳에서 설정하면서 router 인스턴스를 만듦.
const router = new VueRouter({
    // 실행모드
    mode: 'history',
    // 2. 라우트 정의
    routes: [
        { path: '/', component: Home , beforeEnter: requireAuth },
        { path: '/login', component: Login },
        {
            path: '/b/:bid', component: Board, beforeEnter: requireAuth, children: [
                { path: 'c/:cid', component: Card ,beforeEnter: requireAuth }
            ]
        },
        { path: '/*', component: NotFound },
    ]
});

// 모듈로 export
export default router