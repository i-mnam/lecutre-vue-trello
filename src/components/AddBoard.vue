<template>
  <Modal>
    <div slot="header">
      <h2>
        Create new board
        <!-- <a href="" class="modal-default-button" @click.prevent="close">&times;</a> -->
        <a
          href=""
          class="modal-default-button"
          @click.prevent="SET_IS_ADD_BOARD(false)"
          >&times;</a
        >
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form" @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="input" ref="input" />
      </form>
    </div>
    <div slot="footer">
      <button
        class="btn"
        :class="{ 'btn-success': valid }"
        type="submit"
        form="add-board-form"
        :disabled="!valid"
      >
        Create Board
      </button>
    </div>
  </Modal>
</template>
<script>
import { map } from "@amcharts/amcharts4/.internal/core/utils/Array"
import Modal from "./Modal.vue"
import { mapMutations, mapActions } from "vuex"

export default {
  components: {
    Modal,
  },
  data() {
    return {
      input: "",
      valid: false,
    }
  },
  watch: {
    input(v) {
      // 글자당 로그가 한 번씩 찍힌다.
      // console.log('watch input(v) =', v)
      this.valid = v.trim().length > 0
    },
  },
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD"]),
    // mutation을 사용함으로써 사용할 필요가 없어진 methods
    // 부모에게 이벤트를 제출, 전달하는 것이 아닌 vuex의 mutation을 바로 사용하여 전역상태를 활용한다.
    // close() {
    //     this.$emit('close')
    // },
    ...mapActions(["ADD_BOARD"]),

    addBoard() {
      console.log("AddBoard - addBoard() input =", this.input)
      // this.$emit('@close')
      this.SET_IS_ADD_BOARD(false)
      // this.$emit("@submit", this.input)
      this.$emit("@submit")
      // this.$store.dispatch("ADD_BOARD", { title: this.input })

      // mapActions 핼퍼 사용
      this.ADD_BOARD({ title: this.input })
    },
  },
}
</script>
