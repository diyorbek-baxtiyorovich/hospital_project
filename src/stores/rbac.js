import {
  deleteRole,
  getAllPermissions,
  getAllRole,
  getPermissionsById,
  postRole,
  updateRole,
} from '@/service/rbac-role.service'
import { postPermissionToRoles } from '@/service/rbac.service'

export const useRbacRoleStore = defineStore('rbac-role', {
  state: () => ({
    loading: false,
    roles: [],
    role: {},
    permissions: [],
    isCreatingRole: false,
    permissionsById: {},

    isEditingRole: false,
    isDeletingRole: false,

    currentRole: {},
  }),
  actions: {
    async fetchRbacRole() {
      try {
        this.loading = true

        this.roles = await getAllRole()
      } finally {
        this.loading = false
      }
    },
    async fetchRbacPermissions() {
      try {
        this.loading = true
        this.permissions = await getAllPermissions()
      } finally {
        this.loading = false
      }
    },
    async fetchRbacPermissionsById(id) {
      try {
        this.loading = true

        // this is for checkbox is not working properly so we need to send it to the server again
        await this.fetchRbacPermissions()
        this.permissionsById = await getPermissionsById(id)
      } finally {
        this.loading = false
      }
    },

    async update(currentRole) {
      return await updateRole(currentRole)
    },
    async createRole(newRole) {
      return await postRole(newRole)
    },
    async confirm(role) {
      return await deleteRole(role.id)
    },
    async changePermissions(roles, role_id) {
      return await postPermissionToRoles(roles, role_id)
    },
  },
  getters: {},
})
