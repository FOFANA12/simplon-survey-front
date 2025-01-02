<template>
  <div>
    <BreadcrumbNavigation
      :breadcrumbs="breadcrumbs"
      :pageTitle="t('survey.list.breadTitle')"
    />

    <div class="flex justify-end space-x-2 mt-4">
      <button
        v-if="store.selectedRows.length > 0"
        @click="() => deleteRows(store.selectedRows)"
        class="border border-red-500 text-red-500 py-2 px-3 rounded-lg hover:bg-red-500 hover:text-white flex items-center sm:text-xs sm:px-2 mr-3"
      >
        <font-awesome-icon :icon="['fas', 'trash']" class="mr-1" />
        {{ t("common.buttons.delete") }} ({{ store.selectedRows.length }})
      </button>

      <router-link
        :to="{ name: 'survey-create' }"
        class="ml-4 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 flex items-center sm:px-4"
      >
        <font-awesome-icon :icon="['fas', 'plus']" class="mr-1" />
        {{ t("survey.btnAdd") }}
      </router-link>
    </div>

    <DataTable class="mt-4" @delete="deleteRows" />
  </div>
</template>

<script setup>
import DataTable from "./components/DataTable.vue";
import { useSurveyStore } from "@/store";
import { useSwalAlerte } from "@/composables/useSwalAlerte";
import { useI18n } from "vue-i18n";

const store = useSurveyStore();
const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();
const { t } = useI18n();

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
    title: "survey.list.breadActive",
    disabled: true,
    to: {
      name: "survey",
    },
  },
];

const deleteRows = async (ids) => {
  const isMultiple = Array.isArray(ids) && ids.length > 1;
  const confirmationMessage = isMultiple
    ? t("common.sweetalert.actions.confirmDeleteSelected")
    : t("common.sweetalert.actions.confirmDelete");

  const result = await showConfirm({
    message: confirmationMessage,
  });

  if (result.isConfirmed) {
    try {
      const resp = await store.delete(ids);
      showSimpleAlerte({ icon: "success", text: resp.data.message });
      store.selectedRows = [];
      store.loadItems();
    } catch (error) {
      showErrorModal({
        title: t("common.errors.serverErrorTitle"),
        message:
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : t("common.errors.defaultErrorMessage"),
      });
    }
  }
};
</script>
