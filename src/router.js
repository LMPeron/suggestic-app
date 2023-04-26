import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./layouts/Dashboard.vue";
import useUserStore from "./stores/user";

const routes = [
  {
    path: "/",
    name: "app",
    component: Dashboard,

    children: [
      {
        path: "/",
        name: "main",
        component: () => import("./pages/Main.vue"),
      },
      {
        path: "/history",
        name: "history",
        component: () => import("./components/History.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () => import("./pages/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/Register.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("./pages/Error.vue"),
  },
  {
    path: "/notfound",
    name: "notfound",
    component: () => import("./pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta?.requiresAuth)) {
    const store = useUserStore();
    if (store.token) {
      next();
    } else {
      next("/login");
    }
  }
  next();
});

export default router;
