import URL from "@/http/company";
import { defineStore } from "pinia";
import Form from "vform";
import { reactive } from "vue";

export const useCompanyStore = defineStore({
  id: "company",
  state: () => ({
    form: reactive(
      new Form({
        name: null,
        email: null,
        phone: null,
        address: null,
        city: null,
        zipCode: null,
        country: null,
        website: null,
        activity: null,
        numberOfEmployees: null,
        status: true,
      })
    ),
    selectedRows: [],
    rows: [],
    columns: [
      {
        label: "company.table.name",
        field: "name",
      },
      {
        label: "company.table.email",
        field: "email",
      },
      {
        label: "company.table.phone",
        field: "phone",
      },
      {
        label: "company.table.country",
        field: "country",
      },
      {
        label: "company.table.activity",
        field: "activity",
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
        .get(URL.COMPANY, { params: this.serverParams })
        .then((resp) => {
          this.totalRecords = resp.data.meta.total;
          this.rows = resp.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async find(id) {
      try {
        const resp = await window.axios.get(`${URL.COMPANY}/${id}`);

        Object.assign(this.form, resp.data.company);

        return resp;
      } catch (err) {
        throw err;
      }
    },

    async create() {
      return await this.form.post(URL.COMPANY);
    },

    async update() {
      return await this.form.put(`${URL.COMPANY}/${this.form.id}`);
    },

    async delete(ids) {
      return await window.axios.post(`${URL.COMPANY}/delete`, {
        ids,
      });
    },
  },
});
