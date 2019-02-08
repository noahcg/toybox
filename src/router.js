import Vue from 'vue';
import Router from 'vue-router';
import Library from './views/Library.vue';
import Reports from './views/Reports.vue';
import Login from './views/Login.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'library',
    component: Library,
    alias: '/library',
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  ],
});

router.beforeEach((to, from, next) => {
  if (!store.state.authenticated && to.name !== 'login') {
    next('/login');
  } else {
    next();
  }
});

export default router;
