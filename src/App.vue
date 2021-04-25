<template>
  <div id="app">
    <!-- <a href="/">Home</a>
    <a href="/login">Login</a> -->
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link> -->
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "app",
  components: {
    Navbar,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>