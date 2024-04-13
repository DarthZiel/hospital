<template>
  <div>
    <router-link to="/"><v-icon x-large>mdi-arrow-left-thin</v-icon></router-link>
    <v-card
      class="mx-auto mt-16"
      max-width="900"
    >
      <v-list-item>
          <v-list-item-avatar size="100" v-if="this.user.photo !== null">
            <img
              :src="this.user.photo"
              alt="Имя"
            >
          </v-list-item-avatar>
          <v-list-item-avatar size="100" v-else>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Имя"
            >
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title" style="margin-top:20px;">ФИО - {{user.fio }}</v-list-item-title>
            <v-list-item-subtitle>Должность - {{user.position}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>


      <v-card-text class="text--primary">
        <div>Отделение: {{user.structure}}</div>
        <div>Дата рождения: {{user.date_of_birth}}</div>
        <div>Расписание приема: {{user.schedule}}</div>
        <div>Кабинет: {{user.cabinet}}</div>
        <div>Стаж: {{user.experience}}</div>
        <div>Пол: {{user.sex}}</div>
        <div>Категория: {{user.Category}}</div>
        <div v-if="user.diploma"><a :href="user.diploma" download>Скачать файл</a></div>
        <div v-else >Файл диплома отсутствует</div>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data: () => ({
      user: [],
      id: null, 
    }),
    mounted() {
      this.id = this.$route.params.id
       axios.get(`https://hospitalll.pythonanywhere.com/api/profile/${this.id}`)
      .then(response => this.user = response.data)
    },
  }
</script>