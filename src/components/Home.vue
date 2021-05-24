<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <!-- :key  :  unique key  -->
      <div class="board-item" v-for="b in boards" :key="b.id"
        :data-bgcolor="b.bgColor" ref="boardItem">
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{b.title}}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a class="new-board-btn" href="" @click.prevent="SET_IS_ADD_BOARD(true)">
          Create new board..
        </a>
      </div>
    </div>
    
    <AddBoard v-if="isAddBoard" @close="isAddBoard=false"/> <!-- @submit="onAddBoard" -->
<!-- <AddbBoard @close="isAddBoard=false" @submit="onAddBoard" /> -->
  </div>
</template>
<script>
// import axios from 'axios'
import {board} from '../api'
import AddBoard from './AddBoard.vue'
import {mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    AddBoard,
  },
  computed: {
    // **store의 mapState 변경
    // isAddBoard() { return this.$store.state.isAddBoard }
    // ...mapState({ isAddBoard: 'isAddBoard', })
    ...mapState(['isAddBoard', 'boards']),
  },
  data() {
    return {
      loading: true,
      error: '',
      // **store에서 처리
      // boards: [],
      // isAddBoard: false,
    }
  },
  created() {
    // console.log('Vue instance 확인 @Home', this) // VueComponent 객체로 인식하고 있음
    this.fetchData()
  },
  // vue.js의 렌더링 사이클에 의해서 updated()는 매번 호출 됨.
  // created() 다음에 호출이 됨
  // data의 값에 변화가 감지되면 updated hook이 발동됨.
  // 가상 DOM을 렌더링 하고 실제 DOM이 변경된 이후에 호출되는 updated훅입니다. 변경된 data가 DOM에도 적용된 상태입니다.
  // 만약 변경된 값들을 DOM을 이용해 접근하고 싶다면, updated훅이 가장 적절합니다.
  // 다만 이 훅에서 data를 변경하는 것은 무한 루프를 일으킬 수 있으므로 이 훅에서는 데이터를 직접 바꾸어서는 안됩니다.
  // vue 라이프사이클 중 updated 시점에 돔이 갱신되기 때문에 이 훅을 사용
  updated() {
    this.$refs.boardItem.forEach((el) => {
      el.style.backgroundColor = el.dataset.bgcolor
    })
  },
  methods: {
    // 동기적인 코드만 변이 가능하므로, 상태 변경 데이터 변경과 같은 것 위주
    ...mapMutations(['SET_IS_ADD_BOARD']),
    ...mapActions(['FETCH_BOARDS']),
    fetchData() {
      this.loading = true
      // **store에서 처리
      // board.fetch()
      //   .then(data => {
      //     this.boards = data.list
      //   })
      //   .catch(res => {
      //     console.log('Home error res =', res)
      //   })
      //   .finally(_ => {
      //     this.loading = false
      //   })
      this.FETCH_BOARDS().finally(_ => {
        this.loading = false
      })
    },
    // **store의 mapMutations 변경
    // addBoard() {
    //   // this.isAddBoard = true
    //   this.$store.commit('SET_IS_ADD_BOARD', true)
    // },
    // onAddBoard(input) {
    //   // **store의 mapActions 변경
    //   // board.create(input)
    //   //   .then(() => { this.fetchData() })
    //   this.fetchData()
    // }
  }
}
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item-new {
  background-color: #ddd;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0,0,0, .1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>