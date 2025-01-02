<template>
  <div>
    <BreadcrumbNavigation
      :breadcrumbs="breadcrumbs"
      :pageTitle="t('survey.overview.breadTitle')"
    />

    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="flex justify-end mt-4">
        <router-link
          :to="{ name: 'survey' }"
          class="bg-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-400 flex items-center sm:px-4 mr-4"
        >
          {{ t("survey.btnList") }}
        </router-link>

        <router-link
          :to="{ name: 'survey-edit', params: { id: route.params.id } }"
          class="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 flex items-center sm:px-4"
        >
          <font-awesome-icon :icon="['fas', 'edit']" class="mr-1" />
          {{ t("common.edit") }}
        </router-link>

        <router-link
          :to="{ name: 'survey-create' }"
          class="ml-4 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 flex items-center sm:px-4"
        >
          <font-awesome-icon :icon="['fas', 'plus']" class="mr-1" />
          {{ t("survey.btnAdd") }}
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
import { useSurveyStore } from "@/store";
import { useSwalAlerte } from "@/composables/useSwalAlerte";
const store = useSurveyStore();
const { showSimpleAlerte } = useSwalAlerte();
const route = useRoute();

const breadcrumbs = [
  {
    title: "sidebar.dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "sidebar.surveys",
    disabled: true,
    to: null,
  },
  {
    title: "survey.overview.breadActive",
    disabled: true,
    to: {
      name: "survey-edit",
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
