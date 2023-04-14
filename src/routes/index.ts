import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "../utils/auth";

const routes = [
  {
    path: "/",
    components: {
      default: () => import("@/components/layouts/HomeLayout.vue"),
    },
    children: [
      {
        path: "",
        name: "home",
        components: {
          default: () => import("@/components/views/DashboardView.vue"),
        },
      },
      {
        path: "imager",
        name: "imager",
        components: {
          default: () => import("@/components/imager/ImagerView.vue"),
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/components/forms/LoginForm.vue"),
    name: "login",
  },
  {
    path: "/login/confirm/:email/:token?",
    name: "login-confirm",
    props: true,
    component: () => import("@/components/forms/TwoFactorForm.vue"),
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

const ANONYMOUS_ROUTES = ["login", "login-confirm", "settings-advanced"];

// check login
router.beforeEach(async (to, from) => {
  if (to.name == "logout") {
    return;
  }

  if (!isAuthenticated()) {
    if (!ANONYMOUS_ROUTES.includes(to.name as string)) {
      console.debug(
        "Account auth is not set, redirecting to login route from:",
        from
      );
      return { name: "login" };
    }
  }
});

export default router;
