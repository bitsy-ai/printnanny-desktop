import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "../utils/auth";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/forms/LoginForm.vue"),
  },
  {
    path: "/login/confirm/:email/:token?",
    name: "login-confirm",
    props: true,
    component: () => import("@/components/forms/TwoFactorForm.vue"),
  },
  {
    path: "",
    components: {
      default: () => import("@/components/layouts/HomeLayout.vue"),
    },
    children: [
      {
        path: "",
        name: "3D Printers",
        components: {
          default: () => import("@/components/views/PrinterView.vue"),
        },
      },
    ],
  },
  {
    path: "/imager",
    components: {
      default: () => import("@/components/layouts/HomeLayout.vue"),
    },
    children: [
      {
        path: "",
        name: "Flash Device",
        components: {
          default: () => import("@/components/imager/ImagerView.vue"),
        },
      },
    ],
  },
  {
    path: "/settings/",
    components: {
      default: () => import("@/components/layouts/HomeLayout.vue"),
    },
    children: [
      {
        path: "advanced/",
        components: {
          default: () => import("@/components/views/SettingsView.vue"),
          FormView: () => import("@/components/forms/AdvancedSettingsForm.vue"),
        },
        name: "Developer Settings",
      },
      {
        path: "imager/",
        components: {
          default: () => import("@/components/views/SettingsView.vue"),
          FormView: () => import("@/components/forms/ImagerSettingsForm.vue"),
        },
        name: "Customize OS Image",
      },
    ],
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
