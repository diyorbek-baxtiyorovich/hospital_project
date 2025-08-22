<script setup>
import {ref} from 'vue'
import {useToast} from 'vue-toastification'
import {useRbacRoleStore} from '@/stores/rbac'
import {storeToRefs} from 'pinia'

const rbacRulesStore = useRbacRoleStore()
const rbacRuleStore = useRbacRoleStore()
const toast = useToast()

const {currentRole} = storeToRefs(rbacRulesStore)


function cancelDeletingRole() {
  currentRole.value = {}  // Сбрасываем текущую роль
  rbacRulesStore.isDeletingRole = false
}

async function confirmDelete() {
  const result = await rbacRulesStore.confirm(currentRole.value)
  if (result) {
    toast.success('Muvaffaqiyatli o\'chirildi')
    await rbacRuleStore.fetchRbacRole()
    await rbacRuleStore.fetchRbacPermissions()
    cancelDeletingRole()
  }
}
</script>

<template>
  <VDialog
    :model-value="rbacRulesStore.isDeletingRole"
    class="scrollable-content"
    persistent
    scrollable
    width="1024"
  >
    <VCard flat>
      <VCardItem>
        <VCardTitle
          color="primary"
          dark
          height="64"
        >
          Rolni o'chirish
        </VCardTitle>
        <template #append>
          <VBtn
            icon
            @click="cancelDeletingRole"
          >
            <VIcon
              icon="tabler-x"
              size="18"
            />
          </VBtn>
        </template>
      </VCardItem>

      <VCardText>
        <VRow>
          <VCol cols="12">
            <VBtn
              class="mx-2"
              color="error"
              @click="confirmDelete"
            >
              Tasdiqlash
            </VBtn>
            <VBtn
              class="mx-2"
              color="secondary"
              @click="cancelDeletingRole"
            >
              Bekor qilish
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
