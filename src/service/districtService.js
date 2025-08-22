import axios from '@/lib/axios.js'


export async function getDistrict() {
  try {
    const {data} = await axios.get('/v1/districts/get-all', {
      params: {
        lang: 'uz'
      }
    })

    return data
  } catch (error) {
    return error
  }
}

export async function getDistrictByRegion(id) {
  try {
    const {data} = await axios.get('/district/v1/get-districts-by-region', {
      params: {
        lang: 'uz',
        region_id: id
      }
    })

    return data
  } catch (error) {
    return error
  }
}

export async function getDistrictById(id) {
  try {
    const {data} = await axios.get('/district/v1/get-district', {
      params: {
        district_id: id
      }
    })

    return data
  } catch (error) {
    return error
  }
}

export async function getDistrictByRegionId(id) {
  try {
    const {data} = await axios.get('/district/v1/get-districts-by-region', {
      params: {
        region_id: id,
        lang: 'uz'
      },
    })

    return data
  } catch (error) {
    return error
  }
}

export async function deleteDistrict(district_id) {
  try {
    return await axios.delete('/district/v1/delete', {
      params: {
        district_id,
      },
    })
  } catch (error) {
    return error
  }
}

export async function addDistrict(newData) {
  try {
    return await axios.post('/district/v1/create', newData)
  } catch (error) {
    return error
  }
}

export async function updateDistrict(id, newData) {
  try {
    return await axios.put(`/district/v1/update?district_id=${id}`, newData)
  } catch (error) {
    return error
  }
}
