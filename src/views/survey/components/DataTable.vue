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
        <span v-if="props.column.field === 'id'" class="flex justify-center">
          <router-link
            :to="{
              name: 'survey-show',
              params: { id: props.row.id },
            }"
            class="text-blue-500 mr-3"
          >
            <font-awesome-icon :icon="['fas', 'eye']" />
          </router-link>
          <router-link
            :to="{
              name: 'survey-edit',
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

        <span v-else-if="props.column.field === 'state'">
          <span class="flex items-center space-x-2">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                :style="{ color: props.row.state.color }"
                class="w-4 h-4"
              />
              <span>{{ props.row.state.name }}</span>
            </span>
        </span>

        <span v-else-if="props.column.field === 'status'">
          <span class="flex items-center space-x-2">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                :style="{ color: props.row.status.color }"
                class="w-4 h-4"
              />
              <span>{{ props.row.status.name }}</span>
            </span>
        </span>

        <span v-else>
          {{ props.row[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTableOptions } from "@/composables/useTableOptions";
import { useSurveyStore } from "@/store";
import { useI18n } from "vue-i18n";
import { usePermission } from "@/composables/usePermission";
import permissions from "@/composables/permissions";

const { hasPermission } = usePermission();
const emit = defineEmits(["delete"]);

const { t } = useI18n();
const store = useSurveyStore();
const { paginationOptions, selectOptions, searchOptions } = useTableOptions({
  perPage: store.perPage,
  perPageDropdown: store.perPageDropdown,
});

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

onMounted(async () => {
  await store.loadItems({ clearSearch: true });
});
</script>
