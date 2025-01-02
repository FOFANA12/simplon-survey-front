<template>
  <div>
    <BreadcrumbNavigation
      :breadcrumbs="breadcrumbs"
      :pageTitle="t('company.overview.breadTitle')"
    />

    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="flex justify-end mt-4">
        <router-link
          :to="{ name: 'company' }"
          class="bg-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-400 flex items-center sm:px-4 mr-4"
        >
          {{ t("company.btnList") }}
        </router-link>

        <router-link
          :to="{ name: 'company-edit', params: { id: route.params.id } }"
          class="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 flex items-center sm:px-4"
        >
          <font-awesome-icon :icon="['fas', 'edit']" class="mr-1" />
          {{ t("common.edit") }}
        </router-link>

        <router-link
          :to="{ name: 'company-create' }"
          class="ml-4 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 flex items-center sm:px-4"
        >
          <font-awesome-icon :icon="['fas', 'plus']" class="mr-1" />
          {{ t("company.btnAdd") }}
        </router-link>
      </div>

      <div class="mt-4">
        <Form show />
      </div>
    </form>
  </div>
</template>

<script setup>
import Form from "./components/form/Show.vue";
import { useCompanyStore } from "@/store";
import { useSwalAlerte } from "@/composables/useSwalAlerte";
const store = useCompanyStore();
const { showSimpleAlerte } = useSwalAlerte();
const route = useRoute();

const breadcrumbs = [
  {
    title: "sidebar.dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "sidebar.companies",
    disabled: true,
    to: null,
  },
  {
    title: "company.overview.breadActive",
    disabled: true,
    to: {
      name: "company-edit",
    },
  },
];

const form = store.form;
form.reset();
form.clear();

store.find(route.params.id, { mode: "show" });

const onSubmit = () => {
  store
    .update()
    .then((resp) => {
      showSimpleAlerte({ icon: "success", text: resp.data.message });
    })
    .catch(() => {});
};
</script>
