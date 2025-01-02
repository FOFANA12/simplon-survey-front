<script setup>
const props = defineProps({
  busy: {
    type: Boolean,
    required: true,
  },
  block: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: 'submit',
  },
  customClass: {
    type: String,
    required: false,
    default: null,
  },
});

const slots = defineSlots();
</script>

<template>
  <button
    :type="type"
    :disabled="busy"
    :class="[
      customClass,
      block ? 'w-full' : 'min-w-[100px]',
      'py-2 px-4 flex items-center justify-center rounded-lg',
      busy ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600',
      'text-white transition duration-150',
    ]"
  >
    <span v-if="busy" class="loading loading-spinner loading-sm mr-1"></span>
    <span v-if="!busy">
      <slot name="default">Submit</slot>
    </span>
    <span v-else>
      <slot name="loading">Loading...</slot>
    </span>
  </button>
</template>

<style scoped>
</style>
