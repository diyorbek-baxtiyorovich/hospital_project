import axios from '@/lib/axios.js'

export async function getClientData(pageParams) {
  try {
    const {data} = await axios.get('v1/loan-client/get-clients', {
      params: {
        page: pageParams.page,
        size: pageParams.size,
        client_status: pageParams.client_status,
        query: pageParams.query,
      },
    })

    return data
  } catch (error) {
    return error
  }
}

export async function fetchClientById(clientId) {
  try {
    const {data} = await axios.get(`v1/loan-client/get-client/${clientId}`)

    return data
  } catch (error) {
    return error
  }
}

export async function fetchGuarData(clientId) {
  try {
    const {data} = await axios.get(`v1/loan-client/get-client-collaterals/${clientId}`)

    return data
  } catch (error) {
    return error
  }
}

export async function fetchGuarantorData(clientId) {
  try {
    const {data} = await axios.get(`v1/loan-client/get-client-guarantors/${clientId}`)

    return data
  } catch (error) {
    return error
  }
}

export async function fetchPaymentData(clientId) {
  try {
    const {data} = await axios.get(`v1/loan-client/get-client-payments/${clientId}`)

    return data
  } catch (error) {
    return error
  }
}

export async function fetchVisitLogs(clientId) {
  try {
    const {data} = await axios.get(`v1/loan-client/get-client-visitation-logs/${clientId}`)

    return data
  } catch (error) {
    return error
  }
}

export async function fetchCallLogs(clientId) {
  try {
    const {data} = await axios.get(`v1/loan-client/get-client-call-logs/${clientId}`)

    return data
  } catch (error) {
    return error
  }
}
