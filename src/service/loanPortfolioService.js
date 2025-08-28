import axios from '@/lib/axios.js'

export async function getLoanPortfolioData(pageParams) {
  try {
    const {data} = await axios.get('v1/loan-portfolio/get-all', {
      params: {
        page: pageParams.page,
        size: pageParams.size,
        loan_agen_id: pageParams.loan_agent_id,
        query: pageParams.query,
      },
    })

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}


export async function getAgentsList() {
  try {
    const {data} = await axios.get('v1/loan-agent/get-agents')

    return data
  } catch (error) {
    return error
  }
}

export async function uploadLoanPortfolio(formData) {
  try {
    const {data} = await axios.post('v1/loan-portfolio/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function appendLoanToAgent(item) {
  try {
    const {data} = await axios.put('v1/loan-portfolio/relate', item)

    return data
  } catch (error) {
    return error
  }
}

