<template>
  <teleport to="body">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="bg-white rounded-lg shadow-lg relative"
        :class="modalSizeClass"
      >
        <div
          class="modal-header flex items-start justify-between p-2 border-b border-gray-200 rounded-t"
        >
          <slot name="title"></slot>
          <button
            type="button"
            class="text-gray-400 hover:text-gray-900"
            @click="closeModal"
          >
            <font-awesome-icon
              :icon="['fas', 'times']"
              class="text-lg text-red-500 pr-1"
            />
          </button>
        </div>

        <div class="modal-body p-3">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer flex justify-end p-2 border-t border-gray-200">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>
  
<script setup>
import { computed } from "vue";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
  },
});

const emit = defineEmits(["update:isModalOpen"]);

const closeModal = () => {
  emit("update:isModalOpen", false);
};

const modalSizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-full max-w-sm";
    case "lg":
      return "w-full max-w-4xl";
    case "xl":
      return "w-full max-w-6xl";
    default:
      return "w-full max-w-2xl";
  }
});
</script>
