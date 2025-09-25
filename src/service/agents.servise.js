// eslint-disable-next-line import/extensions
import axios from '@/lib/axios.js'

export async function getAgentsData(pageParams) {
  try {
    const { data } = await axios.get('/v1/loan-income/get-incomes', {
      params: {
        page: pageParams.page,
        size: pageParams.size,
        for_month: pageParams.for_month,
      },
    })

    return data
  } catch (error) {
    return error
  }
}

export async function getAgentDataId(agentId, pageParams) {
  try {
    const { data } = await axios.get(`/v1/loan-income/get-agent-incomes/${agentId}`, {
      params: {
        page: pageParams.page,
        size: pageParams.size,
      },
    })

    return data
  } catch (error) {
    return error
  }
}
