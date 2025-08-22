import {defineStore} from 'pinia'
import {getAgentsList, getLoanPortfolioData} from "@/service/loanPortfolioService.js";

export const useLoanPortfolioStore = defineStore('loanPortfolio', {
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
        key: 'client_name',
      },
      {
        title: 'Muddati o\'tgan qarz miqdori',
        align: 'start',
        key: 'overdue_balance',
      },
      {
        title: 'Kredit id',
        align: 'start',
        key: 'loan_id',
      },
      {
        title: 'Agent F.I.SH',
        align: 'start',
        key: 'loan_agent_fullname',
      },
      {
        title: 'Lokal kod',
        align: 'start',
        key: 'local_code',
      }],

    pageParams: {
      page: 1,
      size: 50,
      loan_agent_id: null,
      query: null
    },
    pageLength: 1,
    loanPortfolioList: [],
    loading: false,
    agentsList: []
  }),

  actions: {
    async fetchLoanPortfolio() {
      this.loading = true
      try {
        const response = await getLoanPortfolioData(this.pageParams)
        this.pageLength = response?.pages || 1
        this.loanPortfolioList = response?.items
      } catch (error) {
        console.error('Error fetching loan portfolio:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchAgents() {
      this.loading = true
      try {
        this.agentsList = await getAgentsList()
      } catch (error) {
        console.error('Error fetching loan portfolio:', error)
      }
    },
  },
})
