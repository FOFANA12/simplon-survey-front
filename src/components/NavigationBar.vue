<template>
  <nav
    class="bg-white h-14 shadow-sm fixed top-0 left-0 z-50 transition-all duration-300 flex items-center justify-between w-full"
  >
    <!-- Logo et Sidebar Toggle (Desktop) -->
    <div class="hidden sm:flex items-center text-gray-800">
      <div class="w-64 h-full flex items-center justify-center">
        <img src="@/assets/images/logo-sm.png" alt="App Logo" class="h-8" />
      </div>
      <button
        @click="$emit('toggle-sidebar')"
        class="w-10 h-10 flex items-center justify-center text-gray-800 transition duration-300"
      >
        <font-awesome-icon :icon="['fas', 'bars']" class="sm:text-xl text-lg" />
      </button>
    </div>

    <!-- Logo et Sidebar Toggle (Mobile) -->
    <div class="flex sm:hidden items-center text-gray-800">
      <button
        @click="$emit('toggle-sidebar')"
        class="ml-2 w-10 h-10 flex items-center justify-center text-gray-800 transition duration-300"
      >
        <font-awesome-icon :icon="['fas', 'bars']" class="text-lg" />
      </button>
      <div class="w-auto h-full flex items-center justify-center">
        <img
          src="@/assets/images/logo-sm.png"
          alt="App Logo"
          class="h-6 ml-2"
        />
      </div>
    </div>

    <!-- Actions : Profil et Déconnexion -->
    <div class="flex justify-end items-center space-x-6 pr-2 lg:pr-3">
      <!-- Profil -->
      <router-link
        :to="{ name: 'profile' }"
        class="w-10 h-10 flex items-center justify-center text-blue-500"
      >
        <font-awesome-icon
          :icon="['fas', 'user-circle']"
          class="sm:text-3xl text-2xl"
        />
      </router-link>

      <!-- Déconnexion -->
      <button
        class="w-10 h-10 flex items-center justify-center text-red-500"
        @click="logout"
      >
        <font-awesome-icon
          :icon="['fas', 'sign-out-alt']"
          class="sm:text-2xl text-xl"
        />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/store";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

// Déconnexion
const logout = () => {
  authStore
    .logout()
    .then(() => {
      router.push({ name: "login" });
    })
    .catch(() => {});
};
</script>

<style scoped>
</style>
