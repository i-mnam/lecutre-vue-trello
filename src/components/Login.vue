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
    console.log('Login created()')
    // vue.$route 에서 query 정보를 조회해서 온다.
    this.rPath = this.$route.query.rPath || '/' // 여기서 this.rPath 초기화
  },
  methods: {
    onSubmit() {
      console.log('onSubmit() =', this.email, this.password)
      auth.login(this.email, this.password)
        .then(data => {
          console.log('success data =', data)
          console.log('이게 정상이라는 거잖아')
          localStorage.setItem('token', data.accessToken)
          setAuthInHeader(data.accessToken)

          // vue.$router 를 통해서 redirect 정보를 설정해준다.
          this.$router.push(this.rPath)
        })
        .catch(err => {
          console.log('catch err =', err)
          this.error = err.data.error
        })

    }
  }
};
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