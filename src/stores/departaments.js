import { defineStore } from "pinia";
import { getDepartments } from "@/service/departement.servise.js";

export const useDepartaments = defineStore("departaments", {
  state: () => ({
    headers: [
      {
        title: "Id",
        align: "start",
        key: "id",
        sortable: false
      },
      {
        title: "Nomi",
        align: "start",
        key: "name"
      },
      {
        title: "Standart kvota",
        align: "start",
        key: "default_quota"
      },
      {
        title: "Amallar",
        align: "start",
        key: "actions"
      }
    ],

    pageParams: {
      page: 1,
      size: 50,
      for_month: null
    },
    pageLength: 1,
    agentList: [],
    loading: false
  }),

  actions: {}
});
