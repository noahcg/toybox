import Vue from "vue";
import Router from "vue-router";
import Inventory from "./views/Inventory.vue";
import Management from "./views/Management.vue";
import Reports from "./views/Reports.vue";
import Login from "./views/Login.vue";
import store from "./store";

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
      component: Reports
    },
    {
      path: "/management",
      name: "management",
      component: Management
    },
    {
      path: "/login",
      name: "login",
      component: Login
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
