<template>
  <div class="bg-white rounded-lg p-3 transition-all">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <textarea
          :value="question.title"
          @input="
            $emit('update', {
              field: 'title',
              value: $event.target.value,
              questionIndex: questionIndex,
            })
          "
          rows="2"
          class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-black font-bold resize-none"
           :placeholder="t('survey.form.section.question.titlePlaceholder')"
        ></textarea>
      </div>

      <div class="flex h-12 items-center ml-4">
        <button
          type="button"
          @click="$emit('delete', questionIndex)"
          class="text-red-500 hover:bg-red-50 rounded-full transition-all hover:scale-110 h-full aspect-square flex items-center justify-center"
        >
          <font-awesome-icon :icon="['fas', 'trash']" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Question Type and Required Checkbox -->
    <div class="mt-4 flex items-center gap-4">
      <!-- Question Type -->
      <div style="flex: 0 0 250px;">
        <select
          :value="question.type"
          @change="
            $emit('update', {
              field: 'type',
              value: $event.target.value,
              questionIndex: questionIndex,
            })
          "
          class="p-2 border rounded-md bg-white w-full"
        >
          <option
            v-for="type in store.questionTypes"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label }}
          </option>
        </select>
      </div>

      <!-- Required Checkbox -->
      <div class="flex items-center">
        <input
          id="required"
          type="checkbox"
          :checked="question.required"
          @change="toggleRequired"
          class="checkbox checkbox-primary mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
        />
        <label for="required" class="text-gray-700"> {{ t('survey.form.section.question.required') }} </label>
      </div>
    </div>

    <!-- Question Content -->
    <component
      :is="questionContentComponent"
      v-if="questionContentComponent"
      :question="question"
      @update="updateQuestion"
    />
  </div>
</template>

<script setup>
import { useSurveyStore } from "@/store";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion.vue";
import RatingQuestion from "./questions/RatingQuestion.vue";
import TrueFalseQuestion from "./questions/TrueFalseQuestion.vue";
import SliderQuestion from "./questions/SliderQuestion.vue";
import RankingQuestion from "./questions/RankingQuestion.vue";

const store = useSurveyStore();

const emit = defineEmits(["update", "delete"]);

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  questionIndex: {
    type: Number,
    required: true,
  },
});

const toggleRequired = (event) => {
  emit("update", {
    field: "required",
    value: event.target.checked,
    questionIndex: props.questionIndex,
  });
};

const updateQuestion = (updatePayload) => {
  emit("update", { ...updatePayload, questionIndex: props.questionIndex });
};

const questionContentComponent = computed(() => {
  switch (props.question.type) {
    case "singleChoice":
    case "multipleChoice":
      return MultipleChoiceQuestion;
    case "rating":
      return RatingQuestion;
    case "trueFalse":
      return TrueFalseQuestion;
    case "slider":
      return SliderQuestion;
    case "ranking":
      return RankingQuestion;
    default:
      return null;
  }
});
</script>

<style scoped>
.bg-white {
  background-color: #ffffff;
}
.rounded-lg {
  border-radius: 0.5rem;
}
</style>
