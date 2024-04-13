<template>
   <v-card class="mt-16 px-4">
      <v-card-title>
        Склад препаратов
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchDrug"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <div class="d-flex justify-space-between flex-wrap">
        <v-card
          class="mx-2 my-2"
          max-width="600"
          outlined
          v-for="(item, index) in filterDrugs"
          :key="index"
        >
          <v-img
            :src="item.photo"
            height="400px"
          ></v-img>

          <v-card-title>
            {{item.title}}
          </v-card-title>

          <v-card-subtitle class="d-flex justify-space-between">
            <div>Цена: {{item.price}}</div>
            <div>Количество: {{item.count}}</div>
          </v-card-subtitle>
          <v-card-text>{{item.description}}</v-card-text>
        </v-card>
      </div>
    </v-card>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      searchDrug: '',
      drugs: []
    }
  },
  computed: {
    filterDrugs () {
      let filtered = []
      if (this.searchDrug !== '') {
        this.drugs.forEach(element => {
          if (element.title.toLowerCase().includes(this.searchDrug.toLowerCase())) {
            filtered.push(element)
          }
        }); 
        return filtered
      }
      return this.drugs
    }
  },
  mounted() {
    axios.get("https://hospitalll.pythonanywhere.com/api/drug/")
    .then(response => this.drugs = response.data)
  },
}
</script>