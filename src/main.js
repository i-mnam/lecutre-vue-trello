import Vue from 'vue'
import router from './router'
import App from './App.vue'

new Vue({
  el: '#app',
  router,
  // render: h => h({ template:'<router-view></router-view>' })
  render: h => h(App)
})
/* 
<router-link>, <router-view></router-view> markup 마크업 
router-view : 현재 라우터에 맞는 컴포넌트로 렌더링 됨
router-link : <a> 태그로 렌더링 됨.

render: h => h() << h()라는 함수를 렌더 함수로 사용한다는 뜻
*/