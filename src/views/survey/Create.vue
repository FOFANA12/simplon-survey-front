<template>
  <div>
    <BreadcrumbNavigation
      :breadcrumbs="breadcrumbs"
      :pageTitle="t('survey.creation.breadTitle')"
    />

    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="flex justify-end mt-4">
        <router-link
          :to="{ name: 'survey' }"
          class="bg-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-400 flex items-center sm:px-4 mr-4"
        >
          {{ t("survey.btnList") }}
        </router-link>

        <LoadingButton
          :busy="form.busy"
          customClass="min-w-[100px] bg-blue-500 text-white py-2 px-3 hover:bg-blue-600 transition-all"
        >
          <template #default>{{ t("common.buttons.create") }}</template>
          <template #loading>{{ t("common.buttons.processing") }}</template>
        </LoadingButton>
      </div>

      <div class="mt-4">
        <FormBuilder />
      </div>
    </form>
  </div>
</template>

<script setup>
import FormBuilder from "./components/form/FormBuilder.vue";
import { useSurveyStore } from "@/store";
import { useSwalAlerte } from "@/composables/useSwalAlerte";

const store = useSurveyStore();
const { showSimpleAlerte } = useSwalAlerte();
const router = useRouter();

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
    title: "survey.creation.breadActive",
    disabled: true,
    to: {
      name: "survey-create",
    },
  },
];

const form = store.form;
form.reset();
form.clear();

// store.requirements();

const onSubmit = () => {
  store
    .create()
    .then((resp) => {
      form.reset();
      showSimpleAlerte({ icon: "success", text: resp.data.message });
      router.push({
        name: "survey",
      });
    })
    .catch(() => {});
};
</script>
