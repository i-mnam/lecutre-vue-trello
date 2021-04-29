<template>
    <Modal>
        <div slot="header">
            <h2>
                Create new board
                <a href="" class="modal-default-button" @click.prevent="close">&times;</a>
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

export default {
    components: {
        Modal,
    },
    data() {
        return {
            input: '',
            valid: false,
        }
    },
    watch: {
        input(v) {
            // 글자당 로그가 한 번씩 찍힌다.
            // console.log('watch input(v) =', v)
            this.valid = v.trim().length > 0
        }
    },
    mounted() {
        this.$refs.input.focus()
    },
    methods: {
        close() {
            console.log('AddBoard - close()')
            this.$emit('close')
        },
        addBoard() {
            console.log('AddBoard - addBoard() input =', this.input)
            this.$emit('@close')
            this.$emit('@submit', this.input)
        }
    }
}
</script>
