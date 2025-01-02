const ResponderRoutes = [
  {
    path: "/respondent",
    name: "company-responder",
    component: () => import("@/views/company-responder/List.vue"),
    meta: {
      auth: true,
      title: "companyResponder.list.pageTitle",
      requiredPermissions: ["READ_ALL_USERS"],
    },
  },
  {
    path: "/respondent/create",
    name: "company-responder-create",
    component: () => import("@/views/company-responder/Create.vue"),
    meta: {
      auth: true,
      title: "companyResponder.creation.pageTitle",
      requiredPermissions: ["CREATE_USER"],
    },
  },
  {
    path: "/respondent/edit/:id",
    name: "company-responder-edit",
    component: () => import("@/views/company-responder/Edit.vue"),
    meta: {
      auth: true,
      title: "companyResponder.modification.pageTitle",
      requiredPermissions: ["UPDATE_USER"],
    },
  },
  {
    path: "/respondent/show/:id",
    name: "company-responder-show",
    component: () => import("@/views/company-responder/Show.vue"),
    meta: {
      auth: true,
      title: "companyResponder.overview.pageTitle",
      requiredPermissions: ["READ_SINGLE_USER"],
    },
  },
];

export default ResponderRoutes;
