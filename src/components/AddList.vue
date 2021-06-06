<template>
    <div class="add-list">
        <input v-if="isAddList" type="text" class="form-control" v-model="inputTitle"
            ref="inputTitle" @blur="restore" @keyup.enter="onSubmitTitle">
        <a v-else href="" @click.prevent="onAddList">&plus; Add another list</a>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'

export default {
    data() {
        return {
            isAddList: false,
            inputTitle: '',
        }
    },
    computed: {
        ...mapState(['board'])
    },
    methods: {
        ...mapActions(['ADD_LIST']),
        onAddList() {
            this.isAddList = true
            this.$nextTick(() => this.$refs.inputTitle.focus())
            //rendering cycleㅇㅔ 의해 다음 텍에서? 돌아야 하기 때문에
        },
        restore() {
            this.isAddList = false
            this.inputTitle = ''
        },
        onSubmitTitle() {
            console.log('..', this.inputTitle)
            this.inputTitle = this.inputTitle.trim()
            if (!this.inputTitle) {
                return this.restore()
            }
            // this.ADD_LIST
            const title = this.inputTitle
            const boardId = this.board.id
            const lastList = this.board.lists[this.board.lists.length -1]
            const pos = lastList ? lastList.pos * 2 : 66535

            this.ADD_LIST({title, boardId, pos})
                .then(() => this.restore())
        }
    }
}
</script>

<style scoped>
.add-list {
    background-color: rgba(0,0,0, .1);
    padding: 12px;
    color: #ddd;
    transition: all .3s;
}
.add-list a {
    color: #ddd;
}
.add-list:hover,
.add-list:focus {
    background-color: rgba(0,0,0, .3);
}

</style>
