<script setup>
import {useRbacRoleStore} from "@/stores/rbac"

import RolesList from "@/pages/rbac/components/RolesList.vue"
import Routes from '@/pages/rbac/components/Routes.vue'
import AppendedPermissions from '@/pages/rbac/components/AppendedPermissions.vue'

const rbacRuleStore = useRbacRoleStore()

const tabs = ref(0)

onMounted(() => {
  rbacRuleStore.fetchRbacRole()
  rbacRuleStore.fetchRbacPermissions()
})
</script>

<template>
  <VCard>
    <VCardText>
      <VTabs
        v-model="tabs"
        class="v-tabs-pill"
        grow
      >
        <VTab>
          Роли
        </VTab>
        <VTab>
          Роуты
        </VTab>
        <VTab>
          Добавленные разрешения
        </VTab>
      </VTabs>
      <VCardText>
        <VWindow v-model="tabs">
          <VWindowItem :value="0">
            <RolesList/>
          </VWindowItem>
          <VWindowItem :value="1">
            <Routes/>
          </VWindowItem>
          <VWindowItem :value="2">
            <AppendedPermissions/>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCardText>
  </VCard>
</template>

<!--<route>-->
<!--{-->
<!--meta: {-->
<!--endpoint: 'not-allowed',-->
<!--title: 'RBAC',-->
<!--"superuserOnly": true-->
<!--}-->
<!--}-->
<!--</route>-->
