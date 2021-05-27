<template>
  <!-- <Modal>
    <div slot="body">
      {{ card }}
    </div>
  </Modal> -->
  <Modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <!-- readonly 바인드/bind-->
        <input class="form-control" type="text" :value="card.title" 
          :readonly="!toggleTitle" @click="toggleTitle=true" @blur="onBlurTitle" ref="inputTitle">
      </div>
      <a class="modal-close-btn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <textarea  class="form-control" cols="30" rows="3" placeholder="Add a more detailed description..." 
      :readonly="!toggleDesc" @click="toggleDesc=true" @blur="onBlurDesc" ref="inputDesc"
        v-model="card.description"></textarea>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>
<script>
import Modal from "./Modal.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Modal,
  },
  data: function() {
    return {
      toggleTitle: false, 
      toggleDesc: false,
    }
  },
  computed: {
    ...mapState({
      card: "card", // 'card'라는 상태값을 가져와 card라고 함
      board: "board",
    }),
  },
  created: function () {
    // const id = this.$route.params.cid;
    // this.FETCH_CARD({ id });
    this.fetchCard()
  },
  methods: {
    // fetchData() {
    //     this.loading = true
    //     setTimeout(() => {
    //     this.loading = false
    //     this.cid = this.$route.params.cid;
    //     }, 500)
    // }
    ...mapActions(["FETCH_CARD", 'UPDATE_CARD']),
    fetchCard() {
      const id = this.$route.params.cid
      this.FETCH_CARD({ id })
    },
    onClose() {
      console.log("onClose")
      this.$router.push(`/b/${this.board.id}`)
    },
    onBlurTitle() {
      this.toggleTitle = false
      const title = this.$refs.inputTitle.value.trim()
      if(!title) {
        console.log('title 없음')
        return
      }

      this.UPDATE_CARD({id: this.card.id, title})
        .then(() => this.fetchCard())
    },
    onBlurDesc() {
      this.toggleDesc = false
      const description = this.$refs.inputDesc.value.trim()
      if(!description) {
        console.log('description none.')
        return
      }
      this.UPDATE_CARD({id: this.card.id, description})
        .then(() => this.fetchCard())
    }
  },
  // data() {
  //   return {
  //     cid: 0,
  //     loading: true,
  //   };
  // },
  // watch: {
  //   // route의 변경을 감시하는 중
  //   //   $route() {
  //   //       this.cid = this.$route.params.cid
  //   //   },
  //     // $route() 함수가 아닌 객체로 설정 가능
  //     // 라우터 변경에 따라 변경 감지하는 부분을 배워봄
  //     $route : {
  //       handler: 'fetchData',
  //       immediate: true, // created() 와 같은 역할 이므로 craeted() 삭제함
  //     },
  // },
  //   created() {
  //       this.fetchData()
  //   },
  /**
  computed() 속성 : 종속 대상을 따라 저장(캐싱)된다. 
  즉, 해당 속성이 종속된 대상이 변경될 때만 함수를 실행함.
  watch 속성은 감시할 데이터를 지정하고 그 데이터가 바뀌면 이런 함수를 
  실행하라는 방식으로 소프트웨어 공학에서 이야기하는 ‘명령형 프로그래밍’ 방식. 
  computed 속성은 계산해야 하는 목표 데이터를 정의하는 방식으로 
  소프트웨어 공학에서 이야기하는 ‘선언형 프로그래밍’ 방식.) 

  watch 속성: 
  대부분의 경우 computed 속성이 더 적합하지만 
  사용자가 만든 감시자가 필요한 경우가 있습니다.
  데이터 변경에 대한 응답으로 비동기식 
  또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용

  this.cid = this.$route.params.cid << 의 호출 시점이 속성에 따라 다르다~~
  * */
};
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;  
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>