import axios from '@/lib/axios.js'


export async function getUsers() {
  try {
    const {data} = await axios.get('/v1/users/get-all')

    return data
  } catch (error) {
    return error
  }
}

export async function getUsersMe() {
    try {
    const {data} = await axios.get('/v1/app/users/get-me')

        return data
    } catch (error) {
        return error
    }
}


export async function getUserRole(id) {
  try {
    const {data} = await axios.get(`/role/v1/get-user-roles/${id}`)

    return data
  } catch (error) {
    return error
  }
}

export async function appendRole(role, id) {
  try {
    const {data} = await axios.post(`/role/v1/user/append-to-user/${id}`, {role})

    return data
  } catch (error) {
    return error
  }
}

export async function getAllUserRoles() {
  try {
    const {data} = await axios.get('/v1/rbac/get-all-roles')

    return data
  } catch (error) {
    return error
  }
}


export async function deleteUser(user_id) {
  try {
    return await axios.delete(`/v1/users/delete/${user_id}`)
  } catch (error) {
    return error
  }
}

export async function addUser(newData) {
  try {
    return await axios.post('/v1/users/add', newData)
  } catch (error) {
    return error
  }
}

export async function updateUser(id, newData) {
  try {
    return await axios.put(`/v1/users/update/${id}`, newData)
  } catch (error) {
    return error
  }
}

export async function updatePassword(newData) {
  try {
    return await axios.put('/user/v1/update-password', null, {
      params: {
        user_id: newData.user_id,
        current_password: newData.current_password,
        new_password: newData.new_password,
      }
    })
  } catch (error) {
    return error
  }
}

export async function getAttachedRegionsByUserId(id) {
  try {
    const {data} = await axios.get('/attached-regions/v1/get-for-admin', {
      params: {
        user_id: id,
      }
    })

    return data
  } catch (error) {
    return error
  }
}

export async function getUsersForAttach() {
  try {
    const {data} = await axios.get('/attached-regions/v1/get-user-for-attach')

    return data
  } catch (error) {
    return error
  }
}

export async function attachRegions(attachedRegion) {
  try {
    const {data} = await axios.post('/attached-regions/v1/attach', attachedRegion)

    return data
  } catch (error) {
    return error
  }
}
