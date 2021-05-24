<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTitle: ''
    }
  },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim()
    }
  },
  // 부모 컴포에 마운트되어 보여질 때, 처리
  mounted: function() {
    this.$refs.inputText.focus()
    // console.log('this.$el =', this.$el)
    // DOM 조작할 예정
    this.setupClickOutside(this.$el)
  },
  methods: {
    onSubmit() {
      console.log('AddCard - onSubmit')
    },
    setupClickOutside(el) {
      document.querySelector('body').addEventListener('click', e => {
        console.log('e.target =', e.target)
        if(el.contains(e.target)) {
          console.log('setupClickOutside() this.$el.contains(e.target)', el.contains(e.target))// 해당 ele를 포함하는지
          return
        }

        this.$emit('close')
      })
    }
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>