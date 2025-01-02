<template>
  <div>
    <BreadcrumbNavigation
      :breadcrumbs="breadcrumbs"
      :pageTitle="t('user.overview.breadTitle')"
    />

    <div class="flex justify-end mt-4">
      <router-link
        :to="{ name: 'user' }"
        class="bg-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-400 flex items-center sm:px-4 mr-4"
      >
        {{ t("user.btnList") }}
      </router-link>

      <router-link
        :to="{ name: 'user-edit', params: { id: route.params.id } }"
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
import { useUserStore } from "@/store";
const store = useUserStore();
const route = useRoute();

const breadcrumbs = [
  {
    title: "sidebar.dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "sidebar.users",
    disabled: true,
    to: null,
  },
  {
    title: "user.overview.breadActive",
    disabled: true,
    to: {
      name: "user-show",
    },
  },
];

const form = store.form;
form.reset();
form.clear();

store.find(route.params.id, { mode: "show" });
</script>
