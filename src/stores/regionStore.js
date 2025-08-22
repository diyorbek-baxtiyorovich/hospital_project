import {defineStore} from 'pinia'

export const useRegionStore = defineStore('region', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Viloyat nomi',
        align: 'start',
        key: 'name_uz',
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
