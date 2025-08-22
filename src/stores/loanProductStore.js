import {defineStore} from 'pinia'

export const useLoanProductStore = defineStore('loanProduct', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Kredit nomi / Название кредита',
        align: 'start',
        key: 'name',
      },
      {
        title: 'Kredit maqsadi / Цель кредита',
        align: 'start',
        key: 'purpose',
      },
      {
        title: 'Kredit muddati / Срок кредита',
        align: 'start',
        key: 'term',
      },
      {
        title: 'Valyuta tur / Тип валюты',
        align: 'start',
        key: 'currency',
      },
      {
        title: 'Ta\'minot qiymati / Стоимость поставки',
        align: 'start',
        key: 'collateral_price',
      },
      {
        title: 'Kredit ma\'lumotlari / Кредитная информация',
        align: 'start',
        key: 'file',
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
