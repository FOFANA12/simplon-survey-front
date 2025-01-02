<template>
  <div class="w-full px-0 sm:px-4">
    <!-- Alert -->
    <Alert
      v-if="flashStore.message.text"
      :type="flashStore.message.type"
      :message="flashStore.message.text"
      @close="flashStore.resetMessage()"
    />
  </div>
  <div
    class="max-w-md mx-auto sm:w-11/12 md:w-8/12 lg:w-11/12 xl:w-7/12 2xl:w-7/12 py-4 sm:py-0"
  >
    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <div class="flex justify-center mb-4">
        <img
          src="@/assets/images/logo.webp"
          alt="App Logo"
          class="h-20 w-auto"
        />
      </div>
      <h2 class="text-xl font-bold mb-2">
        {{ t("forgotPassword.title") }}
      </h2>
      <p class="text-gray-600 mb-6">
        {{ t("forgotPassword.message") }}
      </p>

      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-1">
            {{ t("forgotPassword.emailLabel") }}
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <font-awesome-icon icon="envelope" class="text-gray-400" />
            </span>
            <input
              id="email"
              type="email"
              v-model.trim="form.email"
              class="w-full p-2 pl-10 border rounded-lg"
              :placeholder="t('forgotPassword.emailPlaceholder')"
              aria-label="Email"
            />
          </div>
          <HasError :form="form" field="email" class="text-red-500 text-xs" />
        </div>

        <div class="flex justify-center">
          <LoadingButton
            :busy="form.busy"
            :block="true"
            customClass="w-full sm:w-8/12 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-150"
          >
            <template #default>{{ t("forgotPassword.submitButton") }}</template>
            <template #loading>{{ t("common.buttons.processing") }}</template>
          </LoadingButton>
        </div>
      </form>

      <div class="mt-6 flex flex-col text-blue-500">
        <router-link to="/login" class="hover:underline">
          {{ t("forgotPassword.backToLogin") }}
        </router-link>
        <!-- <router-link
          to="/reset-password/fof@gmail.com/fdsdd"
          class="hover:underline"
        >
          {{ t("forgotPassword.enterResetCodeLink") }}
        </router-link> -->
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import { useAuthStore, useFlashMsgStore } from "@/store";
// import Footer from "./components/Footer.vue";

const authStore = useAuthStore();
const flashStore = useFlashMsgStore();

const form = authStore.form;
form.email = null;
form.clear();
flashStore.resetMessage();

const onSubmit = () => {
  form.clear();
  flashStore.resetMessage();
  authStore.forgetPassword();
};
</script>

<style scoped>
</style>
