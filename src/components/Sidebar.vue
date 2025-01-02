<template>
  <aside
    :class="{
      '-translate-x-full': !layoutStore.isSidebarVisible,
      'translate-x-0': layoutStore.isSidebarVisible,
    }"
    class="sidebar w-70 fixed top-0 left-0 h-full bg-white z-40 transform transition-transform duration-300"
    aria-label="Sidebar"
  >
    <div class="overflow-y-auto h-full">
      <ul class="space-y-0">
        <li class="border-b border-t border-gray-100">
          <router-link
            to="/"
            class="flex items-center px-4 py-2 text-base text-sm font-normal hover:bg-gray-100"
          >
            <font-awesome-icon
              :icon="['fas', 'tachometer-alt']"
              class="w-5 h-5 text-gray-500transition duration-75 group-hover:text-gray-900"
            />
            <span class="ml-3">{{ t("sidebar.dashboard") }}</span>
          </router-link>
        </li>

        <li class="border-b border-gray-100">
          <router-link
            to="/survey"
            class="flex items-center px-4 py-2 text-base text-sm font-normal hover:bg-gray-100"
          >
            <font-awesome-icon
              :icon="['fas', 'clipboard-list']"
              class="w-5 h-5 transition duration-75 group-hover:text-gray-900"
            />
            <span class="ml-3">{{ t("sidebar.surveys") }}</span>
          </router-link>
        </li>

        <li class="border-b border-gray-100">
          <router-link
            to="/company"
            class="flex items-center px-4 py-2 text-base text-sm font-normal hover:bg-gray-100"
          >
            <font-awesome-icon
              :icon="['fas', 'building']"
              class="w-5 h-5 transition duration-75 group-hover:text-gray-900"
            />
            <span class="ml-3">{{ t("sidebar.companies") }}</span>
          </router-link>
        </li>

        <li class="border-b border-gray-100">
          <router-link
            to="/surveyor"
            class="flex items-center px-4 py-2 text-base text-sm font-normal hover:bg-gray-100"
          >
            <font-awesome-icon
              :icon="['fas', 'user-edit']"
              class="w-5 h-5 transition duration-75 group-hover:text-gray-900"
            />
            <span class="ml-3">{{ t("sidebar.surveyors") }}</span>
          </router-link>
        </li>

        <li class="border-b border-gray-100">
          <router-link
            to="/respondent"
            class="flex items-center px-4 py-2 text-base text-sm font-normal hover:bg-gray-100"
          >
            <font-awesome-icon
              :icon="['fas', 'users']"
              class="w-5 h-5 transition duration-75 group-hover:text-gray-900"
            />
            <span class="ml-3">{{ t("sidebar.respondents") }}</span>
          </router-link>
        </li>

        <li class="border-b border-gray-100">
          <router-link
            to="/user"
            class="flex items-center px-4 py-2 text-base text-sm font-normal hover:bg-gray-100"
          >
            <font-awesome-icon
              :icon="['fas', 'user-shield']"
              class="w-5 h-5 transition duration-75 group-hover:text-gray-900"
            />
            <span class="ml-3">{{ t("sidebar.users") }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useLayoutStore } from "@/store/layout";
import { usePermission } from "@/composables/usePermission";
import permissions from "@/composables/permissions";

const layoutStore = useLayoutStore();
const { hasPermission, hasAnyPermission } = usePermission();
</script>

<style scoped>
.sidebar {
  z-index: 50;
}
</style>
