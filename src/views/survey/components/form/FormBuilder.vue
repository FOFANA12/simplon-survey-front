<template>
  <div class="space-y-6">
    <div class="card mt-4">
      <FormHeader />

      <!-- Sections -->
      <FormSection
        v-for="(section, sectionIndex) in form.sections"
        :key="sectionIndex"
        :section="section"
        :sectionIndex="sectionIndex"
        @delete="deleteSection"
        @update="updateSectionField"
        :class="{ 'mb-7': sectionIndex < form.sections.length - 1 }"
      />
    </div>
    <div class="flex justify-end">
      <button
        type="button"
        @click="addSection"
        class="border border-blue-600 text-blue-600 rounded-full py-2 px-4 flex items-center justify-center hover:bg-blue-100 hover:text-blue-700 transition-all"
      >
        <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
        {{ t("survey.btnAddSection") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import FormHeader from "./FormHeader.vue";
import FormSection from "./FormSection.vue";
import { useSurveyStore } from "@/store";
const store = useSurveyStore();
const form = store.form;

const addSection = () => {
  form.sections.push({
    title: "",
    description: "",
    questions: [],
  });
};

const updateSectionField = ({ sectionIndex, field, value }) => {
  if (sectionIndex !== -1) {
    form.sections[sectionIndex][field] = value;
  }
};

const deleteSection = (sectionIndex) => {
  form.sections.splice(sectionIndex, 1);
};
</script>
<style scoped>
</style>