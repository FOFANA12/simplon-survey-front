import URL from "@/http/survey";
import { defineStore } from "pinia";
import Form from "vform";
import { reactive } from "vue";

export const useSurveyStore = defineStore({
  id: "survey",
  state: () => ({
    form: reactive(
      new Form({
        title: null,
        description: null,
        status: null,
        created_at: null,
        sections: [
          {
            title: "",
            description: "",
            questions: [],
          },
        ],
        questions: [
          {
            content: "",
            type: null,
            isRequired: true, // First question is required by default
            options: [], // For questions like MULTIPLE_CHOICE
            maxValue: null, // For numeric questions
          },
        ],
      })
    ),
    questionTypes: [
      { value: "shortAnswer", label: "Réponse courte" },
      { value: "longAnswer", label: "Réponse longue" },
      { value: "singleChoice", label: "Choix unique (QCU)" },
      { value: "multipleChoice", label: "Choix multiples (QCM)" },
      { value: "ranking", label: "Classement" },
      { value: "trueFalse", label: "Vrai/Faux" },
      { value: "rating", label: "Évaluation par étoiles" },
      { value: "slider", label: "Curseur (Échelle)" },
    ],
    sections: [],
    questions: [],
    statuses: [],
    selectedRows: [],
    rows: [],
    columns: [
      { label: "survey.table.createdAt", field: "createdAt" },
      { label: "survey.table.title", field: "title" },
      { label: "survey.table.status", field: "status" },
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
        .get(URL.SURVEY, { params: this.serverParams })
        .then((resp) => {
          this.totalRecords = resp.data.meta.total;
          this.rows = resp.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async find(id, options = { mode: "edit" }) {
      try {
        if (options.mode === "edit") {
          const [resp1, resp2] = await Promise.all([
            window.axios.get(`${URL.SURVEY}/${id}`, {
              params: options,
            }),
            window.axios.get(URL.REQUIREMENTS),
          ]);

          Object.assign(this.form, resp1.data.survey);

          this.sections = resp1.data.sections || [];
          this.questions = resp1.data.questions || [];
          this.statuses = resp2.data.statuses;

          return resp1;
        } else {
          const resp = await window.axios.get(`${URL.SURVEY}/${id}`, {
            params: options,
          });

          Object.assign(this.form, resp.data.survey);
          return resp;
        }
      } catch (err) {
        if (options.edit) {
          this.sections = [];
          this.questions = [];
          this.statuses = [];
        }
        throw err;
      }
    },

    async requirements() {
      try {
        const resp = await window.axios.get(URL.REQUIREMENTS);
        this.statuses = resp.data.statuses;

        return resp;
      } catch (err) {
        this.statuses = [];
        throw err;
      }
    },

    async create() {
      return await this.form.post(URL.SURVEY);
    },

    async update() {
      return await this.form.put(`${URL.SURVEY}/${this.form.id}`);
    },

    async delete(ids) {
      return await window.axios.post(`${URL.SURVEY}/delete`, {
        ids,
      });
    },
  },
});
