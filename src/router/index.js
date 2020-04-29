// Imports
import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash };
    if (savedPosition) return savedPosition;

    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/home/Index.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/home/Index.vue")
        },
        {
          path: "login",
          name: "Login",
          component: () => import("@/views/login/Index.vue"),
          meta: { src: require("@/assets/login.jpg") }
        },
        {
          path: "manage",
          name: "Manage",
          component: () => import("@/views/manage/Index.vue"),
          meta: { src: require("@/assets/login.jpg") },
          beforeEnter: (to, from, next) => {
            if (!store.state.authenticated && to.name !== "Login") {
              next("/login");
            } else {
              next();
            }
          }
        },
        {
          path: "toys",
          name: "Toys",
          component: () => import("@/views/toys/Index.vue"),
          meta: { src: require("@/assets/login.jpg") },
          beforeEnter: (to, from, next) => {
            if (!store.state.authenticated && to.name !== "Login") {
              next("/login");
            } else {
              next();
            }
          }
        },
        {
          path: "*",
          name: "FourOhFour",
          component: () => import("@/views/404/Index.vue")
        }
      ]
    }
  ]
});

export default router;
