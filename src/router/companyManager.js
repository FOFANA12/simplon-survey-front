const ManagerRoutes = [
  {
    path: "/surveyor",
    name: "company-manager",
    component: () => import("@/views/company-manager/List.vue"),
    meta: {
      auth: true,
      title: "companyManager.list.pageTitle",
      requiredPermissions: ["READ_ALL_USERS"],
    },
  },
  {
    path: "/surveyor/create",
    name: "company-manager-create",
    component: () => import("@/views/company-manager/Create.vue"),
    meta: {
      auth: true,
      title: "companyManager.creation.pageTitle",
      requiredPermissions: ["CREATE_USER"],
    },
  },
  {
    path: "/surveyor/edit/:id",
    name: "company-manager-edit",
    component: () => import("@/views/company-manager/Edit.vue"),
    meta: {
      auth: true,
      title: "companyManager.modification.pageTitle",
      requiredPermissions: ["UPDATE_USER"],
    },
  },
  {
    path: "/surveyor/show/:id",
    name: "company-manager-show",
    component: () => import("@/views/company-manager/Show.vue"),
    meta: {
      auth: true,
      title: "companyManager.overview.pageTitle",
      requiredPermissions: ["READ_SINGLE_USER"],
    },
  },
];

export default ManagerRoutes;
