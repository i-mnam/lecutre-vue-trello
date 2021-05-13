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
    },
    mutations: {
        SET_IS_ADD_BOARD(state, toggle) {
            console.log('store / mutations / SET_IS_ADD_BOARD toggle =', toggle)
            state.isAddBoard = toggle
        },
        SET_BOARDS(state, boards) {
            console.log('store / mutations / SET_BOARDS boards =', boards)
            state.boards = boards
        }
    },
    actions: {
        ADD_BOARD(_, { title }) {
            console.log('store / mutations / ADD_BOARD title =', title)
            return api.board.create(title)
        },
        FETCH_BOARDS ({ commit }) {
            return api.board.fetch().then(data => {
                commit('SET_BOARDS', data.list)
            })
        },
    }
})

// store라는 객체를 모듈로 사용하기 위해 export
// entry point 에서 module 사용을 설정해야 함
export default store