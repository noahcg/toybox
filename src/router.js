import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Library from "./views/Library.vue";
import Login from "./views/Login.vue";
import Manage from "./views/Manage.vue";
import Metrics from "./views/Metrics.vue";
import Book from "./views/Book.vue";
import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/library",
      name: "library",
      component: Library,
    },
    {
      path: "/metrics",
      name: "metrics",
      component: Metrics,
      beforeEnter: (to, from, next) => {
        if (!store.state.authenticated && to.name !== "login") {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/manage",
      name: "manage",
      component: Manage,
      beforeEnter: (to, from, next) => {
        if (!store.state.authenticated && to.name !== "login") {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/book/:id",
      name: "book",
      component: Book,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (!store.state.authenticated && to.name !== "login") {
//     next("/login");
//   } else {
//     next();
//   }
// });

// export default router;
