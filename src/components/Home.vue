<template>
  <div>Home
    <div v-if="loading">Loading...</div>
    <div v-else>
      Api result:
      <pre>{{ apiRes }}</pre>
      <div v-if="error">
        <pre>{{ error }}</pre>
      </div>
    </div>
    <ul>
      <li><router-link to="/b/1">Board 1</router-link></li>
    </ul>
  </div>
</template>
<script>
// import axios from 'axios'
import {board} from '../api'

export default {
  data() {
    return {
      loading: true,
      apiRes: '',
      error: '',
      boards: '',
    }
  },
  created() {
    console.log('Home created()')
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true

      // const req = new XMLHttpRequest()
      // req.open('GET', 'http://localhost:3000/health')
      // req.send()

      // req.addEventListener('load', () => {
      //   this.loading = false
      //   this.apiRes = {
      //     status: req.status,
      //     statusText: req.statusText,
      //     response: JSON.parse(req.response),
      //   }
      // })


      // axios는 Promise를 반환 > then() chain을 걸 수 있다.
      // axios.get('http://localhost:3000/boards') 
      //   .then((res) => {
      //     console.log('res =', res)
      //     this.apiRes = res.data
      //   })
      //   .catch(res => {
      //     console.log('Home error :', res.response.data.error)
      //     this.$router.replace('/login')
      //   })
      //   .finally(_ => {
      //     this.loading = false
      //   })
      

      // catch() 없는 이유 : 
      // axios 모듈화 한 부분에서 catch 로직 처리를 해두어서 override 할 필요가 없었다
      board.fetch()
        .then(data => {
          console.log('/boards 성공 data =', data)
          this.boards = data
        })
        .catch(res => {
          console.log('Home error res =', res)
        })
        .finally(_ => {
          this.loading = false
        })
    }
  }
}
</script>