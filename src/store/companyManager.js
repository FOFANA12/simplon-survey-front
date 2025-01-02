import URL from "@/http/company-manager";
import { defineStore } from "pinia";
import Form from "vform";
import { reactive } from "vue";

export const useCompanyManagerStore = defineStore({
  id: "companyManager",
  state: () => ({
    form: reactive(
      new Form({
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        lang: null,
        password: null,
        password_confirm: null,
        is_company_main_contact: false,
        company: null,
        status: true,
      })
    ),
    companies: [],
    languages: [],
    selectedRows: [],
    rows: [],
    columns: [
      {
        label: "companyManager.table.company",
        field: "company",
        sortable: true,
      },
      { label: "companyManager.table.firstName", field: "firstName" },
      { label: "companyManager.table.lastName", field: "lastName" },
      { label: "companyManager.table.email", field: "email" },
      {
        label: "companyManager.table.isCompanyMainContact",
        field: "isCompanyMainContact",
        sortable: false,
        thClass: "text-center",
      },
      
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
        .get(URL.COMPANY_MANAGER, { params: this.serverParams })
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
      this.companies = [];
      try {
        if (options.mode === "edit") {
          const [resp1, resp2] = await Promise.all([
            window.axios.get(`${URL.COMPANY_MANAGER}/${id}`, {
              params: options,
            }),
            window.axios.get(`${URL.REQUIREMENTS}`),
          ]);

          Object.assign(this.form, resp1.data.companyManager);
          this.companies = resp2.data.companies;
          this.languages = resp2.data.languages;
          return resp1;
        } else {
          const resp = await window.axios.get(`${URL.COMPANY_MANAGER}/${id}`, {
            params: options,
          });
          Object.assign(this.form, resp.data.companyManager);

          return resp;
        }
      } catch (err) {
        throw err;
      }
    },

    async requirements() {
      this.languages = [];
      this.companies = [];
      try {
        const resp = await window.axios.get(URL.REQUIREMENTS);
        this.companies = resp.data.companies;
        this.languages = resp.data.languages;

        return resp;
      } catch (err) {
        throw err;
      }
    },

    async create() {
      return await this.form.post(URL.COMPANY_MANAGER);
    },

    async update() {
      return await this.form.put(`${URL.COMPANY_MANAGER}/${this.form.id}`);
    },

    async delete(ids) {
      return await window.axios.post(`${URL.COMPANY_MANAGER}/delete`, {
        ids,
      });
    },
  },
});
