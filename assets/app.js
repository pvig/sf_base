import './styles/app.css';

import Vue from 'vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store';
import router from './router';
import SnackBar from './components/SnackBar'
import filters from './filters';

Vue.prototype.$http = axios

Vue.use(Vuex)
Vue.use(filters);

axios.interceptors.request.use(function (config) {
  //const token = store.state.auth.token;
  //config.headers.Authorization =  `Bearer ${token}`;
  return config;
});
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    console.log("401");
    store.dispatch('logout');
    router.push('/login');
    return Promise.reject(error);
  }
  return error;
});

const vue2App = new Vue({
  router,
  store,
  vuetify,
  components: {
    SnackBar
  },
  data() {
    return {
      drawer: false,
      menuItems: {

        navigation: [
          {
            path: "/",
            title: "Accueil",
            action: this.noaction
          },
          {
            path: "/clients",
            title: "Clients",
            action: this.noaction
          },
          {
            path: "/ventes",
            title: "Ventes",
            action: this.noaction
          },
          {
            path: "/produits",
            title: "Produits",
            action: this.noaction
          },
        ],
        user: [
          {
            path: "/login",
            title: "Deconnexion",
            action: this.logout
          },
          {
            path: "/api/",
            title: "API",
            action: this.refresh
          },
        ]

      }
    };
  },
  methods: {
    home() {
      this.$router.push("/").catch(() => { });
    },
    noaction() { },
    logout() {
      store.dispatch('logout');
    },
    refresh() {
      location.reload();
    }
  }
})

vue2App.$mount('#app');
