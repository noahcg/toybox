import Vue from 'vue';
import './plugins/vuetify';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import 'firebase/firestore';
import 'firebase/auth';
import env from '../env.json';

Vue.config.productionTip = false;

Vue.use(VueFire);

firebase.initializeApp(env.firebase);

export const db = firebase.firestore();
export const auth = firebase.auth();

Vue.prototype.$auth = auth;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
