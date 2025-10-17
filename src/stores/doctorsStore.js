import { defineStore } from "pinia";

export const useDoctorsStore = defineStore("doctors", {
  state: () => ({
    headers: [
      {
        title: "№",
        align: "start",
        key: "id",
        sortable: false
      },
      {
        title: "Имя пользователя",
        align: "start",
        key: "username"
      },
      {
        title: "Полное имя",
        align: "start",
        key: "full_name"
      },
      {
        title: "ID отдела",
        align: "start",
        key: "department_id"
      },
      {
        title: "Название отдела",
        align: "start",
        key: "department_name"
      },
      {
        title: "Специальность",
        align: "start",
        key: "speciality"
      },
      {
        title: "Действия",
        align: "start",
        key: "actions",
        sortable: false
      }
    ]
  }),

  actions: {}
});
