import * as api from '../api'

const actions = { 
    // ansync
    // 호출방식: store.dispatch()
    // 로그인은 api 호출하는 비동기 로직을 사용해야 하므로, action을 이용
    LOGIN({commit}, {email, password}) {
        return api.auth.login(email, password)
            .then(({accessToken}) => {
                commit('LOGIN', accessToken)
            })
    },
    ADD_BOARD(_, {title}) {
        // data parameter 를 받을 때는 되도록 obj 으로 받는 걸로 파악됨
        // return api.board.create(title) >> .then(({item}) => {this.$router.push(`/b/${item.id}`)})
        return api.board.create(title).then(data => data.item) // >> .then(({id}) => {this.$router.push(`/b/${id}`)})
    },
    FETCH_BOARDS({commit}) { // 1st arg : context obj에서 commit func만
        return api.board.fetch()
            .then(data => {
                commit('SET_BOARDS', data.list)
            })
    },
    FETCH_BOARD({commit}, {id}) {
        return api.board.fetch(id).then(data => {
            commit('SET_BOARD', data.item)
        })
    }
}

export default actions