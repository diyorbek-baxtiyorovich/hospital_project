import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    headers: [{
      title: '№',
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Xodim F.I.SH',
        align: 'start',
        key: 'full_name',
      },
      {
        title: 'Foydalanuvchi nomi (username/login)',
        align: 'start',
        key: 'username',
      },
      {
        title: 'PINFL',
        align: 'start',
        key: 'pinfl',
      },
      {
        title: 'Telefon',
        align: 'start',
        key: 'phone',
      },
      {
        title: 'Lokal kod',
        align: 'start',
        key: 'local_code',
      },
      {
        title: 'Departament',
        align: 'start',
        key: 'department',
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
