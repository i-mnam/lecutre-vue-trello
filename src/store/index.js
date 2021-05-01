import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Vuex의 Store 클래스 함수를 사용
// isAddBoard전역상태로 만들어 볼 예정 
const store = new Vuex.Store({
    state: {
        isAddBoard: false,
    }
})

// store라는 객체를 모듈로 사용하기 위해 export
// entry point 에서 module 사용을 설정해야 함
export default store