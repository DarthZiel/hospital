import Vue from 'vue';
import Vuex from 'vuex';
import "regenerator-runtime";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    users: null,
    token: '',
    isAuthentificated: false,
  },

  getters: {
    USERS: state => {
      return state.users;
    },
    TOKEN: state => {
      return state.token
    },
  },

  mutations: {
    setValue (state, keyValue) {
      state[keyValue.key] = keyValue.value
    }, 
    INIT_STORE: (state) => {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthentificated = true
      } else {
        state.token = ''
        state.isAuthentificated = false
      }
    },
        
    SET_TOKEN: (state, payload) => {
      state.token = payload;
      state.isAuthentificated = true
    },

    REMOVE_TOKEN: (state, payload) => {
      state.token = '';
      state.isAuthentificated = false
      state.username = ''
      localStorage.clear();
    },
  },

  actions: {
    SET_VALUE ({ commit }, keyValue) {
      commit('setValue', keyValue)
    },
  },
});