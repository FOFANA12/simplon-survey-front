<template>
  <div
    class="bg-transsparent border border-gray-200 border-l-4 border-l-blue-600 rounded-lg p-6 transition-all hover:shadow-sm"
  >
    <div class="bg-white -mx-6 -mt-6 p-6 border-b mb-4">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <input
            id="title"
            :value="section.title"
            @input="
              $emit('update', {
                field: 'title',
                value: $event.target.value,
                sectionIndex: sectionIndex,
              })
            "
            type="text"
            class="w-full text-2xl font-bold h-12 px-3 py-2 border rounded-lg placeholder-black placeholder-font-bold"
            :placeholder="t('survey.form.section.titlePlaceholder')"
            aria-label="Section Title"
          />
        </div>
        <div class="flex h-12 items-center ml-4">
          <button
            type="button"
            @click="$emit('delete', sectionIndex)"
            class="text-red-500 hover:bg-red-50 rounded-full transition-all hover:scale-110 h-full aspect-square flex items-center justify-center"
          >
            <font-awesome-icon :icon="['fas', 'trash']" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <QuestionEditor
        v-for="(question, questionIndex) in sectionQuestions"
        :key="questionIndex"
        :question="question"
        :questionIndex="questionIndex"
        @update="updateQuestionField"
        @delete="deleteQuestion"
      />
    </div>

    <button
      type="button"
      @click="addQuestion"
      class="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
    >
      <font-awesome-icon :icon="['fas', 'plus']" />
      {{ t("survey.btnAddQuestionToSection") }}
    </button>
  </div>
</template>

<script setup>
import QuestionEditor from "./QuestionEditor.vue";
import { useSurveyStore } from "@/store";
const store = useSurveyStore();
const form = store.form;

const emit = defineEmits(["update", "delete"]);

const sectionQuestions = computed(() => props.section.questions);

// Define props
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
  sectionIndex: {
    type: Number,
    required: true,
  },
});

const addQuestion = () => {
  form.sections[props.sectionIndex].questions.push({
    type: "shortAnswer",
    title: null,
    required: false,
    maxRating: 5,
    trueLabel: null,
    falseLabel: null,
    sliderMin: null,
    sliderMax: null,
    options: [],
  });
};

const updateQuestionField = ({ questionIndex, field, value }) => {
  if (questionIndex !== -1) {
    form.sections[props.sectionIndex].questions[questionIndex][field] = value;
  }
};

const deleteQuestion = (questionIndex) => {
  form.sections[props.sectionIndex].questions.splice(questionIndex, 1);
};
</script>
<style scoped>
</style>
