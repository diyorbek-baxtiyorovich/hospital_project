<script setup>
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { appendRole, getAllUserRoles, getUserRole } from "@/service/userService.js"

const props = defineProps({
  updatingItem: Object,
  permissionDialog: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['updated', 'update:updateDialog'])
const toast = useToast()

const form = ref(null)
const allUserRoles = ref([])
const userRoles = ref([])

function closeDialog() {
  emit('update:updateDialog', false)
}

async function getAllRoles() {
  try {
    const res = await getAllUserRoles()
    allUserRoles.value = res || []
  } catch (e) {
    console.error(e)
    toast.error("Rollarni olishda xatolik yuz berdi")
  }
}

async function getUserRoles() {
  try {
    const res = await getUserRole(props?.updatingItem?.id)
    userRoles.value = res || []
  } catch (e) {
    console.error(e)
    toast.error("Foydalanuvchi rollarini olishda xatolik")
  }
}

async function onUpdate() {
  const { valid } = await form.value.validate()
  if (!valid) return

  const roleIds = userRoles.value.map(role => role.id)

  const userId = props?.updatingItem?.id

  try {
    const { result } = await appendRole(roleIds, userId)

    if (result === 'Ok') {
      toast.success('Muvofaqqiyatli yangilandi.')
      emit('update:updateDialog', false)
    } else {
      toast.error('Xatolik yuz berdi')
    }
  } catch (error) {
    toast.error('Server xatosi: ' + error.message)
  }
}


onMounted(() => {
  getAllRoles()
})

watch(
  () => props.permissionDialog,
  newValue => {
    if (newValue) getUserRoles()
  }
)
</script>

<template>
  <div class="text-center">
    <VDialog v-model="props.permissionDialog" max-width="800">
      <VCard class="pa-4">
        <VCardTitle>
          Xodim rollarini o'zgartirish
        </VCardTitle>

        <VDivider class="mb-4" />

        <VForm ref="form" @submit.prevent="onUpdate">
          <VRow>
            <VCol cols="12">
              <VAutocomplete
                v-model="userRoles"
                :items="allUserRoles"
                item-title="name"
                item-value="id"
                label="Xodim rollari"
                multiple
                return-object
                chips
                clearable
                :rules="[v => Array.isArray(v) && v.length > 0 || 'Kamida bitta rol tanlang!']"
                required
              />
            </VCol>
          </VRow>

          <VCardActions class="d-flex justify-end mt-4">
            <VBtn color="error" variant="elevated" @click="closeDialog">Bekor qilish</VBtn>
            <VBtn color="success" type="submit" variant="elevated">Saqlash</VBtn>
          </VCardActions>
        </VForm>
      </VCard>
    </VDialog>
  </div>
</template>
