<template>
  <Modal>
    <div slot="header">
      <h2>
        Create new board
        <!-- <a href="" class="modal-default-button" @click.prevent="close">&times;</a> -->
        <a href="" class="modal-default-button" @click.prevent="SET_IS_ADD_BOARD(false)">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form" @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="input" ref="input">
      </form>
    </div>
    <div slot="footer">
      <button class="btn" :class="{'btn-success': valid}" type="submit" form="add-board-form" :disabled="!valid">
        Create Board
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import {mapMutations, mapActions} from 'vuex'

export default {
  components: {
    Modal
  },
  data() {
    return {
      input: '',
      valid: false
    }
  },
  watch: {
    input(v) {
      this.valid = v.trim().length > 0
    }
  },
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    // **store의 mapMutations 변경 (잘 생각해보면, state는 사용할 필요없이 동기적으로 값변경만 일어나면 됨
    // state는 사용할 필요없이 동기적으로 값변경만 일어나면 됨 > mutation 만 호출함)
    // close() {
    //   this.$emit('close')
    // },

    
    ...mapMutations(['SET_IS_ADD_BOARD']),
    ...mapActions(['ADD_BOARD', 'FETCH_BOARDS']),

    addBoard() {
      // this.$emit('close')
      this.SET_IS_ADD_BOARD(false)

      // **store의 mapActions 변경
      // this.$emit('submit', this.input)
      // store의 actions 직접 호출
      // this.$store.dispatch('ADD_BOARD', {title: this.input})

      // **store를 통해 submit emit을 대체하는 중
      // this.ADD_BOARD({ title: this.input })
      // this.$emit('submit') ->> this.FETCH_BOARDS() 이렇게 변경이 아니였어

      // 다른 문제점
      // 보드를 추가하는 API의 응답을 확인하지 않고 팝업을 닫은 후에 보드를 조회하는 API를 호출하고 있어서
      // 보드를 추가하는 API의 응답보다 보드를 조회하는 API의 응답이 더 빠르게 온다면 추가한 보드가 화면상에 나타나지 않을것 같은데요.
      // 해결책: 비동기 함수로 인한 문제는 then()을 통해서 응답을 기다리고 반영할 수 있다
      this.ADD_BOARD({ title: this.input }).then(() => {
        this.FETCH_BOARDS()
      })
    }
  }
}
</script>

<style>
</style>