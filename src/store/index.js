import Vue from 'vue'
import Vuex from 'vuex'
// import api from '../api'
import * as api from '../api'

Vue.use(Vuex)

// Vuex의 Store 클래스 함수를 사용
// isAddBoard전역상태로 만들어 볼 예정 
const store = new Vuex.Store({
    state: {
        isAddBoard: false,
        boards: [],
        token: null,
    },
    getters: { // vue component 의 computed 와 유사 / isAuth라는 함수 호출이 아니라, 변수처럼 사용가능함
        isAuth(state) {
            return !!state.token
        }
    },
    mutations: {
        SET_IS_ADD_BOARD(state, toggle) {
            console.log('store / mutations / SET_IS_ADD_BOARD toggle =', toggle)
            state.isAddBoard = toggle
        },
        SET_BOARDS(state, boards) {
            console.log('store / mutations / SET_BOARDS boards =', boards)
            state.boards = boards
        },
        LOGIN (state, token) {
            console.log('언제 mutation이고, 언제 action일까')
            if (!token) {
                console.log('vuex store.js mutation LOGIN() token 없어.')
                return
            }

            state.token = token
            localStorage.setItem('token', token)
            api.setAuthInHeader(token)

        },
        LOGOUT (state) {
            state.token = null
            delete localStorage.token
            api.setAuthInHeader(null) // 요청 Header를 초기화
        },
    },
    actions: { // api호출과 같은 비동기 로직을 담당
        ADD_BOARD(_, { title }) {
            console.log('store / mutations / ADD_BOARD title =', title)
            return api.board.create(title)
        },
        FETCH_BOARDS ({ commit }) { // context의 객체에서 commit 함수만 받겠다
            return api.board.fetch().then(data => {
                commit('SET_BOARDS', data.list)
            })
        },
        LOGIN ({commit}, {email, password}) {
            return api.auth.login(email, password)
            .then(({accessToken}) => commit('LOGIN', accessToken))
            // .then(accessToken => {
            //     commit('LOGIN', accessToken)
            // })
            // .then({accessToken}) => commit('LOGIN', accessToken)
        },
    }
})

// app 구동되었을 때, 토큰 설정을 해두는 로직
const { token } = localStorage
store.commit('LOGIN', token)

// store라는 객체를 모듈로 사용하기 위해 export
// entry point 에서 module 사용을 설정해야 함
export default store