import { useAuthStore, useGlobalLoaderStore } from "@/store";
import axios from "axios";
import loadash from "lodash";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

axios.interceptors.request.use(
  (config) => {
    const store = useGlobalLoaderStore();
    const authStore = useAuthStore();
    store.updateLoader({ isLoading: true, fullPage: true, canCancel: false });

    console.log('token is ' + authStore.token);

    if (authStore.token)
      config.headers["Authorization"] = `Bearer ${authStore.token}`;

    return config;
  },
  function (error) {
    const store = useGlobalLoaderStore();
    store.updateLoader({ isLoading: false, fullPage: false, canCancel: false });

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    const store = useGlobalLoaderStore();
    store.updateLoader({ isLoading: false, fullPage: false, canCancel: false });

    const authStore = useAuthStore();
    const newToken = response.headers['authorization'] ? response.headers['authorization'].split(' ')[1] : null;
    if (newToken) {
      console.log('new token is ' + newToken);
      authStore.setToken(newToken);
    }
    return response;
  },
  function (error) {
    const store = useGlobalLoaderStore();
    store.updateLoader({ isLoading: false, fullPage: false, canCancel: false });
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
      if (error.response && error.response.status === 401) {
        console.log(window.location.pathname);
        const currentRoute = window.location.pathname;
        if (currentRoute !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

window.axios = axios;
window._ = loadash;
window.swalDefaultTimer = 5000;
