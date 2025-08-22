<script lang="ts" setup>

// import RbacRolesAddVue from '@/pages/rbac-role/components/rbac-role-tabs/rbac-roles-CUD/RbacRolesAdd.vue'
// import RbacRolesDeleteVue from '@/pages/rbac-role/components/rbac-role-tabs/rbac-roles-CUD/RbacRolesDelete.vue'
// import RbacRolesEditVue from '@/pages/rbac-role/components/rbac-role-tabs/rbac-roles-CUD/RbacRolesEdit.vue'
import {useRbacRoleStore} from '@/stores/rbac'

const rbacRulesStore = useRbacRoleStore()
</script>

<template>
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
          </div>
        </VCardText>

        <VCardText>
          <VTable class="overflow-x-auto" style="max-height: 60vh">
            <thead>
            <tr>
              <th scope="col">
                Id
              </th>
              <th scope="col">
                Routes
              </th>
            </tr>
            </thead>
            <tbody
              v-for="(permission, index) in rbacRulesStore.permissions"
              :key="index"
            >
            <tr
              v-for="route in rbacRulesStore.permissions"
              :key="route.id"
            >
              <td>
                  <span class="cursor-pointer text-primary">
                    {{ route.id }}
                  </span>
              </td>
              <td>
                {{ route.endpoint }}
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
</template>
