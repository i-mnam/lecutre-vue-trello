<template>
  <div>
    Board
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div>bid: {{ bid }}</div>
      <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
      <pre>{{ board }}</pre>
    </div>
<!-- 
Q) router-link에서 prop(속성) to와 :to 의 차이가 궁금
A) Vuejs의 데이터 바인딩 기능
to="/b/1" 으로 선언했을때는 링크가 /b/1으로만 설정되는 반면에
:to=/b/${bid}/c/1 로 선언하게되면 bid 변수 값에 따라 링크가 동적으로 변하는 것 -->
    <hr />
    
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      bid: 0,
      loading: true,
    }
  },
  computed: {
    ...mapState(['board'])
  },
  // Board가 생성될 때, 실행되는 훅 : created() 훅
  // 원래 vue instance에는 this.$route 라는 객체가 잇음
  // 이를 통해 라우팅 정보를 알 수 있는 것임
  // 이렇게 this.$route 를 사용할 수 있는 이유: 라우터를 설정할 때,
  // Vue.use(VueRouter) << 미들웨어처럼 추가 했으므로 this.$route 정보가 있는 것임.
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions(['FETCH_BOARD']),
    fetchData() {
      this.loading = true

      this.FETCH_BOARD({id: this.$route.params.bid})
        .then(() => {
          this.loading = false
        })
      // setTimeout(() => {
      //   this.bid = this.$route.params.bid
      //   this.loading = false
      // }, 500)
    },
  }
}
</script>