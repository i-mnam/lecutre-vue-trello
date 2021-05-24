<template>
  <div class="login">
    <h2>Log in to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
          <label for="email">Email</label>
          <input class="form-control" type="text" name="email" v-model="email" autofocus placeholder="e.g., test@test.com" />
      </div>
      <div>
          <label for="password">Password</label>
          <input class="form-control" type="password" v-model="password" placeholder="123123" />
      </div>
      <button class="btn" :class="{'btn-success': !invalidForm}" type="submit" :disabled="invalidForm">Log In</button>
    </form>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>
<script>
import {auth, setAuthInHeader} from '../api'
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      rPath: '',
    }
  },
  computed: {
    invalidForm() {
      return !this.email || !this.password
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || '/'
  },
  methods: {
    // 왜 action함수를 불러오는지 생각해 보자. api로직을 사용하기 때문에
    ...mapActions(['LOGIN']),
    // 객체로 받기로 함
    onSubmit() {
      // auth.login(this.email, this.password)
      //   .then(data => {
      //     localStorage.setItem('token', data.accessToken)
      //     setAuthInHeader(data.accessToken)
      //     // login 성공 후, redirect
      //     // $router VS $route 구분 잘 해둬야 할 거 같다
      //     this.$router.push(this.rPath)
      //   })
      //   .catch(err => {
      //     this.error = err.data.error
      //   })
      this.LOGIN({email: this.email, password: this.password})
        .then((data) => {
          this.$router.push(this.rPath) // 라우팅 하는 것인데, 이건 component가 하는 일이 맞다
        })
        .catch(err => {
          this.error = err.data.error
        })
    }
  },
}
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto; 
}
.error {
  color: #f00;
}

</style>