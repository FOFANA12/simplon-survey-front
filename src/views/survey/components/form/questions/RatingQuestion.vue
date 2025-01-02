<template>
  <div class="space-y-2 mt-4">
    <div class="flex items-center gap-4">
      <label class="text-sm text-gray-600">{{ `${t('survey.form.section.question.maxRating')} : ` }}</label>
      <select
        :value="question.maxRating || 5"
        @change="updateMaxRating"
        class="p-1 border rounded"
      >
        <option
          v-for="num in [3, 4, 5, 6, 7, 8, 9, 10]"
          :key="num"
          :value="num"
        >
          {{ `${num} ${t('survey.form.section.question.labelStars')}` }}
        </option>
      </select>
    </div>
    <div class="flex gap-1">
      <div
        v-for="index in question.maxRating || 5"
        :key="index"
        class="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full"
      >
        <font-awesome-icon
          :icon="['fas', 'star']"
          class="text-yellow-500 w-4 h-4"
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

const updateMaxRating = (event) => {
  emit("update", { field: "maxRating", value: Number(event.target.value) });
};
</script>
