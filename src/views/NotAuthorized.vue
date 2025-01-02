<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center custom-bg-img"
  >
    <div class="max-w-xl text-center p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-red-500 mb-4">
        {{ t('notAuthorized.title') }}
      </h1>
      <p class="text-xl text-gray-700 mb-8">
        {{ t('notAuthorized.message') }}
      </p>
      <router-link
        :to="{ name: 'dashboard' }"
        class="btn bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        {{ t('notAuthorized.homeButton') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
