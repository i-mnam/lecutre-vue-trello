import * as api from '../api'
import state from './state'

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
        return api.board.fetch(id)
            .then(data => {
                commit('SET_BOARD', data.item)
            })
    },
    DELETE_BOARD(_, {id}) {
        return api.board.destroy(id)
    },
    UPDATE_BOARD(ctx, {id, title, bgColor}) {
        return api.board.update(id, {title, bgColor})
            .then(() => ctx.dispatch('FETCH_BOARD', {id: id}))
        // 강사님은 state에서 board.id를 가져옴
        // .then(() => ctx.dispatch('FETCH_BOARD'), {id: state.board.id})
    },
    ADD_CARD({dispatch, state}, {title, listId, pos}) {
        return api.card.create(title, listId, pos)
            .then(_ => {
                dispatch('FETCH_BOARD', {id: state.board.id})
            })
    },
    FETCH_CARD(ctx, {id}) {// ctx >> {commit}
        return api.card.fetch(id)
            .then(data => {
                ctx.commit('SET_CARD', data.item)
            })
    },
    UPDATE_CARD(ctx, {id, title, description, pos, listId}) {
        // update 후 수정된 데이터를 보여줘야 함
        return api.card.update(id, {title, description, pos, listId})
            .then(_ => ctx.dispatch('FETCH_BOARD', {id: ctx.state.board.id}))
    },
    DELETE_CARD(ctx, {id}) {
        return api.card.destroy(id)
            .then(_ => ctx.dispatch('FETCH_BOARD', {id: ctx.state.board.id}))
    }
}

export default actions