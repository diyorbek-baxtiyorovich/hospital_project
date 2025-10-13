import axios from '@/lib/axios'

export async function getAllRbacPermissions() {
  const { data } = await axios.get('/permission/v1/read/all')

  if (!data)
    return

  return data
}

export async function postPermissionForPath(permissions) {
  const { data } = await axios.post('/permission/v1/name-for-path/create', permissions)
  if (!data)
    return

  return data
}

export async function postPermissionToRoles(role_id, roles) {
  const { data } = await axios.put('/rbac/reappend-role-permissions', {
    role_id: roles,
    permission_ids: role_id,
  })

  return data
}

export async function deletePermission(id) {
  const { data } = await axios.delete(`/permission/v1/delete-permission/from-role/${id}`)

  if (!data)
    return

  return data
}
