import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

// application이 구동할 때 확인해주는 로직 > 새로고침 할 때마다
const { token } = localStorage
store.commit('LOGIN', token)

export default store