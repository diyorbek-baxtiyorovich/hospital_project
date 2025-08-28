import {defineStore} from 'pinia'
import {getClientData} from "@/service/clientService.js";

export const useClientStore = defineStore('client', {
  state: () => ({
    headers: [{
      title: "Id",
      align: 'start',
      key: 'id',
      sortable: false,
    },
      {
        title: 'Mijoz F.I.SH',
        align: 'start',
        key: 'full_name',
      },
      {
        title: 'INN / Passport',
        align: 'start',
        key: 'inn_passport',
      },
      {
        title: 'Kredit id',
        align: 'start',
        key: 'loan_id',
      },
      {
        title: 'Status',
        align: 'start',
        key: 'client_status',
      }
    ],

    pageParams: {
      page: 1,
      size: 50,
      client_status: null,
      query: null
    },
    pageLength: 1,
    clientList: [],
    loading: false,
    statusList: [
      {title: 'Yakunlangan', value: 'completed'},
      {title: 'Jarayonda', value: 'in_progress'},
      {title: 'Yakunlanmagan', value: 'not_completed'},
    ],
  }),

  actions: {
    async fetchClientList() {
      this.loading = true
      try {
        const response = await getClientData(this.pageParams)
        this.pageLength = response?.pages || 1
        this.clientList = response?.items
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    },
  },
})
