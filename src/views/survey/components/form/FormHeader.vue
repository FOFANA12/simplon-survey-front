<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <input
      id="title"
      v-model="form.title"
      type="text"
      class="w-full text-3xl font-bold mb-4 px-3 py-3 border rounded-lg placeholder-black placeholder-font-bold"
      :placeholder="t('survey.form.titlePlaceholder')"
      aria-label="Survey Title"
    />

    <textarea
      id="description"
      v-model="form.description"
      rows="3"
      class="w-full p-2 border rounded-lg"
      :placeholder="t('survey.form.descriptionPlaceholder')"
      aria-label="Survey Description"
    ></textarea>
  </div>
</template>

<script setup>
import { useSurveyStore } from "@/store";
const store = useSurveyStore();
const form = store.form;

</script>
<style scoped>
input::placeholder {
  color: rgba(0, 0, 0, 0.51) !important;
  font-weight: bold !important;
}
</style>