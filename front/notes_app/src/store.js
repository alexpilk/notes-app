import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
          storage: window.sessionStorage,
      })],
    state: {token: null},
    mutations: {

        LOGIN_SUCCESS(state, token) {
            state.token = token
        },
        LOGOUT_SUCCESS(state) {
            state.token = null
        }
    },
    actions: {}
});