import axios from '@/lib/axios.js'


export async function getRegions() {
  try {
    const {data} = await axios.get('/v1/region/get-all')

    return data
  } catch (error) {
    return error
  }
}

export async function getRegionsForAdmin() {
  try {
    const {data} = await axios.get('/region/v1/get-for-admin')

    return data
  } catch (error) {
    return error
  }
}


export async function getRegionById(id) {
  try {
    const {data} = await axios.get('/region/v1/get-one', {
      params: {
        region_id: id
      }
    })

    return data
  } catch (error) {
    return error
  }
}

export async function deleteRegion(region_id) {
  try {
    return await axios.delete('/region/v1/delete', {
      params: {
        region_id,
      },
    })
  } catch (error) {
    return error
  }
}

export async function addRegion(newData) {
  try {
    return await axios.post('/v1/region/add', newData)
  } catch (error) {
    return error
  }
}

export async function updateRegion(id, newData) {
  try {
    return await axios.put(`/region/v1/update?region_id=${id}`, newData)
  } catch (error) {
    return error
  }
}
