import Vue from 'vue';
import './plugins/vuetify';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import 'firebase/firestore';

Vue.config.productionTip = false;

Vue.use(VueFire);

firebase.initializeApp({
  projectId: 'libraryrepo-410f1',
  databaseURL: 'https://libraryrepo-410f1.firebaseio.com',
});

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
