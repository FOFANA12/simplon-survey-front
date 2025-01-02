import URL from "@/http/user";
import { defineStore } from "pinia";
import Form from "vform";
import { reactive } from "vue";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    form: reactive(
      new Form({
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        lang: null,
        role: null,
        password: null,
        password_confirm: null,
        status: true,
      })
    ),
    roles: [],
    languages: [],
    selectedRows: [],
    rows: [],
    columns: [
      { label: "user.table.firstName", field: "firstName" },
      { label: "user.table.lastName", field: "lastName" },
      { label: "user.table.email", field: "email" },
      { label: "user.table.phone", field: "phone" },
      { label: "user.table.role", field: "role", sortable: false },
      {
        label: "common.table.status.title",
        field: "status",
        sortable: false,
        thClass: "text-center",
      },
      {
        label: "common.table.action",
        field: "id",
        sortable: false,
        thClass: "text-center",
      },
    ],
    totalRecords: 0,
    serverParams: {
      searchTerm: null,
      sortBy: "id",
      sortOrder: "desc",
      page: 1,
      perPage: 50,
    },
    perPage: 50,
    perPageDropdown: [50, 100, 200],
  }),

  actions: {
    onRowSelectionChange(obj) {
      const { selectedRows } = obj;
      this.selectedRows = selectedRows.map((row) => row.id);
    },

    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage });
      this.loadItems();
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage, page: 1 });
      this.loadItems();
    },

    onSortChange(params) {
      const sortBy = params[0]?.field || "id";
      const sortOrder = params[0]?.type || "desc";
      this.updateParams({ sortBy, sortOrder });
      this.loadItems();
    },

    onSearch(params) {
      this.updateParams({ searchTerm: params.searchTerm });
      this.loadItems();
    },

    loadItems(options = { clearSearch: false }) {
      if (options && options.clearSearch) {
        this.updateParams({ searchTerm: null });
      }

      window.axios
        .get(URL.USER, { params: this.serverParams })
        .then((resp) => {
          this.totalRecords = resp.data.meta.total;
          this.rows = resp.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async find(id, options = { mode: "edit" }) {
      this.languages = [];
      this.roles = [];

      try {
        if (options.mode === "edit") {
          const [resp1, resp2] = await Promise.all([
            window.axios.get(`${URL.USER}/${id}`, {
              params: options,
            }),
            window.axios.get(`${URL.REQUIREMENTS}`),
          ]);

          Object.assign(this.form, resp1.data.user);
          this.roles = resp2.data.roles;
          this.languages = resp2.data.languages;
          return resp1;
        } else {
          const resp = await window.axios.get(`${URL.USER}/${id}`, {
            params: options,
          });
          Object.assign(this.form, resp.data.user);

          return resp;
        }
      } catch (err) {
        throw err;
      }
    },

    async requirements() {
      this.roles = [];
      this.languages = [];

      try {
        const resp = await window.axios.get(URL.REQUIREMENTS);
        this.roles = resp.data.roles;
        this.languages = resp.data.languages;

        return resp;
      } catch (err) {
        throw err;
      }
    },

    async create() {
      return await this.form.post(URL.USER);
    },

    async update() {
      return await this.form.put(`${URL.USER}/${this.form.id}`);
    },

    async delete(ids) {
      return await window.axios.post(`${URL.USER}/delete`, {
        ids,
      });
    },
  },
});
