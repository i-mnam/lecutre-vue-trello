import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'

// middleware 라고 함, 미들웨어 추가, lib 사용 설정
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',

    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        // { path: '/b/:bid', component: Board }, // 동적 라우트 매칭
        // 중첩 라우트
        { 
            path: '/b/:bid', component: Board, children: [
                {path: 'c/:cid', component: Card }
            ]
        }, 
        { path: '/*', component: NotFound },
    ]

})

export default router