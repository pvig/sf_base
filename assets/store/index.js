// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth';
import produitsModule from './modules/produits';
import clientsModule from './modules/clients';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const mutations = {
  SET_PRODUITS: (state, produits) => {
    state.all = produits;
  },
  DISPLAY_SNACKBAR: (state, newSnack) => {
    console.log("DISPLAY_SNACKBAR", newSnack);
    state.snackbarText = newSnack.message;
    state.snackbarColor = newSnack.color || "grey";
    state.snackbarTimeout = newSnack.timeout || 2000;
    state.snackbarShow = true;
  },
  SET_SNACKBARSHOW: (state, val) => {
    state.snackbarShow = val;
  },
};

export default new Vuex.Store({
    strict: true,
    state: {
      snackbarShow: false,
      snackbarText: "",
      snackbarColor: "",
      snackbarTimeout: 2000,
    },
    mutations,
    plugins: [createPersistedState()],
    modules: {
        auth: authModule,
        produits: produitsModule,
        clients: clientsModule
      },
    strict: process.env.NODE_ENV !== 'production',
});