<template>
  <div class="card bg-white p-4 flex flex-col mt-2">
    <h1 v-if="pageTitle" class="text-gray-600 text-xl font-semibold">
      {{ pageTitle }}
    </h1>
    <nav class="breadcrumbs text-sm p-0 pt-1">
      <ul>
        <li v-for="(breadcrumb, index) in translatedBreadcrumbs" :key="index">
          <router-link v-if="!breadcrumb.disabled" :to="breadcrumb.to">
            {{ breadcrumb.title }}
          </router-link>
          <span v-else>
            {{ breadcrumb.title }}
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
  },
  pageTitle: {
    type: String,
    required: false,
    default: null,
  },
});

const translatedBreadcrumbs = computed(() => {
  return props.breadcrumbs.map((breadcrumb) => ({
    title: t(breadcrumb.title),
    disabled: breadcrumb.disabled,
    to: breadcrumb.to,
  }));
});
</script>
