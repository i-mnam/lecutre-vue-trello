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
import {mapMutations} from 'vuex'

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

    addBoard() {
      // this.$emit('close')
      this.SET_IS_ADD_BOARD(false)
      this.$emit('submit', this.input)
    }
  }
}
</script>

<style>
</style>