<template>
  <div class="w-full mx-auto sm:w-6/12">
    <!-- Alert -->
    <Alert
      v-if="flashStore.message.text"
      :type="flashStore.message.type"
      :message="flashStore.message.text"
      @close="flashStore.resetMessage()"
    />
  </div>

  <!-- Authentication Block -->
  <div
    class="bg-white rounded-lg shadow-md p-6 w-full max-w-sm mx-auto sm:w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12"
  >
    <div class="flex justify-center mb-4">
      <img src="@/assets/images/logo.webp" alt="App Logo" class="h-20 w-auto" />
    </div>
    <h2 class="text-xl font-bold mb-2 text-center">
      {{ t("resetPassword.title") }}
    </h2>
    <p class="text-center text-gray-600 mb-6">
      {{ t("resetPassword.message") }}
    </p>

    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 mb-1">{{
          t("resetPassword.emailLabel")
        }}</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <font-awesome-icon icon="envelope" class="text-gray-400" />
          </span>
          <input
            id="email"
            type="email"
            v-model="form.email"
            class="w-full p-2 pl-10 border rounded-lg"
            :placeholder="t('resetPassword.emailPlaceholder')"
            aria-label="Email"
          />
        </div>
        <HasError :form="form" field="email" class="text-red-500 text-xs" />
      </div>

      <div class="mb-4">
        <label for="new-password" class="block text-gray-700 mb-1">{{
          t("resetPassword.newPasswordLabel")
        }}</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <font-awesome-icon icon="lock" class="text-gray-400" />
          </span>
          <input
            id="new-password"
            :type="showNewPassword ? 'text' : 'password'"
            v-model="form.password"
            class="w-full p-2 pl-10 pr-10 border rounded-lg"
            :placeholder="t('resetPassword.newPasswordPlaceholder')"
            aria-label="New Password"
          />
          <button
            type="button"
            @click="toggleNewPasswordVisibility"
            class="absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="Toggle New Password Visibility"
          >
            <font-awesome-icon
              :icon="showNewPassword ? 'eye-slash' : 'eye'"
              class="text-gray-400"
            />
          </button>
        </div>
        <HasError :form="form" field="password" class="text-red-500 text-xs" />
      </div>

      <div class="mb-6">
        <label for="confirm-password" class="block text-gray-700 mb-1">{{
          t("resetPassword.confirmPasswordLabel")
        }}</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <font-awesome-icon icon="lock" class="text-gray-400" />
          </span>
          <input
            id="confirm-password"
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="form.password_confirm"
            class="w-full p-2 pl-10 pr-10 border rounded-lg"
            :placeholder="t('resetPassword.confirmPasswordPlaceholder')"
            aria-label="Confirm Password"
          />
          <button
            type="button"
            @click="toggleConfirmPasswordVisibility"
            class="absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="Toggle Confirm Password Visibility"
          >
            <font-awesome-icon
              :icon="showConfirmPassword ? 'eye-slash' : 'eye'"
              class="text-gray-400"
            />
          </button>
        </div>
        <HasError
          :form="form"
          field="password_confirm"
          class="text-red-500 text-xs"
        />
      </div>

      <div class="flex justify-center">
        <LoadingButton
          :busy="form.busy"
          :block="true"
          customClass="w-full sm:w-8/12 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-150"
        >
          <template #default>{{ t("resetPassword.submitButton") }}</template>
          <template #loading>{{ t("common.buttons.processing") }}</template>
        </LoadingButton>
      </div>
    </form>

    <div class="mt-6 flex flex-col text-blue-500">
      <router-link to="/login" class="mb-2 hover:underline">{{
        t("resetPassword.backToLogin")
      }}</router-link>
      <router-link to="/forgot-password" class="hover:underline">{{
        t("resetPassword.forgotPasswordLink")
      }}</router-link>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { useAuthStore, useFlashMsgStore } from "@/store";
import Footer from "./components/Footer.vue";

const route = useRoute();
const authStore = useAuthStore();
const flashStore = useFlashMsgStore();

const form = authStore.form;
form.email = route.params.email;
form.token = route.params.token;
form.password = null;
form.password_confirm = null;
form.clear();
flashStore.resetMessage();

const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const onSubmit = () => {
  form.clear();
  flashStore.resetMessage();
  authStore.resetPassword();
};
</script>

<style scoped>
</style>
