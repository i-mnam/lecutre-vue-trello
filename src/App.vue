<template>
  <div id="app">
    여기서 부터 코드 시작!
    <!-- <router-link to="/">Ho</router-link> -->
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar,
  },
  data () {
    return {
    }
  }
}
</script>