import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Profile from "@/views/auth/Profile.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";

export default [
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "fullscreen",
      title: "register.pageTitle",
    },
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "auth",
      title: "login.pageTitle",
    },
    component: Login,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    meta: {
      layout: "auth",
      title: "forgotPassword.pageTitle",
    },
    component: ForgotPassword,
  },
  {
    path: "/reset-password/:token/:email",
    name: "reset-password",
    meta: {
      layout: "auth",
      title: "resetPassword.pageTitle",
    },
    component: ResetPassword,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      auth: true,
      title: "profile.pageTitle",
    },
  },
];
