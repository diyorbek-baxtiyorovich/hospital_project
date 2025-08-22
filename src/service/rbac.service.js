import axios from '@/lib/axios'

export async function getAllRbacPermissions() {
  const {data} = await axios.get('/permission/v1/read/all')

  if (!data)
    return

  return data
}

export async function postPermissionForPath(permissions) {
  const {data} = await axios.post('/permission/v1/name-for-path/create', permissions)
  if (!data)
    return

  return data
}

export async function postPermissionToRoles(roles, role_id) {
  const {data} = await axios.patch(`/v1/rbac/update-role-permissions/${role_id}`, roles)

  if (!data)
    return

  return data
}

export async function deletePermission(id) {
  const {data} = await axios.delete(`/permission/v1/delete-permission/from-role/${id}`)

  if (!data)
    return

  return data
}
