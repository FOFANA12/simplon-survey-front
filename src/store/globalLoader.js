import { defineStore } from 'pinia';

export const useGlobalLoaderStore = defineStore({
  id: 'globalLoader',
  state: () => ({
    isLoading: false,
    fullPage: true,
    canCancel: false,
    color: '#c36d27',
    width: 100,
    height: 100,
  }),
  actions: {
    updateLoader({ isLoading = false, fullPage = true, canCancel = false }) {
      this.isLoading = isLoading;
      this.fullPage = fullPage;
      this.canCancel = canCancel;
    },
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
});
