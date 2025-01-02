const UserRoutes = [
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user/List.vue"),
    meta: {
      auth: true,
      title: "user.list.pageTitle",
      requiredPermissions: ["READ_ALL_USERS"],
    },
  },
  {
    path: "/user/create",
    name: "user-create",
    component: () => import("@/views/user/Create.vue"),
    meta: {
      auth: true,
      title: "user.creation.pageTitle",
      requiredPermissions: ["CREATE_USER"],
    },
  },
  {
    path: "/user/edit/:id",
    name: "user-edit",
    component: () => import("@/views/user/Edit.vue"),
    meta: {
      auth: true,
      title: "user.modification.pageTitle",
      requiredPermissions: ["UPDATE_USER"],
    },
  },
  {
    path: "/user/show/:id",
    name: "user-show",
    component: () => import("@/views/user/Show.vue"),
    meta: {
      auth: true,
      title: "user.overview.pageTitle",
      requiredPermissions: ["READ_SINGLE_USER"],
    },
  },
];

export default UserRoutes;
