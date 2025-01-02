<template>
  <div
    class="max-w-sm mx-auto sm:w-11/12 md:w-8/12 lg:w-11/12 xl:w-7/12 2xl:w-7/12 py-4 sm:py-0"
  >
    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <div class="flex justify-center mb-4">
        <img
          src="@/assets/images/logo.webp"
          alt="App Logo"
          class="h-20 w-auto"
        />
      </div>
      <h2 class="text-xl font-bold mb-2 text-center">{{ t("login.title") }}</h2>
      <p class="text-center text-gray-600 mb-6">
        {{ t("login.welcomeMessage") }}
      </p>

      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-1">{{
            t("login.emailLabel")
          }}</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <font-awesome-icon icon="envelope" class="text-gray-400" />
            </span>
            <input
              id="email"
              type="email"
              v-model.trim="form.email"
              class="w-full p-2 pl-10 border rounded-lg"
              :placeholder="t('login.emailPlaceholder')"
              aria-label="Email"
            />
          </div>
          <HasError :form="form" field="email" class="text-red-500 text-xs" />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-700 mb-1">{{
            t("login.passwordLabel")
          }}</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <font-awesome-icon icon="lock" class="text-gray-400" />
            </span>
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model.trim="form.password"
              class="w-full p-2 pl-10 pr-10 border rounded-lg"
              :placeholder="t('login.passwordPlaceholder')"
              aria-label="Password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
              aria-label="Toggle Password Visibility"
            >
              <font-awesome-icon
                :icon="showPassword ? 'eye-slash' : 'eye'"
                class="text-gray-400"
              />
            </button>
          </div>
          <HasError
            :form="form"
            field="password"
            class="text-red-500 text-xs"
          />
        </div>

        <div class="mb-4 text-right">
          <router-link
            to="/forgot-password"
            class="text-blue-500 hover:underline"
          >
            {{ t("login.forgotPasswordLink") }}
          </router-link>
        </div>

        <div class="flex justify-center">
          <LoadingButton
            :busy="form.busy"
            block
            customClass="w-full sm:w-8/12 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-150 flex items-center justify-center"
          >
            <template #default>{{ t("login.submitButton") }}</template>
            <template #loading>{{ t("common.buttons.processing") }}</template>
          </LoadingButton>

          <!-- <button
          type="submit"
          class="w-full sm:w-8/12 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-150 flex items-center justify-center"
          aria-label="Submit"
        >
          <span class="loading loading-spinner loading-sm mr-1"></span>
          <span>{{ t("login.submitButton") }}</span>
        </button> -->
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store";
import Footer from "./components/Footer.vue";

const route = useRoute();
const router = useRouter();
const store = useAuthStore();
const showPassword = ref(false);

const form = store.form;
form.email = null;
form.password = null;
form.clear();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = () => {
  form.clear();

  store.login().then(() => {
    const redirect = route.query.redirect || "/";
    router.push(redirect);
  });
};
</script>

<style scoped>
</style>
