<template>
  <div class="app flex flex-col min-h-screen">
    <NavigationBar
      :isSidebarVisible="layoutStore.isSidebarVisible"
      @toggle-sidebar="toggleSidebar"
    />

    <div class="flex flex-1 relative">
      <div :class="sidebarClasses">
        <Sidebar :isSidebarVisible="layoutStore.isSidebarVisible" />
      </div>

      <div
        v-if="layoutStore.isSidebarVisible && !isLargeScreen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        @click="toggleSidebar"
      ></div>

      <div :class="mainContentClasses" class="flex flex-col flex-1 transition-all duration-300">
        <main class="flex flex-col flex-1 bg-gray-100 relative">
          <div class="flex-1 mt-[55px] p-4 pt-0">
            <router-view />
          </div>
          
          <Footer />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useLayoutStore } from "@/store";
import NavigationBar from "../components/NavigationBar.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";

const layoutStore = useLayoutStore();
const isLargeScreen = ref(window.innerWidth >= 1024);

const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024;
  if (!isLargeScreen.value) {
    layoutStore.isSidebarVisible = false;
  }
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
  updateScreenSize();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});

const sidebarClasses = computed(() => ({
  "fixed top-14 left-0 h-[calc(100%-3.5rem)] z-50 bg-white shadow-lg transition-transform": true,
  "-translate-x-full": !layoutStore.isSidebarVisible && !isLargeScreen.value,
  "translate-x-0": layoutStore.isSidebarVisible || isLargeScreen.value,
}));

const mainContentClasses = computed(() => ({
  "ml-70": layoutStore.isSidebarVisible && isLargeScreen.value,
  "ml-0": !layoutStore.isSidebarVisible || !isLargeScreen.value,
}));

const toggleSidebar = () => {
  layoutStore.toggleSidebar();
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sidebar-overlay {
  position: fixed;
  z-index: 40;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  position: relative;
}
</style>
