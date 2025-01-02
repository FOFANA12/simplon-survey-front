<template>
  <div class="overflow-x-auto">
    <vue-good-table
      mode="remote"
      :total-rows="store.totalRecords"
      :pagination-options="paginationOptions"
      :search-options="searchOptions"
      :select-options="
        hasPermission(permissions.ACCESS_SETTINGS) ? selectOptions : {}
      "
      :columns="translatedColumns"
      :rows="rows"
      styleClass="vgt-table bordered striped condensed"
      @selected-rows-change="store.onRowSelectionChange"
      compactMode
      @page-change="store.onPageChange"
      @sort-change="store.onSortChange"
      @per-page-change="store.onPerPageChange"
      @search="store.onSearch"
    >
      <template #table-row="props">
        <!-- Action buttons (Edit, Delete) -->
        <span v-if="props.column.field === 'id'" class="flex justify-center">
          <router-link
            :to="{
              name: 'user-show',
              params: { id: props.row.id },
            }"
            class="text-blue-500 mr-3"
          >
            <font-awesome-icon :icon="['fas', 'eye']" />
          </router-link>
          <router-link
            :to="{
              name: 'user-edit',
              params: { id: props.row.id },
            }"
            class="text-primary-500 mr-3"
          >
            <font-awesome-icon :icon="['fas', 'edit']" />
          </router-link>

          <button @click="onDelete(props.row.id)" class="text-red-500 mr-3">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </span>

        <span v-else-if="props.column.field === 'status'">
          <div class="flex justify-center">
            <span
              :class="{
                'badge badge-success text-white p-3': props.row.status === true,
                'badge badge-error text-white p-3': props.row.status === false,
              }"
            >
              {{
                props.row.status
                  ? t("common.table.status.active")
                  : t("common.table.status.inactive")
              }}
            </span>
          </div>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTableOptions } from "@/composables/useTableOptions";
import { useUserStore } from "@/store";
import { useI18n } from "vue-i18n";
import { usePermission } from "@/composables/usePermission";
import permissions from "@/composables/permissions";
const { hasPermission } = usePermission();
const emit = defineEmits(["edit", "view", "delete"]);

// Accessing store and i18n
const { t } = useI18n();
const store = useUserStore();
const { paginationOptions, selectOptions, searchOptions } = useTableOptions({
  perPage: store.perPage,
  perPageDropdown: store.perPageDropdown,
});

// Translate columns for the table
const translatedColumns = computed(() => {
  return store.columns.map((column) => ({
    ...column,
    label: t(column.label),
  }));
});

const rows = computed(() => store.rows);

const onDelete = (id) => {
  emit("delete", [id]);
};

// Load table data
store.loadItems({ clearSearch: true });
</script>
