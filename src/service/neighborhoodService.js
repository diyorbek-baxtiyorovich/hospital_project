import axios from '@/lib/axios.js'

export async function getNeighborhood(pageParams) {
  try {
    const {data} = await axios.get('/neighborhood/v1/get-paginated', {
      params: {
        page: pageParams.page,
        size: pageParams.size,
        region_id: pageParams.region_id,
        neighborhood_id: pageParams.neighborhood_id,
        district_id: pageParams.district_id,
        name: pageParams.name,
        lang: 'uz'
      },
    })

    return data
  } catch (error) {
    return error
  }
}

export async function getNeighborhoodByID(id) {
  try {
    const {data} = await axios.get('/neighborhood/v1/get-one', {
      params: {
        neighborhood_id: id,
      },
    })
    return data
  } catch (error) {
    return error
  }
}

export async function deleteNeighborhood(id) {
  try {
    return await axios.delete(`/neighborhood/v1/delete`, {
      params: {
        neighborhood_id: id
      }
    })
  } catch (error) {
    return error
  }
}

export async function addNeighborhood(newData) {
  try {
    return await axios.post('/neighborhood/v1/create', newData)
  } catch (error) {
    return error
  }
}

export async function updateNeighborhood(id, newData) {
  try {
    return await axios.put('/neighborhood/v1/update', newData, {
      params: {
        neighborhood_id: id,
      }
    })
  } catch (error) {
    return error
  }
}
