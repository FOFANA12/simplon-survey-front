<template>
  <div class="space-y-2 mt-4">
    <label for="slider" class="text-sm text-gray-600">{{
      `${t("survey.form.section.question.slider.label")} : `
    }}</label>
    <div class="flex items-center gap-2">
      <input
        id="slider-min"
        type="number"
        :value="question.min || 0"
        @input="updateField('sliderMin', $event.target.value)"
        class="w-50 p-2 border rounded"
        :placeholder="t('survey.form.section.question.slider.minPlaceholder')"
      />
      <span>{{ t('survey.form.section.question.slider.to') }}</span>
      <input
        id="slider-max"
        type="number"
        :value="question.max || 100"
        @input="updateField('sliderMax', $event.target.value)"
        class="w-50 p-2 border rounded"
        :placeholder="t('survey.form.section.question.slider.maxPlaceholder')"
      />
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

const updateField = (field, value) => {
  emit("update", { field, value: Number(value) });
};
</script>