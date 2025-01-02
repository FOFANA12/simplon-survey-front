<template>
  <div class="space-y-2 mt-4">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-col gap-2 md:w-6/12">
        <label for="true-label" class="text-sm text-gray-600"
          >{{ t('survey.form.section.question.trueLabel') }}</label
        >
        <input
          id="true-label"
          type="text"
          :value="question.trueLabel || ''"
          @input="updateLabel('trueLabel', $event.target.value)"
          class="w-full p-2 px-3 border rounded-lg"
          :placeholder="t('survey.form.section.question.trueLabelPlaceholder')"
        />
      </div>

      <div class="flex flex-col gap-2 md:w-6/12">
        <label for="false-label" class="text-sm text-gray-600"
          >{{ t('survey.form.section.question.falseLabel') }}</label
        >
        <input
          id="false-label"
          type="text"
          :value="question.falseLabel || ''"
          @input="updateLabel('falseLabel', $event.target.value)"
          class="w-full p-2 px-3 border rounded-lg"
           :placeholder="t('survey.form.section.question.falseLabelPlaceholder')"
            placeholder="Enter label for False"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update"]);

const updateLabel = (field, value) => {
  emit("update", { field, value });
};
</script>
