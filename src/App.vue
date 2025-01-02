<template>
  <component :is="resolveLayout">
    <router-view :key="route.fullPath" />
  </component>
  <teleport to="body">
    <Loading
      v-model:active="loaderStore.isLoading"
      :can-cancel="false"
      :is-full-page="loaderStore.fullPage"
      :color="loaderStore.color"
      :width="loaderStore.width"
      :height="loaderStore.height"
    />
  </teleport>
</template>

<script setup>
import { useGlobalLoaderStore } from "@/store";
import { appName } from "@/config/appConfig";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const route = useRoute();
const mainLayout = "main";
const loaderStore = useGlobalLoaderStore();

const resolveLayout = computed(() => {
  return `${route.meta.layout || mainLayout}-layout`;
});

useHead({
  title: computed(() => {
    const pageTitle = route.meta.title ? t(route.meta.title) : route.meta.title;
    return pageTitle ? ` ${pageTitle} | ${appName}` : appName;
  }),
});
</script>