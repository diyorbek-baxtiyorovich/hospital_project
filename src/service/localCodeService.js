import axios from '@/lib/axios.js'


export async function getLocalCode(id) {
  try {
    const {data} = await axios.get('/v1/local-code/get-all', {
      params: {
        region_id: id
      }
    })

    return data
  } catch (error) {
    return error
  }
}

export async function getLocalCodeById(id) {
  try {
    const {data} = await axios.get(`/v1/local-code/get/${id}`)

    return data
  } catch (error) {
    return error
  }
}

export async function getLocalCodeByRegionId(id) {
  try {
    const {data} = await axios.get('/v1/local-code/get-all', {
      params: {
        region_id: id,
      }
    })

    return data
  } catch (error) {
    return error
  }
}

export async function deleteLocalCode(branch_id) {
  try {
    return await axios.delete(`/v1/local-code/delete/${branch_id}`)
  } catch (error) {
    return error
  }
}

export async function addLocalCode(newData) {
  try {
    return await axios.post('/v1/local-code/add', newData)
  } catch (error) {
    return error
  }
}

export async function updateLocalCode(id, newData) {
  try {
    return await axios.put(`/v1/local-code/update/${id}`, newData)
  } catch (error) {
    return error
  }
}
