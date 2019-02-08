import Vue from 'vue';
import './plugins/vuetify';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import 'firebase/firestore';
import 'firebase/auth';

Vue.config.productionTip = false;

Vue.use(VueFire);

firebase.initializeApp({
  projectId: 'libraryrepo-410f1',
  databaseURL: 'https://libraryrepo-410f1.firebaseio.com',
  apiKey: 'AIzaSyBI_UBNoItLXfT5r86rQJSnyRHfJHWIfMA',
  authDomain: 'libraryrepo-410f1.firebaseapp.com',
});

export const db = firebase.firestore();
export const auth = firebase.auth();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
