import {defineStore} from 'pinia'

export const useLoanPurposeStore = defineStore('loanPurpose', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Kredit yo\'nalishi / направление кредита',
        align: 'start',
        key: 'direction_uz',
      },
      {
        title: 'Yo\'nalish kodi / код направление',
        align: 'start',
        key: 'direction_code',
      },
      {
        title: 'Kredit turi / Тип кредита',
        align: 'start',
        key: 'type_uz',
      },
      {
        title: 'Kredit turi kodi / Тип кредита',
        align: 'start',
        key: 'type_code',
      },
      {
        title: 'IABSdagi nomi',
        align: 'start',
        key: 'iabs_name_uz',
      },
      {
        title: 'IABSdagi kodi',
        align: 'start',
        key: 'iabs_code_uz',
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
      loan_purpose_id: null,
      type_uz: null,
      direction_uz: null,
    },
  }),

  actions: {},
})
