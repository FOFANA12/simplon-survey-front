<template>
  <div>
    <BreadcrumbNavigation
      :breadcrumbs="breadcrumbs"
      :pageTitle="t('company.creation.breadTitle')"
    />

    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="flex justify-end mt-4">
        <router-link
          :to="{ name: 'company' }"
          class="bg-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-400 flex items-center sm:px-4 mr-4"
        >
          {{ t("company.btnList") }}
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
        <Form />
      </div>
    </form>
  </div>
</template>

<script setup>
import Form from "./components/form/Edit.vue";
import { useCompanyStore } from "@/store";
import { useSwalAlerte } from "@/composables/useSwalAlerte";

const store = useCompanyStore();
const { showSimpleAlerte } = useSwalAlerte();
const router = useRouter();

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
    title: "company.creation.breadActive",
    disabled: true,
    to: {
      name: "company-create",
    },
  },
];

const form = store.form;
form.reset();
form.clear();

const onSubmit = () => {
  store
    .create()
    .then((resp) => {
      form.reset();
      showSimpleAlerte({ icon: "success", text: resp.data.message });
      router.push({
        name: "company",
      });
    })
    .catch(() => {});
};
</script>
