const SurveyRoutes = [
  {
    path: "/survey",
    name: "survey",
    component: () => import("@/views/survey/List.vue"),
    meta: {
      auth: true,
      title: "survey.list.pageTitle",
    },
  },
  {
    path: "/survey/create",
    name: "survey-create",
    component: () => import("@/views/survey/Create.vue"),
    meta: {
      auth: true,
      title: "survey.creation.pageTitle",
    },
  },
  {
    path: "/survey/edit/:id",
    name: "survey-edit",
    component: () => import("@/views/survey/Edit.vue"),
    meta: {
      auth: true,
      title: "survey.modification.pageTitle",
    },
  },
  {
    path: "/survey/show/:id",
    name: "survey-show",
    component: () => import("@/views/survey/Show.vue"),
    meta: {
      auth: true,
      title: "survey.overview.pageTitle",
    },
  },
];

export default SurveyRoutes;
