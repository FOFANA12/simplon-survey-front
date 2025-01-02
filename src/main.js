import { useAuthStore } from "@/store";

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import i18n from "@/i18n";
import { createHead } from "@vueuse/head";

import "@/config/axios"; 

// Import global CSS
import "@/assets/css/tailwind.css";
import "@/assets/css/vue-good-table.css";
import "vue-loading-overlay/dist/css/index.css";
import { HasError } from "vform/src/components/tailwind";

// Import global components
import CustomModal from "@/components/CustomModal.vue";
import LoadingButton from "@/components/LoadingButton.vue";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation.vue";
import Alert from "@/components/Alert.vue";
import Loading from "vue-loading-overlay";
import FullScreenLayout from "@/layouts/FullScreenLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import SurveyLayout from "@/layouts/SurveyLayout.vue";

import VueGoodTablePlugin from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
import "@/assets/css/vue-good-table.css";

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import "@/assets/css/vue-select.css";

import 'sweetalert2/dist/sweetalert2.min.css'


// Import and configure FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";
import * as brandsIcons from "@fortawesome/free-brands-svg-icons";

// Add FontAwesome icons to the library
const addIcons = (icons) =>
  Object.keys(icons)
    .filter(
      (key) =>
        key !== "fas" && key !== "far" && key !== "fab" && key !== "prefix"
    )
    .map((icon) => icons[icon]);

library.add(
  ...addIcons(solidIcons),
  ...addIcons(regularIcons),
  ...addIcons(brandsIcons)
);

// Create app instance
const app = createApp(App);

// Register plugins
const head = createHead();
const pinia = createPinia();
app.use(head);
app.use(pinia);

// Register global components
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("fullscreen-layout", FullScreenLayout);
app.component("auth-layout", AuthLayout);
app.component("main-layout", MainLayout);
app.component("survey-layout", SurveyLayout);
app.component("LoadingButton", LoadingButton);
app.component("Loading", Loading);
app.component("BreadcrumbNavigation", BreadcrumbNavigation);
app.component("CustomModal", CustomModal);
app.component('v-select', vSelect)
app.component("Alert", Alert);
app.component(HasError.name, HasError);

// Register i18n translation function globally
app.config.globalProperties.t = i18n.global.t;

// Store instance and authentication
const store = useAuthStore();

// Load user profile before mounting the app
store
  .refreshToken()
  .then(() => {})
  .catch(() => {})
  .finally(() => {
    app.use(router);
    app.use(i18n);
    app.use(VueGoodTablePlugin);
    app.mount("#app");
  });
