<template>
  <div class="list">
    <div class="list-header">
      <input v-if="isEditTtile" class="form-control input-title" tytpe="text"
        ref="inputTitle" v-model="inputTitle" @blur="onBlurTitle" @keyup.enter="onSubmitTitle">
      <div v-else class="list-header-title" @click.prevent="onClickTitle">{{data.title}}</div>
    </div>
    <div class="card-list">
      <CardItem v-for="card in data.cards" :key="card.id" :data="card" :data-list-id="data.id"/>
    </div>
    <div v-if="isAddCard">
      <AddCard :list-id="data.id" @close="isAddCard=false" />
    </div>
    <div v-else>
      <!-- 주의!! event bubbling & 전파 capture/ target(in) / currentTarget(out) / prevent(기본 event 막음) / stop(버블링 막음) -->
      <a class="add-card-btn" href="" @click.prevent.stop="isAddCard=true">
        &plus; Add a card..
      </a>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import AddCard from './AddCard.vue'
import CardItem from './CardItem.vue'

export default {
  components: {
    AddCard, CardItem
  },
  props: ['data'],
  data: function() {
    return {
      isAddCard: false,
      isEditTtile: false,
      inputTitle: '',
    }
  },
  created: function() {
    this.inputTitle = this.data.title
  },
  methods: {
    ...mapActions(['UPDATE_LIST']),
    onClickTitle() {
      this.isEditTtile = true
      this.$nextTick(_ => this.$refs.inputTitle.focus())
    },
    onBlurTitle() {
      this.isEditTtile = false
    },
    onSubmitTitle() {
      this.onBlurTitle()

      this.inputTitle = this.inputTitle.trim()
      if(!this.inputTitle) {
        console.log('none.')
        return
      }

      const id = this.data.id
      const title = this.inputTitle
      if (title === this.data.title) {
        console.log('same')
        return
      }

      this.UPDATE_LIST({id, title})
    }
  }
}
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}
.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}
.input-title {
  width: 90%;
}
.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
.card-list {
  flex: 1 1 auto;
  overflow-y: scroll;
}
.empty-card-item   {
  height: 10px;
  width: 100%;
  background-color: rgba(0,0,0, 0);
}
.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0,0,0, .1);
}
</style>