import { createRouter, createWebHashHistory } from "vue-router";
import { isAuthenticated } from "../utils/auth";

const routes = [
  { path: "/", component: () => import("@/components/HomeLayout.vue"), name: "home" },
  { path: "/login", component: () => import("@/components/forms/LoginForm.vue"), name: "login"},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// check login
router.beforeEach(async (to, _from) => {
  if (to.name == "logout") {
    return;
  }

  if (!isAuthenticated()){
    if (to.name != "login"){
      return { name: "login" };
    }
  }

});

export default router;
