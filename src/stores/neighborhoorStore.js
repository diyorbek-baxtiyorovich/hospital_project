import {defineStore} from 'pinia'

export const useNeighborhoodStore = defineStore('neighborhood', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Mahalla nomi',
        align: 'start',
        key: 'name',
      },
      {
        title: 'Viloyat',
        align: 'start',
        key: 'region.name_uz',
      },
      {
        title: 'Tuman',
        align: 'start',
        key: 'district.name_uz',
      },
      {
        title: 'MFY kodi',
        align: 'start',
        key: 'mfy_code',
      },
      {
        title: 'IABSdagi kodi',
        align: 'start',
        key: 'iabs_mfy_code',
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
      region_id: null,
      neighborhood_id: null,
      district_id: null,
    },
  }),

  actions: {},
})
