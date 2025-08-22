import {defineStore} from 'pinia'

export const useDepartmentStore = defineStore('department', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Departament nomi',
        align: 'start',
        key: 'department_name',
      },
      {
        title: 'Sozlamalar',
        align: 'end',
        key: 'actions',
        sortable: false,
      }],
  }),

  actions: {},
})
