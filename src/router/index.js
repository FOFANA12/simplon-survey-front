import { usePermission } from "@/composables/usePermission";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store";

import Dashboard from "@/views/Dashboard.vue";
import NotAuthorized from "@/views/NotAuthorized.vue";
import NotFound from "@/views/NotFound.vue";
import AuthRoutes from "./auth";
import SurveyRoutes from "./survey";
import CompanyRoutes from "./company";
import CompanyManagerRoutes from "./companyManager";
import CompanyResponderRoutes from "./companyResponder";
import UserRoutes from "./user";

const routes = [
  {
    path: "/",
    component: Dashboard,
    name: "dashboard",
    meta: {
      auth: true,
    },
  },
  ...AuthRoutes,
  ...SurveyRoutes,
  ...CompanyRoutes,
  ...CompanyRoutes,
  ...CompanyManagerRoutes,
  ...CompanyResponderRoutes,
  ...UserRoutes,
  {
    path: "/not-authorized",
    component: NotAuthorized,
    name: "not-authorized",
    meta: {
      layout: "fullscreen",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: "not-found",
    meta: {
      layout: "fullscreen",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
  linkActiveClass: "active text-blue-500",
});

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore();
  const { hasAnyPermission } = usePermission();
  const requiredPermissions = to.meta.requiredPermissions || [];
  const publicPages = ["login", "forgot-password", "reset-password"];

  if (to.matched.some((record) => record.meta.auth)) {
    if (!store.isAuthenticated) {
      return next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    }
  } else if (publicPages.includes(to.name)) {
    if (store.isAuthenticated) {
      return next({ name: "dashboard" });
    }
  }

  if (requiredPermissions.length && store.isAuthenticated) {
    if (!hasAnyPermission(requiredPermissions)) {
      return next({ name: "not-authorized" });
    }
  }

  next();
});

export default router;
