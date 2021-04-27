<template>
  <div>
    Card
    <div v-if="loading">loading card...</div>
    <div v-else><div>cid: {{ cid }}</div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cid: 0,
      loading: true
    };
  },
  watch: {
    // $route() {// $router 객체를 감시하고 있는 함수
    //   // this.cid = this.$route.params.cid;
    //   this.fetchData();
    // },
    
    // $route() 함수가 아닌 객체로 설정 가능
    // 라우터 변경에 따라 변경 감지하는 부분을 배워봄
  $route : {
    // handler: this.fetchData(),
    handler: 'fetchData',
    immediate: true
  }

  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // console.log('fetdhData =', this.$route.params)
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.cid = this.$route.params.cid;
      }, 500)
    }
  }
};
</script>
