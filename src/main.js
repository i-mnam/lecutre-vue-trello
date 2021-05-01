import Vue from 'vue'
import router from './router' // ./router/index.js
import App from './App.vue'
import store from './store'

// vue instatnce를 만들 떄, router router객체를 넘겨준 것 처럼
// store객체도 넘겨줘서 
// application에서 router, store(vuex) 등의 사용을 설정을 함
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),// render: h => h({ template: '<router-view></router-view>' })
})
