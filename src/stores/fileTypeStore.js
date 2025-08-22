import { defineStore } from 'pinia'

export const useFileTypeStore = defineStore('fileType', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
    {
      title: 'Nomi',
      align: 'start',
      key: 'name_uz',
    },
    {
      title: 'Названия',
      align: 'start',
      key: 'name_ru',
    },
    {
      title: 'Sozlamalar',
      align: 'end',
      key: 'actions',
      sortable: false,
    }],

    pageParams: {
      page: 1,
      size: 20,
      name: null,
    },
  }),

  actions: {},
})
