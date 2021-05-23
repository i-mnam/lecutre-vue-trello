<template>
    <nav class="header">
        <div class="header-logo">
            <router-link to="/">Home</router-link>
        </div>
        <div class="header-auth">
            <a href="" v-if="isAuth" @click.prevent="logout">Logout</a>
            <router-link v-else to="/login">Login</router-link>
        </div>
    </nav>
</template>

<script>
// import { setAuthInHeader } from '../api'
import {mapGetters, mapMutations} from 'vuex'

export default {
    computed: {
      // **store (getter 사용하는 부분 주의! 이렇게 호출만 해둬도 템플릿에서 변수처럼 사용 가능)
      // isAuth() {
      //     // js값을 불리언 타입으로 변경할때 많이 사용 / 비슷 Boolean()
      //     return !!localStorage.getItem('token')
      // }
      ...mapGetters(['isAuth']),
      
      aa() {
        console.log('호출 template가 없으면 사용 안해', this.isAuth)
      },
    },
    methods: {
      // 언제 mutaition인지, action인지 헷갈린다. 주의!!!
      ...mapMutations(['LOGOUT']),
      logout() {
          // delete localStorage.token
          // setAuthInHeader(null)
          this.LOGOUT()
          this.$router.push('/login')
      }
    }
}
</script>

<style>
.header {
  flex: none;
  background-color: rgba(0,0,0,.15);
  height: 32px;
  padding: 4px;
}
.header a {
  display: block;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  color: rgba(255,255,255,.5);
}
.header-logo {
  position: absolute;
  left: 50%;
  top: 7px;
  margin-left: -30px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
}
.header-logo a:hover,
.header-logo a:focus {
  color: rgba(255,255,255,.9);
}
.header-auth {
  position: absolute;
  right: 15px;
  top: 5px;
}
.header-auth a {
  border-radius: 2px;
  padding: 0 10px;
  background-color: rgba(255,255,255, .5);
  color: white;
  transition: all .3s;
}
.header-auth a:hover,
.header-auth a:focus {
  background-color: rgba(255,255,255, .3);
}
</style>
