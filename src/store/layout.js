import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isSidebarVisible: true,
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    setSidebarVisibility(visible) {
      this.isSidebarVisible = visible;
    }
  },
});
