import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
// import VeeValidate from 'vee-validate';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { ValidationProvider } from 'vee-validate';

Vue.use(BootstrapVue);
// Vue.use(VeeValidate);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(to, from, next)
    if (!store.state.token) {
      next({ name: 'login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  components: {
    ValidationProvider
  },
}).$mount("#app");

  import axios from 'axios';
axios.interceptors.request.use(
  (config) => {
    let token = store.state.token;

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
