import i18n from "@/i18n";
import { ref, watchEffect } from "vue";

export function useTableOptions(customOptions = {}) {
  const {
    perPage = 10,
    perPageDropdown = [10, 50, 100, 200],
  } = customOptions;

  const paginationOptions = ref({});
  const selectOptions = ref({});
  const searchOptions = ref({});

  // Utilisation de watchEffect pour recréer l'objet quand i18n change
  watchEffect(() => {
    paginationOptions.value = {
      enabled: true,
      perPage: perPage,
      perPageDropdown: perPageDropdown,
      nextLabel: i18n.global.t("common.datatable.pagination.next"),
      prevLabel: i18n.global.t("common.datatable.pagination.previous"),
      rowsPerPageLabel: i18n.global.t("common.datatable.pagination.rowsPerPage"),
      ofLabel: i18n.global.t("common.datatable.pagination.of"),
      pageLabel: i18n.global.t("common.datatable.pagination.page"),
      allLabel: i18n.global.t("common.datatable.pagination.all"),
    };

    selectOptions.value = {
      enabled: true,
      selectOnCheckboxOnly: true,
      selectionText: i18n.global.t("common.datatable.selection.selectionText"),
      clearSelectionText: i18n.global.t("common.datatable.selection.clearSelectionText"),
      disableSelectInfo: true,
    };

    searchOptions.value = {
      enabled: true,
      placeholder: i18n.global.t("common.datatable.search.placeholder"),
      trigger: "enter",
    };
  });

  return {
    paginationOptions,
    selectOptions,
    searchOptions,
  };
}
