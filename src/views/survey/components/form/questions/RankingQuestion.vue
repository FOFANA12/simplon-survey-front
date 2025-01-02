<template>
  <div class="space-y-2 mt-4">
    <div
      v-for="(option, index) in question.options"
      :key="index"
      class="flex items-center mb-2 group"
    >
      <input
        type="text"
        :value="option"
        @input="updateOption(index, $event.target.value)"
        class="w-full p-2 px-3 border rounded-lg"
        :placeholder="
          t('survey.form.section.question.option.placeholder', {
            index: index + 1,
          })
        "
      />
      <button
        type="button"
        @click="removeOption(index)"
        class="ml-2 text-red-500 hover:bg-red-50 rounded-full transition-all hover:scale-110 h-full aspect-square flex items-center justify-center"
      >
        <font-awesome-icon :icon="['fas', 'trash']" class="w-4 h-4" />
      </button>
    </div>
    <button
      type="button"
      @click="addOption"
      class="text-blue-600 hover:text-blue-700 text-sm mt-2 transition-colors"
    >
      {{ t("survey.btnAddOptionToQuestion") }}
    </button>
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

const updateOption = (index, value) => {
  const newOptions = [...(props.question.options || [])];
  newOptions[index] = value;
  emit("update", { field: "options", value: newOptions });
};

const addOption = () => {
  const newOptions = [...(props.question.options || []), ""];
  emit("update", { field: "options", value: newOptions });
};

const removeOption = (index) => {
  const newOptions = props.question.options.filter((_, i) => i !== index);
  emit("update", { field: "options", value: newOptions });
};
</script>
