<template>
  <div class="card mt-4">
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
        rows="3"
        class="w-full p-2 border rounded-lg"
        :placeholder="t('survey.form.descriptionPlaceholder')"
        aria-label="Survey Description"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { useSurveyStore } from "@/store";

const store = useSurveyStore();
const form = store.form;

// Ensure the first question exists on initialization
if (form.questions.length === 0) {
  form.questions.push({
    content: "",
    type: null,
    isRequired: true,
    options: [],
    configuration: {},
  });
}

const addQuestion = () => {
  form.questions.push({
    content: "",
    type: null,
    isRequired: false,
    options: [],
    configuration: {},
  });
};

const removeQuestion = (index) => {
  if (index > 0) {
    form.questions.splice(index, 1);
  }
};

const onTypeChange = (question, index) => {
  if (
    question.type === "MULTIPLE_CHOICE" ||
    question.type === "SINGLE_CHOICE"
  ) {
    question.options = [{ label: "" }];
  } else if (question.type === "RATING") {
    question.configuration.maxRating = 5;
  } else {
    question.options = [];
    question.configuration = {};
  }
};

const addOption = (question) => {
  question.options.push({ label: "" });
};

const removeOption = (question, index) => {
  question.options.splice(index, 1);
};
</script>
<style scoped>
input::placeholder {
  color: rgba(0, 0, 0, 0.51) !important;
  font-weight: bold !important;
}
</style>