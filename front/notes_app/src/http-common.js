import axios from 'axios';
import Vue from 'vue'

export const HTTP = axios.create({

  // headers: {
  //   Authorization: `Token ${Vue.store.state.token}`
  // }
});