// import * as api from '../api'
import { setAuthInHeader} from '../api'

const mutations = { 
    // sync 
    // 호출방식: store.commit()
    // 로그인 / 로그아웃은 상태값을 변경하는 것 이므로 mutation이 적합
    // 상태값(state)을 변경하는 것, 이외에 값을 설정하는 일도 mutation이 하고 있음 (비동기적으로 하면 안될거 같은 애들)
    LOGIN(state, token) {
        if(!token) {
            console.log('token이 없음!')
            return
        }
        state.token = token
        localStorage.setItem('token', token)
        // api.setAuthInHeader(token)
        setAuthInHeader(token)
    },
    LOGOUT(state) {
        state.token = null
        delete localStorage.token
        // api.setAuthInHeader(null)
        setAuthInHeader(null)
    },
    SET_IS_ADD_BOARD(state, toggle) {
        state.isAddBoard = toggle
    },
    SET_BOARDS(state, boards) {
        state.boards = boards
    },
    SET_BOARD(state, board) {
        state.board = board
    },
    SET_CARD(state, card) {
        state.card = card
    },
    SET_THEME(state, color) {
        state.bodyColor = color || '#ffffff'
        state.navbarColor = color ? 'rgba(0,0,0,.15)' : '#026aa7'
    },
    SET_IS_SHOW_BOARD_SETTINGS(state, toggle) {
        state.isShowBoardSettings = toggle
    }
}

export default mutations