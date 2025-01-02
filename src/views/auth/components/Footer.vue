<template>
  <div
    class="mt-4 flex items-center justify-between text-gray-600 max-w-sm w-full mx-auto pb-8 lg:justify-start"
  >
    <!-- "Powered by Simplon" (visible uniquement sur petits écrans) -->
    <div class="text-xs text-primary block lg:hidden">
      <a href="https://simplon.sn" target="_blank">Powered by Simplon</a>
    </div>

    <!-- Sélecteur de langue -->
    <div class="ml-auto lg:ml-0">
      <select
        v-model="locale"
        @change="changeLanguage(locale)"
        class="p-1 border rounded-lg bg-white focus:outline-none focus:ring-0"
        aria-label="Select Language"
      >
        <option
          v-for="language in languageStore.languages"
          :value="language.code"
          :key="language.code"
        >
          {{ t(`navbar.languages.${language.code}`) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { appName } from "@/config/appConfig";
import { useLanguageStore } from "@/store";
import { useLanguage } from "@/composables/useLanguage";

const languageStore = useLanguageStore();
const { locale, changeLanguage } = useLanguage();
</script>

<style scoped>
</style>
