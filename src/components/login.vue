<template>
  <v-card class="mt-16 login" max-width="800px">
    <v-toolbar
      flat
      color="light-green"
      dark
    >
      <v-toolbar-title>Аутентификация</v-toolbar-title>
    </v-toolbar>
    <v-tabs v-model="currentTab" active-class="active-red">
      <v-tab>
        <v-icon left>
          mdi-account-outline
        </v-icon>
        Регистрация
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-account-edit-outline
        </v-icon>
        Вход
      </v-tab>

      <v-tab-item>
        <v-card flat >
          <v-card-text>
            <form>
              <v-text-field
                v-model="name"
                label="ФИО"
                required
              ></v-text-field>
              <v-text-field
                v-model="login"
                label="Логин"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Пароль"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-btn
                class="mr-4 mt-4"
                @click="addNewUser"
                outlined
                color="red"
                :disabled="activeButton"
              >
                Зарегистрировать
              </v-btn>
              <v-btn @click="clear" class="mt-4" outlined>
                Очистить
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-text-field
              v-model="loginLog"
              label="Логин"
              required
            ></v-text-field>
            <v-text-field
              v-model="passwordLog"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Пароль"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn 
              outlined
              color="red"
              :disabled="activeButtonAuth"
              @click="loginAuth"
            >Войти</v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <!-- {{count}} -->
  </v-card>
</template>
<script>
import axios from "axios"
  export default {

    data: () => ({
      currentTab: 1,
      name: '',
      login: '',
      show1: false,
      password: '',
      loginLog: '',
      passwordLog: ''
    }),

    computed: {
      count () {
        return this.$store.state.token
      },
      activeButton() {
        if (this.password !== '' && this.login !== '') {
          return false
        }
        return true
      },
      activeButtonAuth() {
        if (this.passwordLog !== '' && this.loginLog !== '') {
          return false
        }
        return true
      }
    },
    mounted() {
    },
    methods: {
      loginAuth () {
        let formData = {
          'username': this.loginLog,
          'password': this.passwordLog, 
        }
        axios.post('auth/token/login/', formData)
        .then(response => {
          const token = response.data.auth_token

          this.$store.commit('SET_TOKEN', token)

          axios.defaults.headers.common['Authorization'] = "Token " + token

          localStorage.setItem("token", token)

          this.$router.push('/')
        })
        .catch(error => {
          console.log(error);
        })
      },
      addNewUser () {
        let item = {
          'fio': this.name,
          'username': this.login,
          'password': this.password, 
        }
         axios.post('api/auth/users/', item)
        .then(() => {
          this.currentTab = 1
        })
        .catch((err) => {
          console.log(err)
          if (err.response.data.username) {
            alert(err.response.data.username)  
          }
          if (err.response.data.password) {
            alert(err.response.data.password)  
          }
        })
      },
      clear () {
        this.name = ''
        this.login = ''
        this.password = ''
      },
    },
  }
</script>
<style>
.active-red{
  color: rgb(14, 93, 37)!important;
  background: inherit;
}
.login{
  margin: 0 auto;
  margin-top: 100px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>