import Vue from "vue";
import Router from "vue-router";
import Inventory from "./views/Inventory.vue";
import Management from "./views/Management.vue";
import Reports from "./views/Reports.vue";
import Login from "./views/Login.vue";
import store from "./store/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "inventory",
      component: Inventory,
      alias: "/inventory"
    },
    {
      path: "/reports",
      name: "reports",
      component: Reports,
      beforeEnter: (to, from, next) => {
        if (!store.state.authenticate.authenticated && to.name !== "login") {
          next("/login");
        } else {
          next();
        }
      }
    },
    {
      path: "/management",
      name: "management",
      component: Management,
      beforeEnter: (to, from, next) => {
        if (!store.state.authenticate.authenticated && to.name !== "login") {
          next("/login");
        } else {
          next();
        }
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (!store.state.authenticate.authenticated && to.name !== "login") {
          next("/login");
        } else {
          next();
        }
      }
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (!store.state.authenticated && to.name !== "login") {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
