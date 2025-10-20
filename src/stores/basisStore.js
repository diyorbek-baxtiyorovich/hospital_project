import { defineStore } from "pinia"

export const useAppointments = defineStore("appointments", {
  state: () => ({
    headers: [
      {
        title: "id",
        align: "start",
        key: "id",
      },
      {
        title: "Bemor ismi",
        align: "start",
        key: "patient_fullname",
      },
      
      {
        title: "Tashxis",
        align: "start",
        key: "diagnosis",
      },
      {
        title: "Maqsad",
        align: "start",
        key: "purpose",
      },
      {
        title: "Shifokor",
        align: "start",
        key: "doctor.full_name",
      },
      {
        title: "Bo‘lim",
        align: "start",
        key: "department.name",
      },
      
      {
        title: "Sana",
        align: "start",
        key: "date",
      },

      //   {
      //     title: "Holat",
      //     align: "start",
      //     key: "status",
      //   },
      {
        title: "Amallar",
        align: "end",
        key: "actions",
        sortable: false,
      },
    ],
  }),

  actions: {},
})
