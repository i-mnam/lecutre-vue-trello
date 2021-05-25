<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <span class="board-title">{{board.title}}</span>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
                <List :data="list" />
              </div>
          </div>
        </div>
      </div>
    </div>
    <!--중첩 compo는 바깥의 컴포에 출력이 된다 (e.g. Card 가 Board에 포함되어 나옴( router-view 태그 안에서 나옴) -->
    <router-view></router-view>
  </div>
<!-- 
Q) router-link에서 prop(속성) to와 :to 의 차이가 궁금
A) Vuejs의 데이터 바인딩 기능
to="/b/1" 으로 선언했을때는 링크가 /b/1으로만 설정되는 반면에
:to=/b/${bid}/c/1 로 선언하게되면 bid 변수 값에 따라 링크가 동적으로 변하는 것 -->
</template>
<script>
import {mapState, mapActions} from 'vuex'
import List from './List.vue'

export default {
  components: {
    List 
  },
  data() {
    return {
      bid: 0,
      loading: true,
    }
  },
  computed: {
    ...mapState(['board']),
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


<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
} 
.board-header input[type=text] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>