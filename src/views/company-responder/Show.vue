<template>
  <div>
    <BreadcrumbNavigation
      :breadcrumbs="breadcrumbs"
      :pageTitle="t('companyResponder.overview.breadTitle')"
    />

    <div class="flex justify-end mt-4">
      <router-link
        :to="{ name: 'company-responder' }"
        class="bg-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-400 flex items-center sm:px-4 mr-4"
      >
        {{ t("companyResponder.btnList") }}
      </router-link>

      <router-link
        :to="{ name: 'company-responder-edit', params: { id: route.params.id } }"
        class="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 flex items-center sm:px-4"
      >
        <font-awesome-icon :icon="['fas', 'edit']" class="mr-1" />
        {{ t("common.edit") }}
      </router-link>
    </div>

    <div class="mt-4">
      <Form show />
    </div>
  </div>
</template>

<script setup>
import Form from "./components/form/Show.vue";
import { useCompanyResponderStore } from "@/store";
const store = useCompanyResponderStore();
const route = useRoute();

const breadcrumbs = [
  {
    title: "sidebar.dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "sidebar.respondents",
    disabled: true,
    to: null,
  },
  {
    title: "companyResponder.overview.breadActive",
    disabled: true,
    to: {
      name: "company-responder-show",
    },
  },
];

const form = store.form;
form.reset();
form.clear();

store.find(route.params.id, { mode: "show" });
</script>
