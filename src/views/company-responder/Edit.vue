<template>
  <div>
    <BreadcrumbNavigation
      :breadcrumbs="breadcrumbs"
      :pageTitle="t('companyResponder.modification.breadTitle')"
    />

    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="flex justify-end mt-4">
        <router-link
          :to="{ name: 'company-manager' }"
          class="bg-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-400 flex items-center sm:px-4 mr-4"
        >
          {{ t("companyResponder.btnList") }}
        </router-link>

        <router-link
          :to="{
            name: 'company-responder-show',
            params: { id: route.params.id },
          }"
          class="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 flex items-center sm:px-4 mr-4"
        >
          <font-awesome-icon :icon="['fas', 'eye']" class="mr-1" />
          {{ t("common.overview") }}
        </router-link>

        <LoadingButton
          :busy="form.busy"
          customClass="min-w-[100px] bg-blue-500 text-white py-2 px-3 hover:bg-blue-600 transition-all"
        >
          <template #default>{{ t("common.buttons.save") }}</template>
          <template #loading>{{ t("common.buttons.processing") }}</template>
        </LoadingButton>
      </div>

      <div class="mt-4">
        <Form edit />
      </div>
    </form>
  </div>
</template>

<script setup>
import Form from "./components/form/Edit.vue";
import { useCompanyResponderStore } from "@/store";
import { useSwalAlerte } from "@/composables/useSwalAlerte";

const store = useCompanyResponderStore();
const { showSimpleAlerte } = useSwalAlerte();
const router = useRouter();
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
    title: "companyResponder.modification.breadActive",
    disabled: true,
    to: {
      name: "company-responder-edit",
    },
  },
];

const form = store.form;
form.reset();
form.clear();

store.find(route.params.id, { mode: "edit" });

const onSubmit = () => {
  store
    .update()
    .then((resp) => {
      showSimpleAlerte({ icon: "success", text: resp.data.message });
    })
    .catch(() => {});
};
</script>
