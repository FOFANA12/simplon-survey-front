<template>
    <router-link
      :to="to"
      class="bg-white min-w-[100px] flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-t-lg
      text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200"
      active-class="!text-white !bg-blue-500"
      exact
    >
      <font-awesome-icon :icon="icon" class="w-4 h-4 mr-0" />
      <slot></slot>
    </router-link>
  </template>
  
  <script setup>
  
  const props = defineProps({
    to: {
      type: Object,
      required: true,
    },
    icon: {
      type: Array,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  </style>
  