import { defineStore } from 'pinia'
// eslint-disable-next-line import/extensions
import { getAgentsData } from "@/service/agents.servise.js"

export const useAgentStore = defineStore('agent', {
  state: () => ({
    headers: [{
      title: "Id",
      align: 'start',
      key: 'agent_id',
      sortable: false,
    },
    {
      title: 'Agent F.I.SH',
      align: 'start',
      key: 'full_name',
    },
    {
      title: 'Kechiktirilgan daromad',
      align: 'start',
      key: 'overdue_income',
    },
    {
      title: 'Foiz daromadi',
      align: 'start',
      key: 'percentage_income',
    },
    {
      title: 'Jarima daromadi',
      align: 'start',
      key: 'surcharge_income',
    },
    {
      title: 'Umumiy daromad',
      align: 'start',
      key: 'total_income',
    }],

    pageParams: {
      page: 1,
      size: 50,
      for_month: null,
    },
    pageLength: 1,
    agentList: [],
    loading: false,
  }),

  actions: {
    async fetchAgentsList() {
      this.loading = true
      try {
        const response = await getAgentsData(this.pageParams)

        this.pageLength = response?.pages || 1
        this.agentList = response?.items
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    },
  },
})
