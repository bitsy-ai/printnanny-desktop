import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "../utils/auth";

const routes = [
  {
    path: "/",
    component: () => import("@/components/HomeLayout.vue"),
    name: "home",
  },
  {
    path: "/login",
    component: () => import("@/components/forms/LoginForm.vue"),
    name: "login",
  },
  {
    path: "/settings/advanced",
    component: () => import("@/components/forms/AdvancedSettingsForm.vue"),
    name: "settings-advanced",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const ANONYMOUS_ROUTES = ["login", "settings-advanced"];

// check login
router.beforeEach(async (to, _from) => {
  if (to.name == "logout") {
    return;
  }

  if (!isAuthenticated()) {
    if (!ANONYMOUS_ROUTES.includes(to.name as string)) {
      return { name: "login" };
    }
  }
});

export default router;
