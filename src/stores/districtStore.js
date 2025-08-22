import {defineStore} from 'pinia'

export const useDistrictStore = defineStore('district', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Tuman kodi',
        align: 'start',
        key: 'code',
      },
      {
        title: 'Tuman nomi',
        align: 'start',
        key: 'name',
      },
      {
        title: 'Viloyat',
        align: 'start',
        key: 'region.name',
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
