import axios from '@/lib/axios.js'


export async function getLoanPurpose(pageParams) {
  try {
    const {data} = await axios.get('/loan-purpose/v1/get-paginated', {
      params: {
        page: pageParams.page,
        size: pageParams.size,
        loan_purpose_id: pageParams.loan_purpose_id,
        type_uz: pageParams.type_uz,
        direction_uz: pageParams.direction_uz,
      },
    })

    return data
  } catch (error) {
    return error
  }
}

export async function deleteLoanPurpose(id) {
  try {
    return await axios.delete(`/loan-purpose/v1/delete`, {
      params: {
        loan_purpose_id: id
      }
    })
  } catch (error) {
    return error
  }
}

export async function addLoanPurpose(newData) {
  try {
    return await axios.post('/loan-purpose/v1/create', newData)
  } catch (error) {
    return error
  }
}

export async function updateLoanPurpose(id, newData) {
  try {
    return await axios.put('/loan-purpose/v1/update', newData, {
      params: {
        loan_purpose_id: id,
      }
    })
  } catch (error) {
    return error
  }
}
