<template>
  <v-container>
    <v-card class="mt-16" v-if="usersProfiles.length > 0">
      <v-card-title>
        Сотрудники
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="usersProfiles"
        :search="search"
        item-key="name"
        class="pointer"
        @click:row="getDetailInfo"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
            'items-per-page-text':'Количество строк',
            'items-per-page-all-text': 'Все'
        }"
      >
        <template v-slot:[`footer.page-text`]="items"> 
          с {{ items.pageStart }} по {{ items.pageStop }} из {{ items.itemsLength }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import axios from "axios"
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'ID', value: 'id' },
          {
            text: 'ФИО',
            align: 'start',
            sortable: true,
            value: 'fio',
          },
          { text: 'Дата рождения', value: 'date_of_birth' },
          { text: 'Должность', value: 'position' },
        ],
        usersProfiles: [],
      }
    },
    methods: {
      getDetailInfo (item) {
        this.$router.push(`/profile/${item.id}`)
      }
    },
    mounted() {
      axios.get("https://hospitalll.pythonanywhere.com/api/profile/")
      .then(response => this.usersProfiles = response.data)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer{
  cursor: pointer;
}
</style>