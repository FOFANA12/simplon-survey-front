const CompanyRoutes = [
  {
    path: "/company",
    name: "company",
    component: () => import("@/views/company/List.vue"),
    meta: {
      auth: true,
      title: "company.list.pageTitle",
    },
  },
  {
    path: "/company/create",
    name: "company-create",
    component: () => import("@/views/company/Create.vue"),
    meta: {
      auth: true,
      title: "company.creation.pageTitle",
    },
  },
  {
    path: "/company/edit/:id",
    name: "company-edit",
    component: () => import("@/views/company/Edit.vue"),
    meta: {
      auth: true,
      title: "company.modification.pageTitle",
    },
  },
  {
    path: "/company/show/:id",
    name: "company-show",
    component: () => import("@/views/company/Show.vue"),
    meta: {
      auth: true,
      title: "company.overview.pageTitle",
    },
  },
];

export default CompanyRoutes;
