<template>
  <v-app>
    <v-app-bar
      app
      color="green"
      dark
      class="d-flex justify-space-between"
    >
      <v-btn outlined v-if="this.$store.state.token" @click="logOut" icon class="mx-10"><v-icon>mdi-exit-run</v-icon></v-btn>
      <div v-if="this.$store.state.token">
        <router-link to="/" class="mr-4">Сотрудники</router-link>
        <router-link to="/drugs">Препараты</router-link>
      </div>
    </v-app-bar>
    
    <v-main class="container">
      <router-view></router-view>
    </v-main>

    <v-footer
      dark
      padless
    >
    
    </v-footer>
  </v-app>
</template>
<script>
import axios from "axios"
export default {
  name: 'App',
  data() {
    return {
      userName: null
    }
  },
  watch: {
    getFioUser(newVal) {
      this.userName = newVal
    }
  },
  beforeCreate() {
    this.$store.commit('INIT_STORE')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },
  created() {
    
  },
  mounted() {
    const token = this.$store.state.token

    if (this.$route.path !== '/login') {
      if (!token) {
        this.$store.commit('REMOVE_TOKEN')
        axios.defaults.headers.common['Authorization'] = ''
        this.$router.push('/login')
      }
    }
  },
  computed: {
    getToken () {
      return this.$store.state.token
    },
    getFioUser () {
      this.userName = localStorage.getItem('username')
      return localStorage.getItem('username')
    }
  },
  methods: {
    logOut () {
      axios.post('auth/token/logout/', {})
      this.userName = null
      this.$store.commit('REMOVE_TOKEN')
      axios.defaults.headers.common['Authorization'] = ''
      this.$router.push('/login')
    }
  },
}
</script>

<style>
  a{
    text-decoration: none;
  }
  .container{
    max-width: 1400px;
  }
</style>