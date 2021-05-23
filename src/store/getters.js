const getters = { 
    // 호출방식: store.getters
    // vue의 computed와 유사 / isAuth()를 변수같이 사용 가능

    // 근데 이 getter는 누가 셋팅해주는게 아니라 말 그대로 자동적으로 데이터를 읽어와서 호출하는 곳에 변수처럼 내뱉는 건가 봄
    isAuth(state) {
        return !!state.token // 유무
    }
}

export default getters