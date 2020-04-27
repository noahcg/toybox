import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Toys from "./views/Toys.vue";
import Login from "./views/Login.vue";
import Manage from "./views/Manage.vue";
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
      path: "/toys",
      name: "toys",
      component: Toys,
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
