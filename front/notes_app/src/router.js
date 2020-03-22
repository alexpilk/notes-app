import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: '/index'
    },
    {
      path: "/create",
      name: "create",
      meta: {
        requiresAuth: true
      },
      component: () => import("./components/Create.vue")
    },
    {
      path: "/edit/:id",
      name: "edit",
      meta: {
        requiresAuth: true
      },
      component: () => import("./components/Edit.vue")
    },
    {
      path: "/index",
      name: "index",
      meta: {
        requiresAuth: true
      },
      component: () => import("./components/Index.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./components/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login.vue")
    },
  ]
});