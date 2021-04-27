<template>
  <div>
    Home
    <div>
      Board List:
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="b in boards" :key="b.id">
          {{ b }}
        </div>
        <div v-if="error">
          <pre>{{ error }}</pre>
        </div>
      </div>
      <ul>
        <li><router-link to="/b/1">Board 1</router-link></li>
        <li><router-link to="/b/2">Board 2</router-link></li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios"

export default {
  data() {
    return {
      loading: true,
      apiRes: "",
      // error: "",
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true

      axios
        .get("http://localhost:3000/boards") // axios는 promise를 반환해서 바로 then chain을 사용할 수 있다
        .then((res) => {
          this.apiRes = res.data
        })
        .catch((res) => {
          // this.error = res.response.data
          // this.$router vue-router를 뜻함..
          this.$router.replace("/login")
        })
        .finally(() => {
          this.loading = false
        })

      //** XMLHttpRequest 객체 사용한 것 **//
      // const req = new XMLHttpRequest()

      // req.open("GET", "http://localhost:3000/health")

      // req.send()

      // req.addEventListener("load", () => {
      //   this.loading = false
      //   this.apiRes = {
      //     status: req.status,
      //     statusText: req.statusText,
      //     response: JSON.parse(req.response),
      //   }
      // })
    },
  },
}
</script>
