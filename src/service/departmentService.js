import axios from '@/lib/axios.js'


export async function getDepartments() {
  try {
    const {data} = await axios.get('/v1/departments/get-all')

    return data
  } catch (error) {
    return error
  }
}

export async function deleteDepartment(department_id) {
  try {
    return await axios.delete(`/v1/departments/delete/${department_id}`)
  } catch (error) {
    return error
  }
}

export async function addDepartment(newData) {
  try {
    return await axios.post('/v1/departments/add', newData)
  } catch (error) {
    return error
  }
}

export async function updateDepartment(id, newData) {
  try {
    return await axios.put(`/v1/departments/update/${id}`, newData)
  } catch (error) {
    return error
  }
}
