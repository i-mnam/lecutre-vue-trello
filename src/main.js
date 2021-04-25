import Vue from 'vue'
import router from './router' // ./router/index.js
import App from './App.vue'

new Vue({
  el: '#app',
  router,
  render: h => h(App),// render: h => h({ template: '<router-view></router-view>' })
})
