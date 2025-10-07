import axios from '@/lib/axios.js'

export async function getStatistic(pageParams) {
  try {
    const { data } = await axios.get('v1/statistics/client', {
      params: {
        is_completed: pageParams.status,
        agent_id: pageParams.agent_id,
        local_code_id: pageParams.local_code_id,
        region_id: pageParams.region_id,
        for_month: pageParams.for_month,
        page: pageParams.page,
        size: pageParams.itemsPerPage
      },
    })

    return data
  } catch (error) {
    return error
  }
}
