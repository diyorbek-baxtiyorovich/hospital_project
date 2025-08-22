import {defineStore} from 'pinia'

export const useCreditApplicationStore = defineStore('creditApplication', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Bosqich',
        align: 'start',
        key: 'stage',
      },
      {
        title: 'Ariza holati',
        align: 'start',
        key: 'scoring_status.name_uz',
      },
      {
        title: 'INN/PINFL',
        align: 'start',
        key: 'inn',
      },
      {
        title: 'Mijoz nomi',
        align: 'start',
        key: 'company_name',
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
        title: 'Tegishlilik holati',
        align: 'start',
        key: 'belonging_status.type',
      },
      {
        title: '...',
        key: 'actions',
        align: 'center',
      }],

    pageParams: {
      page: 1,
      size: 20,
      region_id: null,
      stage_id: null,
      status_id: null,
      inn_pinfl: null,
      district_id: null,
      client_type: null
    },
  }),

  actions: {},
})
