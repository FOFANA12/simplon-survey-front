<template>
  <footer
    class="bg-white dark:bg-gray-800 w-full py-4 px-6 border-t border-gray-200 dark:border-gray-700"
  >
    <div class="flex justify-center items-center">
      <p class="text-gray-500 dark:text-gray-400 text-xs">
        &copy; {{ currentYear }} SimplonSurvey.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
</style>
