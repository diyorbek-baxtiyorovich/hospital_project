<script setup>
import {onMounted, ref} from 'vue'

import {useToast} from 'vue-toastification'
import {appendRole, getAllUserRoles, getUserRole, updateUser} from "@/service/userService.js"

const props = defineProps({
  updatingItem: Object,
  permissionDialog: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['updated', 'update:updateDialog'])

function closeDialog() {
  emit('update:updateDialog', false) // Notify parent to close dialog
}

const toast = useToast()

const submitCredentials = ref()
const form = ref(null)

const allUserRoles = ref(null)

async function getAllRoles() {
  allUserRoles.value = await getAllUserRoles()
}

const userRoles = ref([])

async function getUserRoles() {
  userRoles.value = await getUserRole(props?.updatingItem?.id)
}

async function onUpdate() {

  const {valid} = await form.value.validate()


  if (!valid) return

  const role = userRoles.value.map(role => role.id)
  const {result} = await appendRole(role, props?.updatingItem?.id)

  if (result === 'OK') {
    toast.success('Muvofaqqiyatli yangilandi.')
    emit('update:updateDialog', false)
  } else
    toast.error('Xatolik yuz berdi')
}

onMounted(() => {
  getAllRoles()
})

watch(
  () => props.permissionDialog,
  newValue => {
    if (newValue === true) {
      getUserRoles();
    }
  }
);
</script>

<template>
  <div class="text-center">
    <VDialog
      v-model="props.permissionDialog"
      max-width="900"
    >
      <VCard class="pa-4">
        <VCardTitle>
          Xodim rollarini o'zgartirish
        </VCardTitle>
        <VDivider class="mb-4"/>
        <VForm
          ref="form"
          @submit.prevent="onUpdate"
        >
          <VRow>
            <VCol
              cols="12"
              md="12"
            >
              <VAutocomplete
                v-model="userRoles"
                :items="allUserRoles"
                :rules="[
                  v => (Array.isArray(v) && v.length > 0) || 'To\'ldirish majburiy!',
                ]"
                item-title="name"
                label="Xodim rollari"
                multiple
                return-object
              />
            </VCol>
          </VRow>

          <VCardActions class="d-flex w-full justify-end mt-4">
            <VBtn
              color="error"
              variant="elevated"
              @click="closeDialog"
            >
              bekor qilish
            </VBtn>
            <VBtn
              color="success"
              type="submit"
              variant="elevated"
            >
              saqlash
            </VBtn>
          </VCardActions>
        </VForm>
      </VCard>
    </VDialog>
  </div>
</template>



