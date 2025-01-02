<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white shadow-sm rounded-lg">
      <div class="card-body p-4">
        <div class="col-span-12 grid grid-cols-12 gap-4">
          <!-- Survey Title -->
          <div class="col-span-12 mb-4">
            <label for="title" class="block text-gray-700 mb-1">
              {{ t("survey.form.title") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.titlePlaceholder')"
              aria-label="Survey Title"
            />
            <HasError :form="form" field="title" class="text-red-500 text-xs" />
          </div>

          <!-- Survey Description -->
          <div class="col-span-12 mb-4">
            <label for="description" class="block text-gray-700 mb-1">
              {{ t("survey.form.description") }}
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="5"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.descriptionPlaceholder')"
              aria-label="Survey Description"
            ></textarea>
            <HasError
              :form="form"
              field="description"
              class="text-red-500 text-xs"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Questions Section -->
    <div
      class="w-full mx-auto bg-white shadow-sm rounded-lg mt-6"
      v-for="(question, index) in form.questions"
      :key="index"
    >
      <div class="card-body p-4">
        <div class="col-span-12 grid grid-cols-12 gap-4">
          <!-- Question Content -->
          <div class="col-span-12 mb-4">
            <label
              :for="`question-content-${index}`"
              class="block text-gray-700 mb-1"
            >
              {{ t("survey.form.question") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <textarea
              :id="`question-content-${index}`"
              v-model="question.content"
              rows="3"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.questionPlaceholder')"
              aria-label="Question Content"
            ></textarea>
            <HasError
              :form="form"
              :field="`questions.${index}.content`"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- Question Type -->
          <div class="col-span-12 md:col-span-6 mb-4">
            <label
              :for="`question-type-${index}`"
              class="block text-gray-700 mb-1"
            >
              {{ t("survey.form.type") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <v-select
              :id="`question-type-${index}`"
              v-model="question.type"
              :options="store.questionTypes"
              label="name"
              :reduce="(q) => q.code"
              class="w-full"
              :placeholder="t('survey.form.typePlaceholder')"
              aria-label="Question Type"
              @update:modelValue="onTypeChange(question, index)"
            />
            <HasError
              :form="form"
              :field="`questions.${index}.type`"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- Dynamic Fields Based on Question Type -->
          <template
            v-if="
              question.type === 'MULTIPLE_CHOICE' ||
              question.type === 'SINGLE_CHOICE'
            "
          >
            <!-- Options Management -->
            <div class="col-span-12 mb-4">
              <label
                :for="`question-options-${index}`"
                class="block text-gray-700 mb-1"
              >
                {{ t("survey.form.options") }}
              </label>
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="flex items-center gap-2 mb-2"
              >
                <input
                  type="text"
                  v-model="option.label"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('survey.form.optionPlaceholder')"
                  :aria-label="`Option ${optIndex + 1}`"
                />
                <button
                  type="button"
                  class="text-red-500 hover:underline text-sm"
                  @click="removeOption(question, optIndex)"
                >
                  {{ t("survey.form.removeOption") }}
                </button>
              </div>
              <button
                type="button"
                class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
                @click="addOption(question)"
              >
                {{ t("survey.form.addOption") }}
              </button>
            </div>
          </template>

          <template v-if="question.type === 'RATING'">
            <!-- Rating Configuration -->
            <div class="col-span-12 md:col-span-6 mb-4">
              <label
                :for="`max-rating-${index}`"
                class="block text-gray-700 mb-1"
              >
                {{ t("survey.form.maxRating") }}
                <span class="text-red-500 text-md">*</span>
              </label>
              <input
                :id="`max-rating-${index}`"
                v-model="question.configuration.maxRating"
                type="number"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('survey.form.maxRatingPlaceholder')"
                aria-label="Maximum Rating"
              />
            </div>
          </template>

          <!-- Is Required Checkbox -->
          <div
            class="col-span-12 md:col-span-6 lg:col-span-4 flex items-center mb-4"
          >
            <input
              :id="`is-required-${index}`"
              type="checkbox"
              v-model="question.isRequired"
              class="checkbox checkbox-primary mr-2"
              aria-label="Is Required"
            />
            <label :for="`is-required-${index}`" class="text-gray-700">
              {{ t("survey.form.isRequired") }}
            </label>
          </div>
        </div>

        <!-- Remove Question Button -->
        <div class="col-span-12 flex justify-end">
          <button
            v-if="index > 0"
            type="button"
            class="text-red-500 hover:underline text-sm"
            @click="removeQuestion(index)"
          >
            {{ t("survey.form.removeQuestion") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add Question Button -->
    <div class="mt-6 text-right">
      <button
        type="button"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        @click="addQuestion"
      >
        {{ t("survey.form.addQuestion") }}
      </button>
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
