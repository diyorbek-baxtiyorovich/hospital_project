import axios from '@/lib/axios'

export async function getAllRole() {
  const {data} = await axios.get('/v1/rbac/get-all-roles')
  if (!data)
    return

  return data
}

export async function getAllPermissions() {
  const {data} = await axios.get('/v1/rbac/get-all-routes')
  if (!data)
    return

  return data
}

export async function getPermissionsById(id) {
  const {data} = await axios.get(`/v1/rbac/get-role-permissions/${id}`)
  if (!data)
    return

  return data
}

export async function postRole(newRole) {
  const {data} = await axios.post('/v1/rbac/add-role', newRole)
  if (!data)
    return

  return data
}

export async function updateRole(currentRole) {
  const {data} = await axios.put(`/v1/rbac/update-role/${currentRole.id}`, currentRole)
  if (!data)
    return

  return data
}

export async function deleteRole(id) {
  const {data} = await axios.delete(`/v1/rbac/delete-role/${id}`)
  if (!data)
    return

  return data
}

export async function getAppendUserRole() {
  const {data} = await axios.get('/role/v1/append-user-role/users')
  if (!data)
    return

  return data
}

export async function postAppendToUser(userId, appendUser) {
  const {data} = await axios.post(`/user/v1/create${userId}`, appendUser)
  if (!data)
    return

  return data
}

export async function deleteAppendForUser(userId) {
  const {data} = await axios.delete(`/role/v1/delete/${userId}`)
  if (!data)
    return

  return data
}
