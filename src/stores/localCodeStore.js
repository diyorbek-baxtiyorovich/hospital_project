import {defineStore} from 'pinia'

export const useLocalCodeStore = defineStore('localCode', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Kod',
        align: 'start',
        key: 'code',
      },
      {
        title: 'Nomi',
        align: 'start',
        key: 'name',
      },
      {
        title: 'Manzil',
        align: 'start',
        key: 'address',
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
