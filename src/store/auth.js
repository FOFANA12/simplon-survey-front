import URL from "@/http/auth";
import { defineStore } from "pinia";
import Form from "vform";
import { useFlashMsgStore } from "./flashMsg";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    urlPhoto: null,
    form: new Form({}),
  }),

  actions: {
    setToken(newToken) {
      this.token = newToken;
      this.isAuthenticated = !!newToken;
    },

    hasRole(roles) {
      const userRole = this.user ? this.user.role_code : null;
      return roles.length === 0 ? true : roles.includes(userRole);
    },

    async login() {
      try {
        const resp = await this.form.post(URL.LOGIN);
        this.isAuthenticated = true;
        this.user = resp.data.user;
        this.token = resp.data.token;

        return resp;
      } catch (err) {
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;

        throw err;
      }
    },

    async forgetPassword() {
      const store = useFlashMsgStore();
      store.resetMessage();
      try {
        const resp = await this.form.post(URL.FORGET_PASSWORD);
        store.updateMessage("success", resp.data.message);
        this.form.reset();
        this.form.clear();
        return resp;
      } catch (err) {
        store.updateMessage("error", err.response.data.message);
        throw err;
      }
    },

    async resetPassword() {
      const store = useFlashMsgStore();
      store.resetMessage();
      try {
        const resp = await this.form.post(URL.RESET_PASSWORD);
        store.updateMessage("success", resp.data.message);
        this.form.reset();

        return resp;
      } catch (err) {
        store.updateMessage("error", err.response.data.message);
        throw err;
      }
    },

    async logout() {
      try {
        const resp = await window.axios.get(URL.LOGOUT);
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;

        return resp;
      } catch (err) {
        throw err;
      }
    },

    async refreshToken() {
      try {
        console.log(URL.REFRESH_TOKEN);
        const resp = await window.axios.get(URL.REFRESH_TOKEN);
        this.isAuthenticated = true;
        this.user = resp.data.user;
        this.token = resp.data.token;
        console.log("Refresh successfuly", this.user);
        return resp;
      } catch (err) {
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;

        throw err;
      }
    },

    async getProfil() {
      try {
        const [resp1, resp2] = await Promise.all([
          window.axios.get(URL.MY_PROFILE),
          window.axios.get(`${URL.GET_PROFIL_REQUIREMENTS}`),
        ]);

        Object.assign(this.form, resp1.data.user);

        this.languages = resp2.data.languages;
        return resp1;
      } catch (err) {
        this.languages = [];
        throw err;
      }
    },

    async updateProfil() {
      try {
        const resp = await this.form.put(URL.MY_PROFILE);
        this.user = resp.data.user;
        Object.assign(this.form, resp.data.user);
        return resp;
      } catch (err) {
        throw err;
      }
    },
  },
});
