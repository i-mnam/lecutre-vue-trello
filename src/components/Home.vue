<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div
        class="board-item"
        v-for="b in boards"
        :key="b.id"
        :data-bgcolor="b.bgColor"
        ref="boardItem"
      >
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{ b.title }}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a class="new-board-btn" href="" @click.prevent="addBoard">
          <!-- vue event 등록할 때, parameter 존재 유무를 알 수가 없다. -->
          Create new board...
        </a>
      </div>
    </div>

    <!-- <Modal></Modal> -->
    <AddBoard
      v-if="isAddBoard"
      v-on:@close="isAddBoard = false"
      v-on:@submit="onAddBoard"
    />
  </div>
</template>
<script>
// import axios from "axios"
import { board } from "../api" // 객체를 import
// import Modal from './Modal.vue'
import AddBoard from "./AddBoard.vue"
import { mapState } from "vuex" // MapState라는 함수를 가져옴

export default {
  components: {
    // Modal,
    AddBoard,
  },
  data() {
    return {
      loading: true,
      boards: [],
      // isAddBoard: false,
    }
  },
  computed:
    // 1.
    // {
    //   isAddBoard() {
    //     return this.$store.state.isAddBoard
    //   },
    // }
    // 2. 가능은 하나, computed 속성에 더 이상 다른 값을 설정하기 불가능해서 ES6문법의
    // 구조 분해 할당 문법을 사용
    // mapState(["isAddBoard"]),
    // 3.
    {
      ...mapState(["isAddBoard"]),
      foo() {
        // something..
      },
    },
  created() {
    console.log("Home created()")
    this.fetchData()
  },
  // vue.js의 렌더링 사이클에 의해서 updated()는 매번 호출 됨.
  // created() 다음에 호출이 됨
  // data의 값에 변화가 감지되면 updated hook이 발동됨.
  //   가상 DOM을 렌더링 하고 실제 DOM이 변경된 이후에 호출되는 updated훅입니다. 변경된 data가 DOM에도 적용된 상태입니다.
  // 만약 변경된 값들을 DOM을 이용해 접근하고 싶다면, updated훅이 가장 적절합니다.
  // 다만 이 훅에서 data를 변경하는 것은 무한 루프를 일으킬 수 있으므로 이 훅에서는 데이터를 직접 바꾸어서는 안됩니다.
  updated() {
    console.log("updated() this.$refs.boardItem =", this.$refs.boardItem)
    this.$refs.boardItem.forEach((el) => {
      el.style.backgroundColor = el.dataset.bgcolor
    })
  },
  methods: {
    fetchData() {
      this.loading = true

      board
        .fetch()
        .then((data) => {
          console.log("Home fetch() data =", data)
          this.boards = data.list
        })
        // .catch() << 사용 안하는 이유 : 공통 처리 중 @../api/index.js
        .finally(() => {
          this.loading = false
        })

      //** axios library 직접적으로 사용한 것 **//
      // axios
      //   .get("http://localhost:3000/boards") // axios는 promise를 반환해서 바로 then chain을 사용할 수 있다
      //   .then((res) => {
      //     this.apiRes = res.data
      //   })
      //   .catch((res) => {
      //     // this.error = res.response.data
      //     // this.$router vue-router를 뜻함..
      //     this.$router.replace("/login")
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })

      //** XMLHttpRequest 객체 사용한 것 **//
      // const req = new XMLHttpRequest()
      // req.open("GET", "http://localhost:3000/health")
      // req.send()
      // req.addEventListener("load", () => {
      //   this.loading = false
      //   this.apiRes = {
      //     status: req.status,
      //     statusText: req.statusText,
      //     response: JSON.parse(req.response),
      //   }
      // })
    },
    addBoard() {
      console.log("Home - addBoard()")
      this.isAddBoard = true
    },
    onAddBoard(title) {
      console.log("Home - onAddBoard() =", title)
      board.create(title).then(() => {
        this.fetchData()
      })
    },
  },
}
</script>
<style scoped>
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
  background-color: rgba(0, 0, 0, 0.1);
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
