<script lang="ts" setup>

// import RbacRolesAddVue from '@/pages/rbac-role/components/rbac-role-tabs/rbac-roles-CUD/RbacRolesAdd.vue'
// import RbacRolesDeleteVue from '@/pages/rbac-role/components/rbac-role-tabs/rbac-roles-CUD/RbacRolesDelete.vue'
// import RbacRolesEditVue from '@/pages/rbac-role/components/rbac-role-tabs/rbac-roles-CUD/RbacRolesEdit.vue'

import {useRbacRoleStore} from '@/stores/rbac'
import RoleAdd from "@/pages/rbac/components/RoleAdd.vue";
import RoleDelete from "@/pages/rbac/components/RoleDelete.vue";
import RoleEdit from "@/pages/rbac/components/RoleEdit.vue";

const rbacRulesStore = useRbacRoleStore()

// const { roles } = storeToRefs(rbacRulesStore)
function addRole() {
  rbacRulesStore.isCreatingRole = true
}

function editRole(role) {
  rbacRulesStore.isEditingRole = true
  rbacRulesStore.currentRole = role
}

function deleteRole(role) {
  rbacRulesStore.isDeletingRole = true
  rbacRulesStore.currentRole = role
}
</script>

<template>
  <div>
    <RoleAdd/>
    <RoleDelete/>
    <RoleEdit/>
    <section>
      <VRow>
        <VCol cols="12">
          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div
              class="me-3"
              style="width: 80px;"
            >
              <!--
                <VSelect
                v-model="rowPerPage"
                density="compact"
                variant="outlined"
                :items="[15, 30]"
                />
              -->
            </div>
            <VSpacer/>
            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <!--
                <div style="width: 10rem;">
                <VTextField
                v-model="searchQuery"
                placeholder="Search"
                density="compact"
                />
                </div>
              -->
              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click.prevent="addRole"
              >
                Add role
              </VBtn>
            </div>
          </VCardText>

          <VCardText>
            <VTable>
              <thead>
              <tr>
                <th
                  class="border"
                  scope="col"
                >
                  <span class="text-white">Id</span>
                </th>
                <th
                  class="border"
                  scope="col"
                >
                  <span class="text-white">Name</span>
                </th>
                <th
                  class="border"
                  scope="col"
                >
                  <span class="text-white">Level</span>
                </th>
                <th
                  class="border"
                  scope="col"
                />
              </tr>
              </thead>
              <tbody>
              <tr v-if="rbacRulesStore.loading">
                <td :colspan="rbacRulesStore.roles.length">
                  <VProgressLinear
                    :height="2"
                    indeterminate
                  />
                </td>
              </tr>

              <tr
                v-for="role in rbacRulesStore.roles"
                :key="role.id"
              >
                <td class="border">
                    <span class="cursor-pointer text-primary">
                      {{ role.id }}
                    </span>
                </td>

                <td class="border">
                  {{ role.name }}
                </td>
                <td class="border">
                  {{ role.level }}
                </td>
                <td class="border">
                  <div>
                    <VBtn
                      color="warning"
                      density="default"
                      icon="mdi-pencil-circle"
                      size="x-large"
                      variant="plain"
                      @click="editRole(role)"
                    />
                    <VBtn
                      color="error"
                      density="default"
                      icon="mdi-delete"
                      size="x-large"
                      variant="plain"
                      @click="deleteRole(role)"
                    />
                  </div>
                </td>
              </tr>
              </tbody>
            </VTable>
          </VCardText>
        </VCol>
      </VRow>
      <!--      <RbacRolesAddVue /> -->
      <!--      <RbacRolesEditVue /> -->
      <!--      <RbacRolesDeleteVue /> -->
    </section>
  </div>
</template>
