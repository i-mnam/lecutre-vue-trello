import Vue from 'vue'
import App from './App.vue'

const Login = { template: '<div>Login Page</div>' }

// routing map (js 객체로)
const routes = {
  '/': App,
  '/login': Login,
}

new Vue({
  el: '#app',
  computed: {
    VueComponent() {
      return routes[window.location.pathname] || { template: '<div>Not Found</div>' }
    }
  },
  // 인자로 넘어온 h()함수를 통해서 App이라는 컴포를 그림
  // render: h => h(App) 
  render(h) {
    // computed 속성을 h 함수 인자로 줌
    return h(this.VueComponent)
  }
})
