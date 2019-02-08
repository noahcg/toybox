import Vue from 'vue';
import Router from 'vue-router';
import Library from './views/Library.vue';
import Reports from './views/Reports.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/library',
      name: 'library',
      component: Library,
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports,
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
  ],
});
