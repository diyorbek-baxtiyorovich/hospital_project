import { defineStore } from "pinia";

export const useAppointments = defineStore("appointments", {
  state: () => ({
    headers: [
      {
        title: "id",
        align: "start",
        key: "id"
      },
      {
        title: "Имя пациента",
        align: "start",
        key: "patient_fullname"
      },
      {
        title: "Врач",
        align: "start",
        key: "doctor.full_name"
      },
      {
        title: "Отделение",
        align: "start",
        key: "department.name"
      },

      {
        title: "Дата",
        align: "start",
        key: "date"
      },

      {
        title: "Статус",
        align: "start",
        key: "status"
      },
      {
        title: "Действия",
        align: "end",
        key: "actions",
        sortable: false
      }
    ]
  }),

  actions: {}
});
