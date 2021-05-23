import * as api from '../api'

const actions = { 
    // ansync
    // 호출방식: store.dispatch()
    ADD_BOARD(_, {title}) {
        console.log(typeof title, ' ', typeof {title}, ' ', title)
        return api.board.create(title)
    },
    FETCH_BOARDS({commit}) { // 1st arg : context obj에서 commit func만
        return api.board.fetch()
            .then(data => {
                commit('SET_BOARDS', data.list)
            })
    },
    // 로그인은 api 호출하는 비동기 로직을 사용해야 하므로, action을 이용
    LOGIN({commit}, {email, password}) {
        return api.auth.login(email, password)
            .then(({accessToken}) => {
                commit('LOGIN', accessToken)
            })
    }
}

export default actions