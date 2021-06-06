<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <span class="board-title">{{board.title}}</span>
          <a class="board-header-btn show-menu" href="" @click.prevent="onShowSettings">... Show Menu</a>
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
    <BoardSettings v-if="isShowBoardSettings" />
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
import {mapState, mapMutations,  mapActions} from 'vuex'
import List from './List.vue'
import BoardSettings from './BoardSettings.vue'
// import dragula from 'dragula'
// import 'dragula/dist/dragula.css'
import dragger from '../utils/dragger'


export default {
  components: {
    List,
    BoardSettings,
  },
  data() {
    return {
      bid: 0,
      loading: true,
      // dragulaCards: null,
      cDragger: null,
    }
  },
  computed: {
    ...mapState(['board', 'isShowBoardSettings']),
  },
  //, 'card'
  // Board가 생성될 때, 실행되는 훅 : created() 훅
  // 원래 vue instance에는 this.$route 라는 객체가 잇음
  // 이를 통해 라우팅 정보를 알 수 있는 것임
  // 이렇게 this.$route 를 사용할 수 있는 이유: 라우터를 설정할 때,
  // Vue.use(VueRouter) << 미들웨어처럼 추가 했으므로 this.$route 정보가 있는 것임.
  created() {
    // this.fetchData() //then() 를 사용하기 위해 promise를 반환 받아야 한다.
    this.fetchData().then(() => {
      this.SET_THEME(this.board.bgColor)
    })
    this.SET_IS_SHOW_BOARD_SETTINGS(false)
  },
  // 자식 component가 모두 rendering/마운트 되는 시점: updated
  updated: function() {
    // if(this.dragulaCards) {
    //   console.log('dragulaCards 있음')
    //   this.dragulaCards.destroy()
    // }
    this.setCardDragabble()
    
/**
    // dragula(containers?, options?)
    this.dragulaCards = dragula([
      // this.$el.querySelectorAll('.card-list') >> 유사배열이기 때문에 Array.from() 형태로 만들어 줘야함 헐?!!
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ]).on('drop', (el, wrapper, target, sibling) => {
      console.log('el=', el, ' target=', target, ' sibling=', sibling, ' wrapper=', wrapper) // $el은 undefined
      
      const targetCard = {
        id: el.dataset.cardId * 1, 
        pos: 65535,
      }

      let prevCard = null
      let nextCard = null
      
      Array.from(wrapper.querySelectorAll('.card-item'))
        .forEach((el, idx, arr) => {
          const cardId = el.dataset.cardId * 1
          if (targetCard.id === cardId) {
            prevCard = idx > 0 ? {
              id: arr[idx - 1].dataset.cardId * 1,
              pos: arr[idx - 1].dataset.cardPos * 1,
            } : null
            nextCard = idx < arr.length - 1 ? {
              id: arr[idx + 1].dataset.cardId * 1,
              pos: arr[idx + 1].dataset.cardPos * 1,
            } : null
          }
        })
      if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2
      else if (!nextCard && prevCard) targetCard.pos = prevCard.pos * 2
      else if (nextCard && prevCard) targetCard.pos = (prevCard.pos + nextCard.pos) / 2

      console.log(targetCard)
      this.UPDATE_CARD(targetCard)
 */

/*

      if (wrapper.className != 'card-list') {
        alert('ERROR!!!', wrapper.className)
        console.log('강제 실행 중지')
        return
      }

      // console.log('el.dataset.listId=', el.dataset.listId)
      //temp
      // let listIndex = el.dataset.listId
      let tempObj = {}
      // this.board.lists[listIndex-1].cards.forEach((el, idx, arr) => {
      //   let id = el.id
      //   tempObj[id] = el
      // })

      tempObj = 

      console.log('temp =', tempObj)
      // this.board.lists[0].cards
      let tempList =[]
      Array.from(wrapper.children).forEach((el, idx, arr) => {
        tempObj[el.dataset.cardId].pos = idx
        tempList.push(tempObj[el.dataset.cardId])
      })
      console.log('before board.list =', this.board.lists, '/ tempList = ', tempList)
      // this.SET_BOARD(tempList)
      // this.board.lists[0].
      this.UPDATE_CARD(tempObj[el.dataset.cardId])
 */

    // })

  },
  methods: {
    ...mapActions(['FETCH_BOARD', 'FETCH_CARD', 'UPDATE_CARD']),
    ...mapMutations(['SET_BOARD', 'SET_THEME', 'SET_IS_SHOW_BOARD_SETTINGS']),
    fetchData() {
      this.loading = true

      // return 이 없어도 되던 로직이지만 created에서 확장 사용하게 되어 return 사용함
      return this.FETCH_BOARD({id: this.$route.params.bid})
        .then(() => { 
          this.loading = false
        })
      // setTimeout(() => {
      //   this.bid = this.$route.params.bid
      //   this.loading = false
      // }, 500)
    },
    setCardDragabble() {

      if(this.cDragger) {
        this.cDragger.destroy()
      }

      this.cDragger = dragger.init(Array.from(this.$el.querySelectorAll('.card-list')))

      this.cDragger.on('drop', (el, wrapper, target, sibling) => {
        // console.log('el=', el, ' target=', target, ' sibling=', sibling, ' wrapper=', wrapper) // $el은 undefined
        
        const targetCard = {
          id: el.dataset.cardId * 1, 
          pos: 65535,
        }

        const {prev, next} = dragger.sibling({
          el,
          wrapper,
          candidates: Array.from(wrapper.querySelectorAll('.card-item')),
          type: 'card'
        })

        // let prevCard = null
        // let nextCard = null
        
        // Array.from(wrapper.querySelectorAll('.card-item'))
        //   .forEach((el, idx, arr) => {
        //     const cardId = el.dataset.cardId * 1
        //     if (targetCard.id === cardId) {
        //       prevCard = idx > 0 ? {
        //         id: arr[idx - 1].dataset.cardId * 1,
        //         pos: arr[idx - 1].dataset.cardPos * 1,
        //       } : null
        //       nextCard = idx < arr.length - 1 ? {
        //         id: arr[idx + 1].dataset.cardId * 1,
        //         pos: arr[idx + 1].dataset.cardPos * 1,
        //       } : null
        //     }
        //   })
        if (!prev && next) targetCard.pos = next.pos / 2
        else if (!next && prev) targetCard.pos = prev.pos * 2
        else if (next && prev) targetCard.pos = (prev.pos + next.pos) / 2

        // console.log(targetCard)
        this.UPDATE_CARD(targetCard)
      })
    },
    onShowSettings() {
      this.SET_IS_SHOW_BOARD_SETTINGS(true)
    }
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